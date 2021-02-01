import Knex, { CreateTableBuilder } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('ecommerce_car_dealer', (table: CreateTableBuilder) => {
        table.text('car_class_hash').alter();
        table.text('physics_profile_hash').alter();
        table.text('base_car').alter();
    });

    await knex.schema.alterTable('persona_cars', (table: CreateTableBuilder) => {
        table.text('car_class_hash').alter();
        table.text('physics_profile_hash').alter();
        table.text('base_car').alter();
    });

    await knex.schema.alterTable('ecommerce_products', (table: CreateTableBuilder) => {
        table.text('hash').alter();
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('ecommerce_car_dealer', (table: CreateTableBuilder) => {
        table.integer('car_class_hash').alter();
        table.integer('physics_profile_hash').alter();
        table.integer('base_car').alter();
    });

    await knex.schema.alterTable('persona_cars', (table: CreateTableBuilder) => {
        table.integer('car_class_hash').alter();
        table.integer('physics_profile_hash').alter();
        table.integer('base_car').alter();
    });

    await knex.schema.alterTable('ecommerce_products', (table: CreateTableBuilder) => {
        table.integer('hash').alter();
    });
}

