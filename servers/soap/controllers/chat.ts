import { Request, Response } from "express";
import { Controller, Route } from "../decorators/routing";
import BaseController from '../../../lib/controller';
import { Config } from "../../../lib/config";

@Controller()
export default class ChatController extends BaseController {
    @Route('get', 'Session/GetChatInfo')
    getChatInfo(req: Request): any {
        return {
            chatServer: {
                Rooms: {
                    chatRoom: [{
                        channelCount: 2,
                        longName: 'TXT_CHAT_LANG_ENGLISH',
                        shortName: 'EN'
                    }]
                },
                ip: Config.get('servers.chat.host'),
                port: Config.get('servers.chat.port'),
                prefix: 'nfsw'
            }
        };
    }
}