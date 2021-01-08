import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
@UseGuards(AuthGuard('securitytoken'))
export class AchievementsController {
    @Get('/achievements/loadall')
    getAllAchievements() {
        return {};
    }
}
