import { Controller, Route } from "../decorators/routing";

@Controller()
export default class AchievementsController{
    @Route('get', 'achievements/loadall')
    getAllAchievements(req: Request, res: Response) {
        return res.json({});
    }
}