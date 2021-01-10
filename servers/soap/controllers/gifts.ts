import { Request, Response } from "express";
import { Controller, Route } from "../decorators/routing";

@Controller()
export default class GiftsController {
    @Route('post', 'Gifts/GetAndTriggerAvailableLevelGifts')
    getAvailableGifts(req: Request, res: Response) {
        return res.json({
            ArrayOfLevelGiftDefinition: {}
        })
    }
}