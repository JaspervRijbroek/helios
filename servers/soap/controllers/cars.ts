import { Request, Response } from "express";
import { Controller, Route } from "../decorators/routing";
import BaseController from '../../../lib/controller';

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
    updateCarSpecs(req: Request) {
        // When saving a car, we know which one, so we get the old data,
        // Compare it with the new data and then we can check what has changed and handle the current persona its
        // assets manually.

        console.log(req.body.OwnedCarTrans.CustomCar);

        return {};
    }
}