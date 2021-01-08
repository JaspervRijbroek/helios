import { Controller, Get } from '@nestjs/common';

@Controller()
export class AchievementsController {
    @Get('/achievements/loadall')
    getAllAchievements() {
        return {};
    }
}
