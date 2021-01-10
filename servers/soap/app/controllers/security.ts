import { Request, Response } from "express";
import { Controller, Route } from "../decorators/routing";

@Controller()
export default class SecurityController {
    @Route('get', 'security/fraudConfig')
    getConfig(req: Request, res: Response) {
        return res.json({
            FraudConfig: {
                enabledBitField: 12,
                gameFileFreq: 1000000,
                moduleFreq: 360000,
                startUpFreq: 1000000,
                userID: 11111111
            }
        });
    }
}