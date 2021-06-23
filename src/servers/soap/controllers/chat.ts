import { Controller, Route } from "../decorators/routing";

@Controller()
export default class ChatController {
    @Route('get', 'Session/GetChatInfo')
    async getChatInfo() {
        return {
            chatServer: {
                Rooms: {
                    chatRoom: [{
                        channelCount: 2,
                        longName: 'TXT_CHAT_LANG_ENGLISH',
                        shortName: 'EN'
                    }]
                },
                ip: process.env.CHAT_HOST,
                port: process.env.CHAT_PORT,
                prefix: 'nfsw'
            }
        };
    }
}