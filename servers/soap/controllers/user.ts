import {Request, Response} from 'express'
import { Controller, Route } from '../decorators/routing';

@Controller()
export default class UserController {
    @Route('post', 'User/GetPermanentSession')
    async getPermanentSession(req: any, res: Response) {
        let token = req.headers['securitytoken'] || false,
            personas = (await req.user.personas) || [];

        return res.json({
            UserInfo: {
                defaultPersonaIdx: 0,
                personas: {
                    ProfileData: personas.map((persona: any) => {
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
                    address1: {},
                    address2: {},
                    country: {},
                    dateCreated: {},
                    dob: {},
                    email: {},
                    emailStatus: {},
                    firstName: {},
                    fullGameAccess: req.user.full_access,
                    gender: {},
                    idDigits: {},
                    isComplete: 'false',
                    landlinePhone: {},
                    language: {},
                    lastAuthDate: {},
                    lastName: {},
                    mobile: {},
                    nickname: {},
                    postalCode: {},
                    realName: {},
                    reasonCode: {},
                    remoteUserId: 1000000000001,
                    securityToken: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
                    starterPackEntitlementTag: req.user.starter_pack,
                    status: {},
                    subscribeMsg: 'false',
                    tosVersion: {},
                    userId: req.user.id,
                    username: {}
                }
            }
        });
    }

    @Route('get', 'getusersettings')
    getUserSettings(req: Request, res: Response) {
        return res.json({
            User_Settings: {
                CarCacheAgeLimit: 600,
                IsRaceNowEnabled: 'true',
                MaxCarCacheSize: 250,
                MinRaceNowLevel: 2,
                VoipAvailable: 'false',
                activatedHolidaySceneryGroups: {
                    'a:string': [
                        'SCENERY_GROUP_NORMAL',
                        'PLACEHOLDER'
                    ]
                },
                activeHolidayIds: {
                    'a:long': [
                        0,
                        9
                    ]
                },
                disactivatedHolidaySceneryGroups: {
                    'a:string': [
                        'SCENERY_GROUP_NORMAL_DISABLE',
                        'PLACEHOLDER'
                    ]
                },
                firstTimeLogin: 'true',
                maxLevel: 70,
                starterPackApplied: 'true',
                userId: req.headers['userid']
            }
        })
    }

    @Route('post', 'User/SecureLogout')
    secureLogout(req: Request, res: Response) {
        console.log(req.body);

        return res.status(200).send();
    }

    @Route('get', 'getblockeduserlist')
    getBlockedUserList(req: Request, res: Response) {
        return res.json({
            ArrayOflong: {}
        });
    }

    @Route('get', 'getblockersbyusers')
    getBlockersByUsers(req: Request, res: Response) {
        return res.json({
            ArrayOflong: {}
        });
    }
}