import {Controller, Route} from "../decorators/routing";

@Controller()
export default class GiftsController {
    @Route('post', 'Gifts/GetAndTriggerAvailableLevelGifts')
    async getAvailableGifts() {
        return {
            ArrayOfLevelGiftDefinition: {}
        };
    }
}