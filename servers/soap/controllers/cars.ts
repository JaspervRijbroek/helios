import { Request } from "express";
import { Controller, Route } from "../decorators/routing";
import BaseController from '../../../lib/controller';
import Persona from "../../../database/models/persona";
import PersonaCar from "../../../database/models/persona_car";

@Controller()
export default class CarsController extends BaseController {
    @Route('get', 'carclasses')
    getCarClasses(req: Request) {
        return {
            ArrayOfCarClass: {
                CarClass: [{
                    CarClassHash: -2142411446,
                    MaxRating: 999,
                    MinRating: 750,
                }, {
                    CarClassHash: -406473455,
                    MaxRating: 599,
                    MinRating: 500,
                }, {
                    CarClassHash: -405837480,
                    MaxRating: 749,
                    MinRating: 600,
                }, {
                    CarClassHash: 415909161,
                    MaxRating: 399,
                    MinRating: 250,
                }, {
                    CarClassHash: 872416321,
                    MaxRating: 249,
                    MinRating: 0,
                }, {
                    CarClassHash: 1866825865,
                    MaxRating: 499,
                    MinRating: 400,
                }]
            }
        };
    }

    @Route('put', 'personas/:personaId/cars')
    async updateCarSpecs(req: Request) {
        // When saving a car, we know which one, so we get the old data,
        // Compare it with the new data and then we can check what has changed and handle the current persona its
        // assets manually.

        // For now we will just save the car in the DB, but in the future we will be less trusty.

        let persona = await Persona.query().findById(req.params.personaId),
            car = await persona.$relatedQuery<PersonaCar>('cars')
                .findById(req.body.OwnedCarTrans.Id);

        // Update the car just like that, no problems here (yet).
        // Without losing any money.
        await car.$query().patch({
            car_class_hash: req.body.OwnedCarTrans.CustomCar.CarClassHash,
            paints: JSON.stringify(req.body.OwnedCarTrans.CustomCar.Paints),
            performance_parts: JSON.stringify(req.body.OwnedCarTrans.CustomCar.PerformanceParts),
            physics_profile_hash: req.body.OwnedCarTrans.CustomCar.PhysicsProfileHash
        });

        delete req.body.OwnedCarTrans.ExpirationDate;

        return {
            OwnedCarTrans: {
                ...req.body.OwnedCarTrans,
                Durability: 100
            }
        };
    }
}