import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
@UseGuards(AuthGuard('securitytoken'))
export class CarsController {
    @Get('carclasses')
    getCarClasses() {
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
        }
    }
}
