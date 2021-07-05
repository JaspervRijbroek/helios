import {Controller, Route} from "../decorators/routing";
import {Request} from "express";
import Game from "../../../game";

@Controller()
export default class EcommerceController {
    @Route('post', 'personas/:personaId/baskets')
    async postBasket(req: Request) {
        // You can only buy a single item at the time.
        // So we will only allow a single item at the time.
        console.log(req.body);

        let basketItem = req.body.BasketTrans.Items.BasketItemTrans,
            persona = await Game.db.persona.findUnique({where: {id: parseInt(req.params.personaId as string)}}),
            product = await Game.db.ecommerceProduct.findUnique({where: {id: parseInt(basketItem.ProductId)}});

        if (!persona || !product || persona.cash < product.price) {
            return {};
        }

        let ecommerceResult = {
            CommerceResultTrans: {
                CommerceItems: [],
                InvalidBasket: [],
                InventoryItems: [],
                UpdatedCar: [],
                PurchasedCars: {
                    OwnedCarTrans: []
                },
                Wallets: {
                    WalletTrans: [{
                        Balance: 0,
                        Currency: 'CASH'
                    }, {
                        Balance: 0,
                        Currency: 'BOOST'
                    }]
                }
            }
        };

        console.log(product.productType.toLowerCase());
        switch (product.productType.toLowerCase()) {
            case 'presetcar':
                await this.buyPresetcar(product.id, basketItem.Quantity, persona.id, ecommerceResult)
                break;
        }

        ecommerceResult.CommerceResultTrans.Wallets.WalletTrans[0].Balance = persona.cash;

        console.log(ecommerceResult)
        return ecommerceResult;
    }

    @Route('post', 'personas/:personaId/commerce')
    async postCommerce(req: Request) {
        let persona = await Game.db.persona.findUnique({
                where: {
                    id: parseInt(req.params.personaId)
                },
                include: {
                    cars: {
                        where: {
                            id: parseInt(req.body.CommerceSessionTrans.UpdatedCar.Id)
                        }
                    }
                }
            }),
            car = persona && persona.cars[0];

        if (!persona || !car) {
            return {};
        }

        // Update the car just like that, no problems here (yet).
        // Without losing any money.

        await Game.db.personaCar.update({
            where: {
                id: car.id
            },
            data: {
                carClassHash: req.body.CommerceSessionTrans.UpdatedCar.CustomCar.CarClassHash,
                paints: req.body.CommerceSessionTrans.UpdatedCar.CustomCar.Paints,
                performanceParts: req.body.CommerceSessionTrans.UpdatedCar.CustomCar.PerformanceParts,
                physicsProfileHash: req.body.CommerceSessionTrans.UpdatedCar.CustomCar.PhysicsProfileHash,
                // rating: req.body.CommerceSessionTrans.UpdatedCar.CustomCar.Rating
            }
        });

        delete req.body.CommerceSessionTrans.UpdatedCar.ExpirationDate;

        return {
            CommerceSessionResultTrans: {
                InvalidBasket: {},
                InventoryItems: {},
                Status: 'Success',
                UpdatedCar: {
                    ...req.body.CommerceSessionTrans.UpdatedCar,
                    Durability: 100
                },
                Wallets: {
                    WalletTrans: [{
                        Balance: persona.cash,
                        Currency: 'CASH'
                    }, {
                        Balance: persona.boost,
                        Currency: 'BOOST'
                    }]
                }
            }
        };
    }

    async buyPresetcar(productId: number, quantity: number, personaId: number, result: any) {
        let product = await Game.db.ecommerceProduct.findUnique({
                where: {id: productId},
                include: {
                    dealerCar: true
                }
            }),
            persona = await Game.db.persona.findUnique({where: {id: personaId}});

        console.log(product, persona, product?.dealerCar);
        if(!product || !persona || !product.dealerCar) {
            return {}
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
                    paints: car.paints,
                    performanceParts: car.performanceParts,
                    skillModParts: car.skillModParts,
                    vinyls: car.vinyls,
                    visualParts: car.visualParts,
                    persona: {
                        connect: {
                            id: persona.id
                        }
                    }
                }
            });

        await Game.db.persona.update({
            where: {
                id: persona.id
            },
            data: {
                cash: persona.cash -= product.price
            }
        });


        result.CommerceResultTrans.PurchasedCars.OwnedCarTrans.push({
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
                VisualParts: createCar.visualParts
            },
            Durability: createCar.durability,
            Heat: createCar.heat,
            Id: createCar.id,
            OwnershipType: createCar.ownershipType
        });

        return car;
    }
}