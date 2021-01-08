import { Controller, Get, Post } from '@nestjs/common';

@Controller()
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
