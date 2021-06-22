import {Controller, Route} from "../decorators/routing";

@Controller()
export default class SocialController {
    @Route('get', 'getfriendlistfromuserid')
    getFriendsList() {
        return {
            PersonaFriendsList: {
                friendPersona: {}
            }
        };
    }

    @Route('get', 'getsocialsettings')
    getSocialSettings() {
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