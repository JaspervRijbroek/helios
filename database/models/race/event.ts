import { Database } from "../../../lib/database";

export class RaceEvent extends Database.getModel() {
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
    static tableName: string = 'race_events';
}