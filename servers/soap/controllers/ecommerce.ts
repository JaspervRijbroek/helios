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
        car = await car.$query().patchAndFetch({
            car_class_hash: req.body.CommerceSessionTrans.UpdatedCar.CustomCar.CarClassHash,
            paints: JSON.stringify(req.body.CommerceSessionTrans.UpdatedCar.CustomCar.Paints),
            performance_parts: JSON.stringify(req.body.CommerceSessionTrans.UpdatedCar.CustomCar.PerformanceParts),
            physics_profile_hash: req.body.CommerceSessionTrans.UpdatedCar.CustomCar.PhysicsProfileHash,
            rating: req.body.CommerceSessionTrans.UpdatedCar.CustomCar.Rating
        });

        return {
            CommerceSessionResultTrans: {
                InvalidBasket: {},
                InventoryItems: {},
                Status: 'Success',
                UpdatedCar: car.toResponse(),
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
            let personaCar = await persona.$relatedQuery<PersonaCar>('cars').insert({
                ...car,
                persona_id: persona.id
            });

            await persona.$query().patch({
                cash: persona.cash -= product.price
            });

            result.CommerceResultTrans.PurchasedCars.OwnedCarTrans.push(personaCar.toResponse());

            return car;
        })
    }
}