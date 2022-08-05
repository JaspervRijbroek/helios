import { Controller, Get } from '../decorators/routing';

@Controller()
export default class AchievementsController {
    @Get('achievements/loadall')
    async getAllAchievements() {
        return {};
    }
}
