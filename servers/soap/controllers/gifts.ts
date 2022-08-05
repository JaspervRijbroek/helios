import { Controller, Post } from '../decorators/routing';

@Controller()
export default class GiftsController {
    @Post('Gifts/GetAndTriggerAvailableLevelGifts')
    async getAvailableGifts() {
        return {
            ArrayOfLevelGiftDefinition: {},
        };
    }
}
