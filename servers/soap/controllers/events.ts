import { Request, Response } from "express";
import { Controller, Route } from "../decorators/routing";
import BaseController from '../../../lib/controller';
import { RaceEvent } from "../../../database/models/race/event";

@Controller()
export default class EventsController extends BaseController {
    @Route('get', 'events/availableatlevel')
    async getAvailableEvents(req: Request) {
        let events = await RaceEvent.query();

        return {
            EventsPacket: {
                Events: {
                    EventDefinition: events.map((event: RaceEvent) => {
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