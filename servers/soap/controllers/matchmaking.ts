import { Controller, Get } from '../decorators/routing';
import { Request } from 'express';
import Game from '../../../lib/game';

@Controller()
export default class AchievementsController {
    @Get('matchmaking/launchevent/:eventId')
    async lauchEvent(req: Request) {
        // I can do this without thinking, a hacker has nothing with the response.
        // And you can only trigger a request with the client and with the correct data.
        // Thus the client has all the data it requires.
        let session = await Game.db.eventSession.create({
            data: {
                event: {
                    connect: {
                        id: parseInt(req.params.eventId, 10),
                    },
                },
            },
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
                SessionId: session.id,
            },
        };
    }
}
