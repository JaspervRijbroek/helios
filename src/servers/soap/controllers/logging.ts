import {Request} from "express";
import {Controller, Route} from "../decorators/routing";

@Controller()
export default class LoggingController {
    @Route('get', 'logging/client')
    async getLoggingClient() {
        return {
            ClientConfigTrans: {
                clientConfigs: {}
            }
        };
    }

    @Route('post', '//logging/client/Server', false)
    async receiveServerLog(req: Request) {
        console.log(req.body);

        return {};
    }

    @Route('post', '//logging/client/Multiplayer', false)
    async receiveMultiplayerLog() {
        return {};
    }
}