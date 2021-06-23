import { Controller, Route } from "../decorators/routing";
import {Request} from "express";
import Game from "../../../game";

@Controller()
export default class AchievementsController {
    @Route('get', 'matchmaking/launchevent/:eventId')
    async lauchEvent(req: Request) {
        // I can do this without thinking, a hacker has nothing with the response.
        // And you can only trigger a request with the client and with the correct data.
        // Thus the client has all the data it requires.
        let session = await Game.db.eventSession.create({
            data: {
                eventId: parseInt(req.params.eventId)
            }
        });

        return {
            SessionInfo: {
                Challenge: {
                    ChallengeId: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                    LeftSize: 14,
                    Pattern: 'FFFFFFFFFFFFFFFF',
                    RightSize: 50,
                },
                EventId: session.eventId,
                SessionId: session.id
            }
        }
    }
}