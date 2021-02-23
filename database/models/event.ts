import { Model } from "objection";
import { Database } from "../../lib/database";
import EventReward from "./events/reward";

export default class Event extends Database.getModel() {
    /******** Model properties ********/
    id!: number;
    car_class_hash!: string;
    coins!: number;
    engage_point!: string|any;
    localization!: string;
    mode_description_localization!: string;
    mode_icon!: string;
    mode_id!: string;
    mode_localization!: string;
    enabled!: number;
    locked!: number;
    laps!: number;
    length!: number;
    max_class_rating!: string;
    max_entrants!: number;
    max_level!: number;
    min_class_rating!: string;
    min_entrants!: number;
    min_level!: number;
    region_localization!: string;
    reward_modes!: string;
    time_limit!: number;
    track_layout_map!: string;
    track_localization!: string;

    /******** Default properties */
    static tableName: string = 'events';
    static relationMappings = {
        rewards: {
            relation: Model.HasOneRelation,
            modelClass: EventReward,
            join: {
                from: `${Event.tableName}.id`,
                to: `${EventReward.tableName}.event_id`
            }
        }
    }

    /******** Instance methods ********/
    toResponse(): any {
        let rewardModes = JSON.parse(this.reward_modes),
            engagePoint = JSON.parse(this.engage_point);

        return {
            CarClassHash: this.car_class_hash,
            Coins: this.coins,
            EventId: this.id,
            EventLocalization: this.localization,
            EventModeDescriptionLocalization: this.mode_description_localization,
            EventModeIcon: this.mode_icon,
            EventModeId: this.mode_id,
            EventModeLocalization: this.mode_localization,
            IsEnabled: this.enabled ? 'true' : 'false',
            IsLocked: this.locked ? 'true' : 'false',
            Laps: this.laps,
            Length: this.length,
            MaxClassRating: this.max_class_rating,
            MaxEntrants: this.max_entrants,
            MaxLevel: this.max_level,
            MinClassRating: this.min_class_rating,
            MinEntrants: this.min_entrants,
            MinLevel: this.min_level,
            RegionLocalization: this.region_localization,
            TimeLimit: this.time_limit,
            TrackLayoutMap: this.track_layout_map,
            TrackLocalization: this.track_localization,
            EngagePoint: {
                X: engagePoint.x,
                Y: engagePoint.y,
                Z: engagePoint.z
            },
            RewardModes: {
                int: rewardModes
            }
        }
    }
}