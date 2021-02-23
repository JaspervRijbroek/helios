import { Request } from "express";
import { Controller, Route } from "../decorators/routing";
import BaseController, { IAuthenticatedRequest } from '../../../lib/controller';
import Event from "../../../database/models/event";
import EventSession from "../../../database/models/events/session";
import EventReward from "../../../database/models/events/reward";

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
                    EventDefinition: events.map((event: Event) => event.toResponse())
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