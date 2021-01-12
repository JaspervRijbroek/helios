import {Request, Response} from 'express'
import { Controller, Route } from '../decorators/routing';
import BaseController from "../../../lib/controller";

@Controller()
export default class UserController extends BaseController {
    @Route('post', 'User/GetPermanentSession')
    async getPermanentSession(req: any) {
        return {
            UserInfo: {
                defaultPersonaIdx: 0,
                personas: {
                    ProfileData: {
                        Boost: 50000,
                        Cash: 1000000,
                        IconIndex: 26,
                        Level: 2,
                        Motto: 'Online First!',
                        Name: 'jasper199069',
                        PercentToLevel: '0',
                        PersonaId: '100',
                        Rating: '1067',
                        Rep: '0',
                        RepAtCurrentLevel: '0',
                        ccar: {}
                    }
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
                    fullGameAccess: 'false',
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
                    starterPackEntitlementTag: '',
                    status: {},
                    subscribeMsg: 'false',
                    tosVersion: {},
                    userId: '11111111',
                    username: {}
                }
            }
        };
    }

    @Route('get', 'getusersettings')
    getUserSettings(req: Request) {
        return {
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
}