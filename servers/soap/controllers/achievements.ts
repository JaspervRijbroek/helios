import { Request } from "express";
import { Controller, Route } from "../decorators/routing";
import BaseController from '../../../lib/controller';

@Controller()
export default class AchievementsController extends BaseController {
    @Route('get', 'achievements/loadall')
    getAllAchievements(req: Request) {
        return {};
    }
}