import { Request, Response } from "express";
import { Controller, Route } from "../decorators/routing";


@Controller()
export default class LoggingController {
    @Route('get', 'logging/client')
    getLoggingClient(req: Request, res: Response) {
        return res.json({
            ClientConfigTrans: {
                clientConfigs: {}
            }
        });
    }

    @Route('post', '//logging/client/Server', false)
    receiveServerLog(req: Request, res: Response) {
        console.log(req.body);

        return res.end();
    }

    @Route('post', '//logging/client/Multiplayer', false)
    receiveMultiplayerLog(req: Request, res: Response) {
        console.log(req.body);

        return res.end();
    }
}