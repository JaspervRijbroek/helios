import Knex, { CreateTableBuilder } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('ecommerce_products', (table: CreateTableBuilder) => {
        table.bigInteger('related_car');
    });

    await knex.schema.alterTable('ecommerce_car_dealer', (table: CreateTableBuilder) => {
        table.dropForeign(['product_id']);
        table.dropColumn('product_id');
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('ecommerce_products', (table: CreateTableBuilder) => {
        table.dropColumn('related_car');
    });

    await knex.schema.alterTable('ecommerce_car_dealer', (table: CreateTableBuilder) => {
        table.bigInteger('product_id');
        table.foreign('product_id').references('ecommerce_products.id');
    });
}