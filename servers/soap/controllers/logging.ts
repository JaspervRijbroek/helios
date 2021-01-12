import { Request, Response } from "express";
import { Controller, Route } from "../decorators/routing";
import BaseController from "../../../lib/controller";


@Controller()
export default class LoggingController extends BaseController {
    @Route('get', 'logging/client')
    getLoggingClient(req: Request) {
        return {
            ClientConfigTrans: {
                clientConfigs: {}
            }
        };
    }

    @Route('post', '//logging/client/Server', false)
    receiveServerLog(req: Request) {
        console.log(req.body);

        return {};
    }

    @Route('post', '//logging/client/Multiplayer', false)
    receiveMultiplayerLog(req: Request) {
        return {};
    }
}