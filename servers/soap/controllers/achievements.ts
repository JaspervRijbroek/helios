import { Request } from "express";
import { Controller, Route } from "../decorators/routing";
import BaseController from '../../../lib/controller';
import { readFileSync } from "fs";
import { join } from "path";
import { toJson } from "xml2json";

@Controller()
export default class AchievementsController extends BaseController {
    @Route('get', 'achievements/loadall')
    getAllAchievements(req: Request) {
        let achievements = readFileSync(join(process.cwd(), 'originalXML', 'achievements/loadall.xml')),
            achievementsArray = toJson(achievements);

        return JSON.parse(achievementsArray);
    }
}