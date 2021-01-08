import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
@UseGuards(AuthGuard('securitytoken'))
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
