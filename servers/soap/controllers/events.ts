import { Request, Response } from "express";
import { Controller, Route } from "../decorators/routing";
import BaseController, { IAuthenticatedRequest } from '../../../lib/controller';
import { Event } from "../../../database/models/event";
import { EventSession } from "../../../database/models/events/session";
import { EventReward } from "../../../database/models/events/reward";

@Controller()
export default class EventsController extends BaseController {
    @Route('get', 'events/availableatlevel')
    async getAvailableEvents(req: Request) {
        let events = await Event.query().where({
            enabled: 1
        });

        return {
            EventsPacket: {
                Events: {
                    EventDefinition: events.map((event: Event) => {
                        let rewardModes = JSON.parse(event.reward_modes),
                            engagePoint = JSON.parse(event.engage_point);

                        return {
                            CarClassHash: event.car_class_hash,
                            Coins: event.coins,
                            EventId: event.id,
                            EventLocalization: event.localization,
                            EventModeDescriptionLocalization: event.mode_description_localization,
                            EventModeIcon: event.mode_icon,
                            EventModeId: event.mode_id,
                            EventModeLocalization: event.mode_localization,
                            IsEnabled: event.enabled ? 'true' : 'false',
                            IsLocked: event.locked ? 'true' : 'false',
                            Laps: event.laps,
                            Length: event.length,
                            MaxClassRating: event.max_class_rating,
                            MaxEntrants: event.max_entrants,
                            MaxLevel: event.max_level,
                            MinClassRating: event.min_class_rating,
                            MinEntrants: event.min_entrants,
                            MinLevel: event.min_level,
                            RegionLocalization: event.region_localization,
                            TimeLimit: event.time_limit,
                            TrackLayoutMap: event.track_layout_map,
                            TrackLocalization: event.track_localization,
                            EngagePoint: {
                                X: engagePoint.x,
                                Y: engagePoint.y,
                                Z: engagePoint.z
                            },
                            RewardModes: {
                                int: rewardModes
                            }
                        }
                    })
                }
            }
        }
    }

    @Route('post', 'event/arbitration')
    async handleEventArbitration(req: IAuthenticatedRequest) {
        // I will have to check which event was called, and which position gets which result.
        // We want to be fair however we want to make sure people race up to their potential.
        // So we will set a feature for winings on second and third place, this will be a percentage of the winnings.

        // Also we will inject an increased percentage if the eventSession is against real players as those are way more challanging,
        // bots are stupid however they are good. Also we will hand out rep for the winner, so the losers get 0 rep.
        let body = req.body.RouteArbitrationPacket,
            session = await EventSession.query().findById(parseInt(req.query.eventSessionId as string)),
            event = await session.$relatedQuery<Event>('event').first(),
            rewards = await event.$relatedQuery<EventReward>('rewards').where({
                rank: body.Rank
            }).first();

        return {
            RouteEventResult: {
                Accolades: {
                    FinalRewards: {
                        Rep: rewards.reputation || 0,
                        Tokens: rewards.cash || 0
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
    getTreasureHuntEvents(req: Request) {
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