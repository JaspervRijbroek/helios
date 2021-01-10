import { Request, Response } from "express";
import { Controller, Route } from "../decorators/routing";

@Controller()
export default class ChatController {
    @Route('get', 'Session/GetChatInfo')
    getChatInfo(req: Request, res: Response) {
        return res.json({
            chatServer: {
                Rooms: {
                    chatRoom: [{
                        channelCount: 2,
                        longName: 'TXT_CHAT_LANG_ENGLISH',
                        shortName: 'EN'
                    }]
                }
            }
        })
    }
}