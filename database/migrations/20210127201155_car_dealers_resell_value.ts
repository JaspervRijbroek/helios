import Knex, { CreateTableBuilder } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('ecommerce_car_dealer', (table: CreateTableBuilder) => {
        table.integer('resell_value').nullable().unsigned();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('ecommerce_car_dealer', (table: CreateTableBuilder) => {
        table.dropColumn('resell_value');
    });
}

