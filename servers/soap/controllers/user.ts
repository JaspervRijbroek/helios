import { Request } from 'express';
import { Controller, Get, Post, Route } from '../decorators/routing';
import { v4 } from 'uuid';
import Levels from '../../../lib/utils/levels';
import Game from '../../../lib/game';

@Controller()
export default class UserController {
    @Post('User/GetPermanentSession')
    async getPermanentSession(req: Request) {
        let personas = await Game.db.persona.findMany({
                where: {
                    userId: req.user.id,
                },
            }),
            token = v4();

        await Game.db.user.update({
            where: {
                id: req.user.id,
            },
            data: {
                token,
            },
        });

        return {
            UserInfo: {
                defaultPersonaIdx: 0,
                personas: {
                    ProfileData: personas.map((persona) => {
                        return {
                            Boost: persona.boost,
                            Cash: persona.cash,
                            IconIndex: persona.icon,
                            Level: Levels.getLevel(persona.experience),
                            Motto: persona.motto,
                            Name: persona.name,
                            PercentToLevel: Levels.getProgress(
                                persona.experience
                            ),
                            PersonaId: persona.id,
                            Rating: persona.rating,
                            Rep: persona.experience,
                            RepAtCurrentLevel:
                                persona.experience -
                                Levels.getCurrentLevelExperience(
                                    persona.experience
                                ),
                            ccar: {},
                        };
                    }),
                },
                user: {
                    fullGameAccess: 'false',
                    isComplete: 'false',
                    remoteUserId: 0,
                    securityToken: token,
                    subscribeMsg: 'false',
                    userId: req.user.id,
                },
            },
        };
    }

    @Get('getusersettings')
    async getUserSettings(req: Request) {
        let disabledSceneries = await Game.db.sceneries.findMany({
                where: {
                    active: false,
                },
            }),
            sceneries = await Game.db.sceneries.findMany({
                where: {
                    active: true,
                },
            });

        return {
            User_Settings: {
                CarCacheAgeLimit: 600,
                IsRaceNowEnabled: 'true',
                MaxCarCacheSize: 250,
                MinRaceNowLevel: 2,
                VoipAvailable: 'false',
                activatedHolidaySceneryGroups: {
                    string: sceneries.map((scenery) => scenery.description),
                },
                activeHolidayIds: {
                    long: sceneries.map((scenery) => scenery.sceneryId),
                },
                disactivatedHolidaySceneryGroups: {
                    string: disabledSceneries.map(
                        (scenery) => `${scenery.description}_DISABLE`
                    ),
                },
                firstTimeLogin: 'true',
                maxLevel: Levels.levelCap,
                starterPackApplied: 'true',
                userId: req.user.id,
            },
        };
    }

    @Post('User/SecureLogout')
    async secureLogout(req: Request) {
        return {};
    }

    @Get('getblockeduserlist')
    async getBlockedUserList() {
        return {
            ArrayOflong: {},
        };
    }

    @Get('getblockersbyusers')
    async getBlockersByUsers() {
        return {
            ArrayOflong: {},
        };
    }

    @Post('User/SecureLoginPersona')
    async secureLoginPersona(req: Request) {
        await Game.db.user.update({
            where: {
                id: req.user.id,
            },
            data: {
                currentPersonaId: parseInt(req.query.personaId as string, 10),
            },
        });

        return {};
    }
}
