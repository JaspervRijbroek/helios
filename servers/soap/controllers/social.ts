import {Request, Response} from "express";
import {Controller, Route} from "../decorators/routing";
import BaseController from "../../../lib/controller";

@Controller()
export default class SocialController extends BaseController {
    @Route('get', 'getfriendlistfromuserid')
    getFriendsList(req: Request) {
        return {
            PersonaFriendsList: {
                friendPersona: {}
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