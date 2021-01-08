import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.entity';

@Controller()
export class UserController {
    @Post('User/GetPermanentSession')
    @UseGuards(AuthGuard('userid'))
    async getPermanentSession(@Req() req: any) {
        let user: User = req.user,
            personas = await req.user.personas || [];

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
                    fullGameAccess: user.full_access,
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
                    securityToken: user.token,
                    starterPackEntitlementTag: user.starter_pack,
                    status: {},
                    subscribeMsg: 'false',
                    tosVersion: {},
                    userId: user.id,
                    username: {}
                }
            }
        }
    }

    @Get('getusersettings')
    @UseGuards(AuthGuard('securitytoken'))
    getUserSettings() {
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
                userId: 1
            }
        }
    }

    @Get('getblockeduserlist')
    @UseGuards(AuthGuard('securitytoken'))
    getBlockedUserList() {
        return {
            ArrayOflong: {}
        }
    }

    @Get('getblockersbyusers')
    @UseGuards(AuthGuard('securitytoken'))
    getBlockersByUsers() {
        return {
            ArrayOflong: {}
        }
    }
}
