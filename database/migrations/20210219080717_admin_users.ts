import Knex, { CreateTableBuilder } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('users', (table: CreateTableBuilder) => {
        table.boolean('is_admin');
    });

    return;
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('users', (table: CreateTableBuilder) => {
        table.dropColumn('is_admin');
    });

    return;
}
