import { Request, Response } from "express";
import { Controller, Route } from "../decorators/routing";
import BaseController from "../../../lib/controller";
import { User } from "../../../entities/user";

@Controller()
export default class SecurityController extends BaseController {
    @Route('get', 'security/fraudConfig')
    getConfig(req: any) {
        let user = req.user as User;

        return {
            FraudConfig: {
                enabledBitField: 12,
                gameFileFreq: 1000000,
                moduleFreq: 360000,
                startUpFreq: 1000000,
                userID: user.id
            }
        };
    }
}