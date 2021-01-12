import { Request, Response } from "express";
import { Controller, Route } from "../decorators/routing";
import BaseController from '../../../lib/controller';

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
                ip: '127.0.0.1',
                port: 5222,
                prefix: 'nfsw'
            }
        };
    }
}