import { Request, Response } from "express";
import { Controller, Route } from "../decorators/routing";
import BaseController from "../../../lib/controller";

@Controller()
export default class SecurityController extends BaseController {
    @Route('get', 'security/fraudConfig')
    getConfig(req: Request) {
        return {
            FraudConfig: {
                enabledBitField: 12,
                gameFileFreq: 1000000,
                moduleFreq: 360000,
                startUpFreq: 1000000,
                userID: 11111111
            }
        };
    }
}