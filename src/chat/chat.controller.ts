import { Controller, Get } from '@nestjs/common';

@Controller()
export class ChatController {
    @Get('Session/GetChatInfo')
    getChatInfo() {
        return {
            chatServer: {
                Rooms: {
                    chatRoom: [{
                        channelCount: 2,
                        longName: 'TXT_CHAT_LANG_ENGLISH',
                        shortName: 'EN'
                    }]
                }
            }
        }
    }
}
