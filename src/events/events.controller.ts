import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
@UseGuards(AuthGuard('securitytoken'))
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
