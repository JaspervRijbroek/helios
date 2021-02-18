import EventSession from "../../../database/models/events/session";
import BaseController, { IAuthenticatedRequest } from "../../../lib/controller";
import { Controller, Route } from "../decorators/routing";

@Controller()
export default class AchievementsController extends BaseController {
    @Route('get', 'matchmaking/launchevent/:eventId')
    async lauchEvent(req: IAuthenticatedRequest) {
        // I can do this without thinking, a hacker has nothing with the response.
        // And you can only trigger a request with the client and with the correct data.
        // Thus the client has all the data it requires.
        let session = await EventSession.query().insert({
            event_id: parseInt(req.params.eventId)
        });

        return {
            SessionInfo: {
                Challenge: {
                    ChallengeId: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                    LeftSize: 14,
                    Pattern: 'FFFFFFFFFFFFFFFF',
                    RightSize: 50,
                },
                EventId: session.event_id,
                SessionId: session.id
            }
        }
    }
}