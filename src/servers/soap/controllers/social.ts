import {Controller, Route} from "../decorators/routing";

@Controller()
export default class SocialController {
    @Route('get', 'getfriendlistfromuserid')
    async getFriendsList() {
        return {
            PersonaFriendsList: {
                friendPersona: {}
            }
        };
    }

    @Route('get', 'getsocialsettings')
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
            }
        };
    }
}