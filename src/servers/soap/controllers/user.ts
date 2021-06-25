import {Request} from 'express'
import {Controller, Route} from '../decorators/routing';
import {v4} from 'uuid';
import Game from "../../../game";

@Controller()
export default class UserController {
    @Route('post', 'User/GetPermanentSession')
    async getPermanentSession(req: Request) {
        let personas = await Game.db.persona.findMany({
                where: {
                    userId: req.user.id
                }
            }),
            token = v4();

        await Game.db.user.update({
            where: {
                id: req.user.id
            },
            data: {
                token
            }
        });

        return {
            UserInfo: {
                defaultPersonaIdx: 0,
                personas: {
                    ProfileData: personas.map(persona => {
                        return {
                            Boost: persona.boost,
                            Cash: persona.cash,
                            IconIndex: persona.icon,
                            Level: persona.level,
                            Motto: persona.motto,
                            Name: persona.name,
                            PercentToLevel: persona.levelPercentage,
                            PersonaId: persona.id,
                            Rating: persona.rating,
                            Rep: persona.rep,
                            RepAtCurrentLevel: persona.repLevel,
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
    async getUserSettings(req: Request) {
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
    async secureLogout(req: Request) {
        console.log(req.body);

        return {};
    }

    @Route('get', 'getblockeduserlist')
    async getBlockedUserList() {
        return {
            ArrayOflong: {}
        };
    }

    @Route('get', 'getblockersbyusers')
    async getBlockersByUsers() {
        return {
            ArrayOflong: {}
        };
    }

    @Route('post', 'User/SecureLoginPersona')
    async secureLoginPersona(req: Request) {
        await Game.db.user.update({
            where: {
                id: req.user.id
            },
            data: {
                currentPersonaId: parseInt(req.query.personaId as string)
            }
        });

        return {};
    }
}