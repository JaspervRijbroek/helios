import { Controller, Get, Route } from '../decorators/routing';

@Controller()
export default class SocialController {
    @Get('getfriendlistfromuserid')
    async getFriendsList() {
        return {
            PersonaFriendsList: {
                friendPersona: {},
            },
        };
    }

    @Get('getsocialsettings')
    async getSocialSettings() {
        return {
            SocialSettings: {
                AppearOffline: 'false',
                DeclineGroupInvite: 0,
                DeclineIncommingFriendRequests: 'false',
                DeclinePrivateInvite: 0,
                HideOfflineFriends: 'false',
                ShowNewsOnSignIn: 'false',
                ShowOnlyPlayersInSameChatChannel: 'false',
            },
        };
    }
}
