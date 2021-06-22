import { Request } from "express";
import { Controller, Route } from "../decorators/routing";

@Controller()
export default class AchievementsController {
    @Route('get', 'achievements/loadall')
    getAllAchievements() {
        return {};
    }
}