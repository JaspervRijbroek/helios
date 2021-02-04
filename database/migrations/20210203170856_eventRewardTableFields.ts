import Knex, { CreateTableBuilder } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.renameTable('race_events', 'events');

    await knex.schema.alterTable('event_rewards', (table: CreateTableBuilder) => {
        table.bigInteger('event_id').unsigned();
        table.integer('rank').unsigned();
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.renameTable('events', 'race_events');

    await knex.schema.alterTable('event_rewards', (table: CreateTableBuilder) => {
        table.dropColumn('event_id');
        table.dropColumn('rank');
    });
}

