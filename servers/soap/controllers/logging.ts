import { Request } from 'express';
import { Controller, Get, Post } from '../decorators/routing';

@Controller()
export default class LoggingController {
    @Get('logging/client')
    async getLoggingClient() {
        return {
            ClientConfigTrans: {
                clientConfigs: {},
            },
        };
    }

    @Post('//logging/client/Server', false)
    async receiveServerLog(req: Request) {
        return {};
    }

    @Post('//logging/client/Multiplayer', false)
    async receiveMultiplayerLog() {
        return {};
    }
}
