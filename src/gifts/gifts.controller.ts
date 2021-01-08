import { Controller, Get, Post } from '@nestjs/common';

@Controller()
export class GiftsController {
    @Post('Gifts/GetAndTriggerAvailableLevelGifts')
    getAvailableGifts() {
        return {
            ArrayOfLevelGiftDefinition: {}
        }
    }
}
