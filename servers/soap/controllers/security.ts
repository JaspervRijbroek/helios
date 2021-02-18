import { Controller, Route } from "../decorators/routing";
import BaseController, { IAuthenticatedRequest } from "../../../lib/controller";

@Controller()
export default class SecurityController extends BaseController {
    @Route('get', 'security/fraudConfig')
    getConfig(req: IAuthenticatedRequest) {
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