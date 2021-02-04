import Knex, { CreateTableBuilder } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTableIfNotExists('event_sessions', (table: CreateTableBuilder) => {
        table.bigIncrements().primary().unsigned();
        table.bigInteger('persona_id').nullable().unsigned();
        table.bigInteger('lobby_id').nullable().unsigned();

        table.bigInteger('event_id');
        table.foreign('event_id').references('event.id').onDelete('CASCADE');
    });

    await knex.schema.createTableIfNotExists('event_rewards', (table: CreateTableBuilder) => {
        table.bigIncrements().primary().unsigned();
        table.integer('reputation').nullable().unsigned();
        table.integer('experience').nullable().unsigned();
        table.integer('boost').nullable().unsigned();
        table.integer('cash').nullable().unsigned();
        table.string('card_pack_name').nullable();
    });

    await knex.schema.createTableIfNotExists('card_packs', (table: CreateTableBuilder) => {
        table.bigIncrements().primary().unsigned();
        table.string('pack_name');
        table.float('likelyhood').defaultTo(1);
        table.string('reward');
    });

    return;
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('event_sessions');
    await knex.schema.dropTableIfExists('event_rewards');
    await knex.schema.dropTableIfExists('card_packs');

    return;
}

