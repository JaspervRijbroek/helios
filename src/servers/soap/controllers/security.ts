import {Controller, Route} from "../decorators/routing";
import {Request} from "express";

@Controller()
export default class SecurityController {
    @Route('get', 'security/fraudConfig')
    async getConfig(req: Request) {
        return {
            FraudConfig: {
                enabledBitField: 12,
                gameFileFreq: 1000000,
                moduleFreq: 360000,
                startUpFreq: 1000000,
                userID: req.user.id
            }
        };
    }
}