import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class SocialController {
    @Get('getfriendlistfromuserid')
    @UseGuards(AuthGuard('securitytoken'))
    getFriendsList() {
        return {
            PersonaFriendsList: {
                FriendPersona: {
                    FriendPersona: [{
                        iconIndex: 27,
                        level: 2578,
                        name: 'berkay2578',
                        originalName: 'Berkay Yigit',
                        personaId: 2578,
                        presence: 1,
                        socialNetwork: 'berkay2578',
                        userId: 2578
                    }]
                }
            }
        }
    }

    @Get('getsocialsettings')
    getSocialSettings() {
        return {
            SocialSettings: {
                AppearOffline: false,
                DeclineGroupInvite: 0,
                DeclineIncommingFriendRequests: false,
                DeclinePrivateInvite: 0,
                HideOfflineFriends: false,
                ShowNewsOnSignIn: false,
                ShowOnlyPlayersInSameChatChannel: false,
            }
        };
    }
}
