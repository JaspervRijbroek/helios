import { Request, Response } from "express";
import { Controller, Route } from "../decorators/routing";
import BaseController from '../../../lib/controller';

@Controller()
export default class EventsController extends BaseController {
    @Route('get', 'events/availableatlevel')
    getAvailableEvents(req: Request) {
        return {
            EventsPacket: {
                Events: []
            }
        }
    }

    @Route('get', 'events/gettreasurehunteventsession')
    getTreasureHuntEvents(req: Request) {
        return {
            TreasureHuntEventSession: {
                CoinsCollected: 0,
                IsStreakBroken: true,
                NumCoins: 15,
                Seed: -990933902,
                Streak: 0,
            }
        };
    }
}