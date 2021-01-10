import { Request, Response } from "express";
import { Controller, Route } from "../decorators/routing";

@Controller()
export default class EventsController {
    @Route('get', 'events/availableatlevel')
    getAvailableEvents(req: Request, res: Response) {
        return res.json({
            EventsPacket: {
                Events: []
            }
        })
    }

    @Route('get', 'events/gettreasurehunteventsession')
    getTreasureHuntEvents(req: Request, res: Response) {
        return res.json({
            TreasureHuntEventSession: {
                CoinsCollected: 0,
                IsStreakBroken: true,
                NumCoins: 15,
                Seed: -990933902,
                Streak: 0,
            }
        });
    }
}