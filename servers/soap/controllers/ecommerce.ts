import { Controller, Post } from '../decorators/routing';
import { Request } from 'express';
import Game from '../../../lib/game';

@Controller()
export default class EcommerceController {
    @Post('personas/:personaId/baskets')
    async postBasket(req: Request) {
        // You can only buy a single item at the time.
        // So we will only allow a single item at the time.
        let basketItem = req.body.BasketTrans.Items.BasketItemTrans,
            persona = await Game.db.persona.findUnique({
                where: { id: parseInt(req.params.personaId as string, 10) },
            }),
            product = await Game.db.ecommerceProduct.findUnique({
                where: { id: parseInt(basketItem.ProductId, 10) },
            });

        if (!persona || !product || persona.cash < product.price) {
            return {};
        }

        let ecommerceResult = {
            CommerceResultTrans: {
                InventoryItems: {
                    InventoryItemTrans: [
                        {
                            Hash: 0,
                            InventoryId: 0,
                            RemainingUseCount: 0,
                            ResellPrice: 0,
                        },
                    ],
                },
                Status: 'Success',
                Wallets: {
                    WalletTrans: [
                        {
                            Balance: 0,
                            Currency: 'CASH',
                        },
                        {
                            Balance: 0,
                            Currency: 'BOOST',
                        },
                    ],
                },
            },
        };

        switch (product.productType.toLowerCase()) {
            case 'presetcar':
                await this.buyPresetcar(
                    product.id,
                    basketItem.Quantity,
                    persona.id,
                    ecommerceResult
                );
                break;
        }

        ecommerceResult.CommerceResultTrans.Wallets.WalletTrans[0].Balance =
            persona.cash;

        return ecommerceResult;
    }

    @Post('personas/:personaId/commerce')
    async postCommerce(req: Request) {
        let persona = await Game.db.persona.findUnique({
                where: {
                    id: parseInt(req.params.personaId, 10),
                },
                include: {
                    cars: {
                        where: {
                            id: parseInt(
                                req.body.CommerceSessionTrans.UpdatedCar.Id,
                                10
                            ),
                        },
                    },
                },
            }),
            car = persona && persona.cars[0];

        if (!persona || !car) {
            return {};
        }

        // Get added and removed items, for each of the categories that are present.
        // This will give a total sum of money to be added or removed.
        // This might be done with an array reduce.
        let cash = await ['Paints', 'PerformanceParts'].reduce(
            async (carry: Promise<number>, key: string) => {
                let newCarry = await carry;

                if (!req.body.CommerceSessionTrans.UpdatedCar.CustomCar[key]) {
                    return newCarry;
                }

                // Get all the products first, this will be easier to then find matching items.
                let existingKey = (key.charAt(0).toLowerCase() +
                        key.substr(1)) as string,
                    added = await Game.db.ecommerceProduct.findMany({
                        where: {
                            hash: req.body.CommerceSessionTrans.UpdatedCar.CustomCar[
                                key
                            ].map((item: any) => item.Hash),
                        },
                    }),
                    existing = await Game.db.ecommerceProduct.findMany({
                        where: {
                            // @ts-ignore
                            hash: ((car && car[existingKey]) || []).map(
                                (item: any) => item.hash
                            ),
                        },
                    }),
                    removed = existing.filter(
                        (product) => !added.includes(product)
                    ),
                    addedSum = added.reduce(
                        (addedAmount, item) => (addedAmount += item.price),
                        0
                    ),
                    removedSum = removed.reduce(
                        (removedAmount, item) => (removedAmount += item.price),
                        0
                    );

                return (newCarry += (addedSum - removedSum) as number);
            },
            Promise.resolve(0)
        );

        await Game.db.persona.update({
            where: {
                id: req.user.currentPersonaId,
            },
            data: {
                cash: {
                    decrement: cash,
                },
            },
        });

        await Game.db.personaCar.update({
            where: {
                id: car.id,
            },
            data: {
                carClassHash:
                    req.body.CommerceSessionTrans.UpdatedCar.CustomCar
                        .CarClassHash,
                paints: req.body.CommerceSessionTrans.UpdatedCar.CustomCar
                    .Paints,
                performanceParts:
                    req.body.CommerceSessionTrans.UpdatedCar.CustomCar
                        .PerformanceParts,
                physicsProfileHash:
                    req.body.CommerceSessionTrans.UpdatedCar.CustomCar
                        .PhysicsProfileHash,
                // rating: req.body.CommerceSessionTrans.UpdatedCar.CustomCar.Rating
            },
        });

        delete req.body.CommerceSessionTrans.UpdatedCar.ExpirationDate;

        return {
            CommerceSessionResultTrans: {
                InvalidBasket: {},
                InventoryItems: {},
                Status: 'Success',
                UpdatedCar: {
                    ...req.body.CommerceSessionTrans.UpdatedCar,
                    Durability: 100,
                },
                Wallets: {
                    WalletTrans: [
                        {
                            Balance: persona.cash,
                            Currency: 'CASH',
                        },
                        {
                            Balance: persona.boost,
                            Currency: 'BOOST',
                        },
                    ],
                },
            },
        };
    }

    async buyPresetcar(
        productId: number,
        quantity: number,
        personaId: number,
        result: any
    ) {
        let product = await Game.db.ecommerceProduct.findUnique({
                where: { id: productId },
                include: {
                    dealerCar: true,
                },
            }),
            persona = await Game.db.persona.findUnique({
                where: { id: personaId },
            });

        if (!product || !persona || !product.dealerCar) {
            return {};
        }

        let car = product.dealerCar,
            createCar = await Game.db.personaCar.create({
                data: {
                    carId: car.carId,
                    customCarId: car.customCarId,
                    baseCar: car.baseCar,
                    carClassHash: car.carClassHash,
                    physicsProfileHash: car.physicsProfileHash,
                    isPreset: car.isPreset,
                    level: car.level,
                    rating: car.rating,
                    version: car.version,
                    skillModPartsCount: car.skillModPartsCount,
                    name: car.name,
                    durability: car.durability,
                    expirationDate: car.expirationDate,
                    heat: car.heat,
                    ownershipType: car.ownershipType,
                    resellValue: car.resellValue,
                    paints: car.paints || undefined,
                    performanceParts: car.performanceParts || undefined,
                    skillModParts: car.skillModParts || undefined,
                    vinyls: car.vinyls || undefined,
                    visualParts: car.visualParts || undefined,
                    persona: {
                        connect: {
                            id: persona.id,
                        },
                    },
                },
            });

        await Game.db.persona.update({
            where: {
                id: persona.id,
            },
            data: {
                cash: (persona.cash -= product.price),
            },
        });

        result.CommerceResultTrans.PurchasedCars = {
            OwnedCarTrans: [
                {
                    CustomCar: {
                        BaseCar: createCar.baseCar,
                        CarClassHash: createCar.carClassHash,
                        Id: createCar.id,
                        IsPreset: 'true',
                        Level: createCar.level,
                        Name: createCar.name,
                        Paints: createCar.paints,
                        PerformanceParts: createCar.performanceParts,
                        PhysicsProfileHash: createCar.physicsProfileHash,
                        Rating: createCar.rating,
                        ResalePrice: createCar.resellValue,
                        RideHeightDrop: 0,
                        SkillModParts: createCar.skillModParts,
                        SkillModSlotCount: createCar.skillModPartsCount,
                        Version: createCar.version,
                        Vinyls: createCar.vinyls,
                        VisualParts: createCar.visualParts,
                    },
                    Durability: createCar.durability,
                    Heat: createCar.heat,
                    Id: createCar.id,
                    OwnershipType: createCar.ownershipType,
                },
            ],
        };

        return car;
    }
}
