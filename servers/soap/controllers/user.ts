import { Request } from 'express'
import { Controller, Route } from '../decorators/routing';
import BaseController, { IAuthenticatedRequest } from "../../../lib/controller";
import Persona from '../../../database/models/persona';
import { v4 } from 'uuid';

@Controller()
export default class UserController extends BaseController {
    @Route('post', 'User/GetPermanentSession')
    async getPermanentSession(req: IAuthenticatedRequest) {
        let personas = await req.user.$relatedQuery<Persona>('personas') || [],
            token = v4();

        console.log(req.user);
        await req.user.$query().patch({
            token
        });

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
                            RepAtCurrentLevel: persona.rep_level,
                            ccar: {}
                        }
                    })
                },
                user: {
                    fullGameAccess: 'false',
                    isComplete: 'false',
                    remoteUserId: 0,
                    securityToken: token,
                    subscribeMsg: 'false',
                    userId: req.user.id,
                }
            }
        };
    }

    @Route('get', 'getusersettings')
    getUserSettings(req: IAuthenticatedRequest) {
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
                userId: req.user.id
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
    async secureLoginPersona(req: IAuthenticatedRequest) {
        // @TODO: This is an XMPP function.
        // But also set the current persona to the user.
        console.log(req.user);
        await req.user.$query().patch({
            current_persona: parseInt(req.query.personaId as string)
        })

        return {};
    }
}