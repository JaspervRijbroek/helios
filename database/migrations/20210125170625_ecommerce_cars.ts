import Knex, { CreateTableBuilder } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTableIfNotExists('ecommerce_cars', (table: CreateTableBuilder) => {
        table.bigIncrements().primary().nullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('ecommerce_cars');
}

