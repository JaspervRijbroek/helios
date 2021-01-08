import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
@UseGuards(AuthGuard('securitytoken'))
export class ReportingController {
    @Get('logging/client')
    getClientLogging() {
        return {
            ClientConfigTrans: {
                clientConfigs: {}
            }
        }
    }

    @Post('//logging/client/Server')
    receiveServerLog() {
        return {};
    }

    @Post('//logging/client/Multiplayer')
    receiveMultiplayerLog() {
        return {};
    }
    
    @Post('Reporting/SendHardwareInfo')
    getClientHardwareInfo() {
        return {};
    }

    @Post('Reporting/SendUserSettings')
    getClientUserSettings() {
        return {};
    }
}
