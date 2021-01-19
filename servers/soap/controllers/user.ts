import { Request, Response } from 'express'
import { Controller, Route } from '../decorators/routing';
import BaseController from "../../../lib/controller";
import { User } from '../../../database/entities/user';
import { Persona } from '../../../database/entities/persona';

@Controller()
export default class UserController extends BaseController {
    @Route('post', 'User/GetPermanentSession')
    async getPermanentSession(req: any) {
        let user = req.user as User,
            personas = await user.personas || [];

        return {
            UserInfo: {
                defaultPersonaIdx: 0,
                personas: {
                    ProfileData: personas.map((persona: Persona) => {
                        return {
                            Boost: persona.boost,
                            Cash: persona.cash,
                            IconIndex: persona.icon,
                            Level: persona.level,
                            Motto: persona.motto,
                            Name: persona.name,
                            PercentToLevel: persona.level_percentage,
                            PersonaId: persona.id,
                            Rating: persona.rating,
                            Rep: persona.rep,
                            RepAtCurrentLevel: persona.rep_level
                        }
                    })
                },
                user: {
                    fullGameAccess: 'false',
                    isComplete: 'false',
                    remoteUserId: 0,
                    securityToken: user.token,
                    subscribeMsg: 'false',
                    userId: user.id,
                }
            }
        };
    }

    @Route('get', 'getusersettings')
    getUserSettings(req: any) {
        let user = req.user as User;

        return {
            User_Settings: {
                CarCacheAgeLimit: 600,
                IsRaceNowEnabled: 'true',
                MaxCarCacheSize: 250,
                MinRaceNowLevel: 2,
                VoipAvailable: 'false',
                activatedHolidaySceneryGroups: {
                    string: [
                        'SCENERY_GROUP_NORMAL',
                        'PLACEHOLDER'
                    ]
                },
                activeHolidayIds: {
                    long: [
                        0,
                        9
                    ]
                },
                disactivatedHolidaySceneryGroups: {
                    string: [
                        'SCENERY_GROUP_NORMAL_DISABLE',
                        'PLACEHOLDER'
                    ]
                },
                firstTimeLogin: 'true',
                maxLevel: 70,
                starterPackApplied: 'true',
                userId: user.id
            }
        };
    }

    @Route('post', 'User/SecureLogout')
    secureLogout(req: Request) {
        console.log(req.body);

        return {};
    }

    @Route('get', 'getblockeduserlist')
    getBlockedUserList(req: Request) {
        return {
            ArrayOflong: {}
        };
    }

    @Route('get', 'getblockersbyusers')
    getBlockersByUsers(req: Request) {
        return {
            ArrayOflong: {}
        };
    }

    @Route('post', 'User/SecureLoginPersona')
    async secureLoginPersona(req: any) {
        // @TODO: This is an XMPP function.
        // But also set the current persona to the user.
        let user = req.user;

        user.currentPersona = req.query.personaId;
        await user.save();

        return {};
    }
}