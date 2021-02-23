import Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("events").truncate();

    // Inserts seed entries
    await knex('events').insert(
        require('./eventData.json').map((event: any) => {
            return {
                id: event.eventId,
                car_class_hash: event.carClassHash,
                coins: event.coins,
                engage_point: JSON.stringify(event.engagePoint),
                localization: event.eventLocalization,
                mode_description_localization: event.eventModeDescriptionLocalization,
                mode_icon: event.eventModeIcon,
                mode_id: event.eventModeId,
                mode_localization: event.eventModeLocalization,
                enabled: event.isEnabled,
                locked: event.isLocked,
                laps: event.laps,
                length: event.length,
                max_class_rating: event.maxClassRating,
                max_entrants: event.maxEntrants,
                max_level: event.maxLevel,
                min_class_rating: event.minClassRating,
                min_entrants: event.minEntrants,
                min_level: event.minLevel,
                region_localization: event.regionLocalization,
                reward_modes: JSON.stringify(event.rewardModes),
                time_limit: event.timeLimit,
                track_layout_map: event.trackLayoutMap,
                track_localization: event.trackLocalization,
            };
        })
    );
};