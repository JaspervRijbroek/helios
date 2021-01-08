import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
@UseGuards(AuthGuard('securitytoken'))
export class GiftsController {
    @Post('Gifts/GetAndTriggerAvailableLevelGifts')
    getAvailableGifts() {
        return {
            ArrayOfLevelGiftDefinition: {}
        }
    }
}
