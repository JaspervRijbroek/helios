import {Request, Response} from "express";
import {Controller, Route} from "../decorators/routing";
import BaseController from "../../../lib/controller";

@Controller()
export default class SocialController extends BaseController {
    @Route('get', 'getfriendlistfromuserid')
    getFriendsList(req: Request) {
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
        };
    }

    @Route('get', 'getsocialsettings')
    getSocialSettings(req: Request) {
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