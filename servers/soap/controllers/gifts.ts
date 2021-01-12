import {Request, Response} from "express";
import {Controller, Route} from "../decorators/routing";
import BaseController from "../../../lib/controller";

@Controller()
export default class GiftsController extends BaseController {
    @Route('post', 'Gifts/GetAndTriggerAvailableLevelGifts')
    getAvailableGifts(req: Request) {
        return {
            ArrayOfLevelGiftDefinition: {}
        };
    }
}