import { Controller, Get } from '@nestjs/common';

@Controller()
export class EventsController {
    @Get('events/availableatlevel')
    getAvailableEvents() {
        return {
            EventsPacket: {
                Events: []
            }
        }
    }

    @Get('events/gettreasurehunteventsession')
    getTreasureHuntEvents() {
        return {
            TreasureHuntEventSession: {
                CoinsCollected: 0,
                IsStreakBroken: true,
                NumCoins: 15,
                Seed: -990933902,
                Streak: 0,
            }
        }
    }
}
