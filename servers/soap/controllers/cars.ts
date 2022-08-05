import { Request } from 'express';
import { Controller, Get, Put } from '../decorators/routing';
import Game from '../../../lib/game';

@Controller()
export default class CarsController {
    @Get('carclasses')
    async getCarClasses() {
        return {
            ArrayOfCarClass: {
                CarClass: [
                    {
                        CarClassHash: -2142411446,
                        MaxRating: 999,
                        MinRating: 750,
                    },
                    {
                        CarClassHash: -406473455,
                        MaxRating: 599,
                        MinRating: 500,
                    },
                    {
                        CarClassHash: -405837480,
                        MaxRating: 749,
                        MinRating: 600,
                    },
                    {
                        CarClassHash: 415909161,
                        MaxRating: 399,
                        MinRating: 250,
                    },
                    {
                        CarClassHash: 872416321,
                        MaxRating: 249,
                        MinRating: 0,
                    },
                    {
                        CarClassHash: 1866825865,
                        MaxRating: 499,
                        MinRating: 400,
                    },
                ],
            },
        };
    }

    @Put('personas/:personaId/cars')
    async updateCarSpecs(req: Request) {
        // When saving a car, we know which one, so we get the old data,
        // Compare it with the new data and then we can check what has changed and handle the current persona its
        // assets manually.

        // For now we will just save the car in the DB, but in the future we will be less trusty.

        let persona = await Game.db.persona.findUnique({
            where: {
                id: parseInt(req.params.personaId, 10),
            },
            include: {
                cars: {
                    where: {
                        id: parseInt(req.body.OwnedCarTrans.Id, 10),
                    },
                },
            },
        });

        if (!persona || !persona.cars[0]) {
            return {};
        }

        await Game.db.personaCar.update({
            where: {
                id: persona.cars[0].id,
            },
            data: {
                carClassHash: req.body.OwnedCarTrans.CustomCar.CarClassHash,
                paints: req.body.OwnedCarTrans.CustomCar.Paints,
                performanceParts:
                    req.body.OwnedCarTrans.CustomCar.PerformanceParts,
                physicsProfileHash:
                    req.body.OwnedCarTrans.CustomCar.PhysicsProfileHash,
            },
        });

        delete req.body.OwnedCarTrans.ExpirationDate;

        return {
            OwnedCarTrans: {
                ...req.body.OwnedCarTrans,
                Durability: 100,
            },
        };
    }
}
