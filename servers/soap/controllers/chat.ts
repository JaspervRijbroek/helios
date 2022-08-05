import { Controller, Get } from '../decorators/routing';

@Controller()
export default class ChatController {
    @Get('Session/GetChatInfo')
    async getChatInfo() {
        return {
            chatServer: {
                Rooms: {
                    chatRoom: [
                        {
                            channelCount: 1,
                            longName: 'TXT_CHAT_LANG_ENGLISH',
                            shortName: 'EN',
                        },
                    ],
                },
                ip: process.env.SERVER_IP,
                port: process.env.CHAT_PORT,
                prefix: 'nfsw',
            },
        };
    }
}
