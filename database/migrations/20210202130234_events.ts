import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('race_events', (table: Knex.CreateTableBuilder) => {
        table.bigIncrements();
        table.string('car_class_hash');
        table.integer('coins').nullable().unsigned();
        table.text('engage_point');
        table.string('localization');
        table.string('mode_description_localization');
        table.string('mode_icon');
        table.string('mode_id');
        table.string('mode_localization');
        table.integer('enabled').nullable();
        table.integer('locked').nullable();
        table.integer('laps').nullable().unsigned();
        table.float('length').unsigned().nullable();
        table.string('max_class_rating');
        table.integer('max_entrants');
        table.integer('max_level');
        table.string('min_class_rating');
        table.integer('min_entrants');
        table.integer('min_level');
        table.string('region_localization');
        table.string('reward_modes');
        table.integer('time_limit').nullable();
        table.string('track_layout_map');
        table.string('track_localization');

        table.engine('MyISAM')
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('race_events');
}

