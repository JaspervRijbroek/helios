import BaseController, { IAuthenticatedRequest } from "../../../lib/controller";
import { Controller, Route } from "../decorators/routing";

@Controller()
export default class AchievementsController extends BaseController {
    @Route('get', 'matchmaking/launchevent/:eventId')
    lauchEvent(req: IAuthenticatedRequest) {
        // <SessionInfo><Challenge><ChallengeId>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</ChallengeId><LeftSize>14</LeftSize><Pattern>FFFFFFFFFFFFFFFF</Pattern><RightSize>50</RightSize></Challenge><EventId>48</EventId><SessionId>9970915</SessionId></SessionInfo>

        return {
            SessionInfo: {
                Challenge: {
                    ChallengeId: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                    LeftSize: 14,
                    Pattern: 'FFFFFFFFFFFFFFFF',
                    RightSize: 50,
                },
                EventId: req.params.eventId,
                SessionId: 9970915
            }
        }
    }
}