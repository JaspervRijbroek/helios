import { Request } from "express";
import { Controller, Route } from "../decorators/routing";
import Game from "../../../game";

@Controller()
export default class EventsController {
    @Route('get', 'events/availableatlevel')
    async getAvailableEvents() {
        let events = await Game.db.event.findMany({
            where: {
                enabled: true
            }
        });

        return {
            EventsPacket: {
                Events: {
                    EventDefinition: events.map(event => ({
                        CarClassHash: event.carClassHash,
                        Coins: event.coins,
                        EventId: event.id,
                        EventLocalization: event.localization,
                        EventModeDescriptionLocalization: event.modeDescriptionLocalization,
                        EventModeIcon: event.modeIcon,
                        EventModeId: event.modeId,
                        EventModeLocalization: event.modeLocalization,
                        IsEnabled: event.enabled ? 'true' : 'false',
                        IsLocked: event.locked ? 'true' : 'false',
                        Laps: event.laps,
                        Length: event.length,
                        MaxClassRating: event.maxClassRating,
                        MaxEntrants: event.maxEntrants,
                        MaxLevel: event.maxLevel,
                        MinClassRating: event.minClassRating,
                        MinEntrants: event.minEntrants,
                        MinLevel: event.minLevel,
                        RegionLocalization: event.regionLocalization,
                        TimeLimit: event.timeLimit,
                        TrackLayoutMap: event.trackLayoutMap,
                        TrackLocalization: event.trackLocalization,
                        EngagePoint: event.engagePoint,
                        RewardModes: (event.rewardModes as [] || []).map(mode => ({int: mode}))
                    }))
                }
            }
        }
    }

    @Route('post', 'event/arbitration')
    async handleEventArbitration(req: Request) {
        // I will have to check which event was called, and which position gets which result.
        // We want to be fair however we want to make sure people race up to their potential.
        // So we will set a feature for winings on second and third place, this will be a percentage of the winnings.

        // Also we will inject an increased percentage if the eventSession is against real players as those are way more challanging,
        // bots are stupid however they are good. Also we will hand out rep for the winner, so the losers get 0 rep.
        let body = req.body.RouteArbitrationPacket,
            session = await Game.db.eventSession.findUnique({
                where: {
                    id: parseInt(req.query.eventSessionId as string)
                },
                include: {
                    event: {
                        include: {
                            rewards: {
                                where: {
                                    rank: body.Rank
                                }
                            }
                        }
                    }
                }
            })

        if(!session || !session.event || !session.event.rewards || !session.event.rewards[0]) {
            return {};
        }

        let event = session.event,
            reward = session.event.rewards[0];


        //
        return {
            RouteEventResult: {
                Accolades: {
                    FinalRewards: {
                        Rep: reward.reputation || 0,
                        Tokens: reward.cash || 0
                    },
                    HasLeveledUp: 'false',
                    LuckyDrawInfo: {},
                    OriginalRewards: {}
                },
                Durability: 100,
                EventId: event.id,
                EventSessionId: session.id,
                ExitPath: 'ExitToFreeroam',
                InviteLifetimeInMilliseconds: 0,
                LobbyInviteId: 0,
                PersonaId: req.user.current_persona,
                Entrants: {
                    RouteEntrantResult: [{
                        EventDurationInMilliseconds: body.EventDurationInMilliseconds,
                        EventSessionId: session.id,
                        FinishReason: body.FinishReason,
                        PersonaId: req.user.current_persona,
                        Ranking: body.Rank,
                        BestLapDurationInMilliseconds: body.BestLapDurationInMilliseconds,
                        TopSpeed: body.TopSpeed
                    }]
                }
            }
        };
    }

    @Route('get', 'events/gettreasurehunteventsession')
    getTreasureHuntEvents() {
        return {
            TreasureHuntEventSession: {
                CoinsCollected: 0,
                IsStreakBroken: true,
                NumCoins: 15,
                Seed: -990933902,
                Streak: 0,
            }
        };
    }
}