import { Transaction } from "objection";
import { DealerCar } from "../../../database/models/ecommerce/dealer_car";
import { Product } from "../../../database/models/ecommerce/product";
import { Persona } from "../../../database/models/persona";
import { PersonaCar } from "../../../database/models/persona_car";
import BaseController, { IAuthenticatedRequest } from "../../../lib/controller";
import { Controller, Route } from "../decorators/routing";

@Controller()
export default class EcommerceController extends BaseController {
    @Route('post', 'personas/:personaId/baskets')
    async postBasket(req: IAuthenticatedRequest) {
        // You can only buy a single item at the time.
        // So we will only allow a single item at the time.
        let basketItem = req.body.BasketTrans.Items.BasketItemTrans,
            persona = await Persona.query().findById(req.params.personaId),
            product = await Product.query().findById(basketItem.ProductId);

        console.log(basketItem);

        // Check if we have enough funds.
        // Else we will return an error on the server.
        if (persona.cash < product.price) {
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
        },
            localMethod = this[`buy${product.type.charAt(0).toUpperCase() + product.type.slice(1).toLowerCase()}` as keyof EcommerceController] as Function;

        if (localMethod) {
            // Get the product type.
            await localMethod.call(this, product, basketItem.Quantity, persona, ecommerceResult);
        }

        ecommerceResult.CommerceResultTrans.Wallets.WalletTrans[0].Balance = persona.cash;

        console.log(ecommerceResult)
        return ecommerceResult;
    }

    @Route('post', 'personas/:personaId/commerce')
    async postCommerce(req: IAuthenticatedRequest) {
        let persona = await Persona.query().findById(req.params.personaId),
            car = await persona.$relatedQuery<PersonaCar>('cars')
                .findById(req.body.CommerceSessionTrans.UpdatedCar.Id);

        // Update the car just like that, no problems here (yet).
        // Without losing any money.
        await car.$query().patch({
            car_class_hash: req.body.CommerceSessionTrans.UpdatedCar.CustomCar.CarClassHash,
            paints: JSON.stringify(req.body.CommerceSessionTrans.UpdatedCar.CustomCar.Paints),
            performance_parts: JSON.stringify(req.body.CommerceSessionTrans.UpdatedCar.CustomCar.PerformanceParts),
            physics_profile_hash: req.body.CommerceSessionTrans.UpdatedCar.CustomCar.PhysicsProfileHash,
            rating: req.body.CommerceSessionTrans.UpdatedCar.CustomCar.Rating
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

    async buyPresetcar(product: Product, quantity: number, persona: Persona, result: any) {
        let car = await product.$relatedQuery('dealerCar').first() as DealerCar;

        // Add a new relation to the persona.
        // This is because this is a new car.
        // This will be done in a transaction, as if there is an issue it will be reverted.
        await Persona.transaction(async (trx: Transaction) => {
            let personaCarID = await persona.$relatedQuery<PersonaCar>('cars').insert({
                car_id: car.car_id,
                custom_car_id: car.custom_car_id,
                base_car: car.base_car,
                car_class_hash: car.car_class_hash,
                physics_profile_hash: car.physics_profile_hash,
                is_preset: car.is_preset,
                level: car.level,
                rating: car.rating,
                version: car.version,
                skill_mod_parts_count: car.skill_mod_parts_count,
                name: car.name,
                durability: car.durability,
                expiration_date: car.expiration_date,
                heat: car.heat,
                ownership_type: car.ownership_type,
                resell_value: car.resell_value,
                paints: car.paints,
                performance_parts: car.performance_parts,
                skill_mod_parts: car.skill_mod_parts,
                vinyls: car.vinyls,
                visual_parts: car.visual_parts,
                persona_id: persona.id
            });

            await persona.$query().patch({
                cash: persona.cash -= product.price
            });

            result.CommerceResultTrans.PurchasedCars.OwnedCarTrans.push({
                CustomCar: {
                    BaseCar: personaCarID.base_car,
                    CarClassHash: personaCarID.car_class_hash,
                    Id: personaCarID.id,
                    IsPreset: 'true',
                    Level: personaCarID.level,
                    Name: personaCarID.name,
                    Paints: JSON.parse(personaCarID.paints),
                    PerformanceParts: JSON.parse(personaCarID.performance_parts),
                    PhysicsProfileHash: personaCarID.physics_profile_hash,
                    Rating: personaCarID.rating,
                    ResalePrice: personaCarID.resell_value,
                    RideHeightDrop: 0,
                    SkillModParts: JSON.parse(personaCarID.skill_mod_parts),
                    SkillModSlotCount: personaCarID.skill_mod_parts_count,
                    Version: personaCarID.version,
                    Vinyls: JSON.parse(personaCarID.vinyls),
                    VisualParts: JSON.parse(personaCarID.visual_parts)
                },
                Durability: personaCarID.durability,
                Heat: personaCarID.heat,
                Id: personaCarID.id,
                OwnershipType: personaCarID.ownership_type
            });

            return car;
        })
    }
}