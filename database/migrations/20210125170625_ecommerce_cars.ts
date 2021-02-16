import Knex, { CreateTableBuilder } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTableIfNotExists('ecommerce_car_dealer', (table: CreateTableBuilder) => {
        table.bigIncrements().primary().nullable();
        table.integer('car_id');
        table.integer('custom_car_id');

        table.integer('base_car');
        table.integer('car_class_hash');
        table.integer('physics_profile_hash');
        table.integer('is_preset');
        table.integer('level').unsigned().defaultTo(0);
        table.integer('rating').unsigned().defaultTo(0);
        table.integer('version').unsigned().defaultTo(0);
        table.integer('skill_mod_parts_count').unsigned().defaultTo(5);
        table.string('name');
        table.integer('durability').unsigned().defaultTo(100);
        table.date('expiration_date').nullable();
        table.integer('heat');
        table.string('ownership_type').nullable().defaultTo('PresetCar');

        table.text('paints').nullable();
        table.text('performance_parts').nullable();
        table.text('skill_mod_parts').nullable();
        table.text('vinyls').nullable();
        table.text('visual_parts').nullable();

        table.bigInteger('product_id').unsigned();
        table.foreign('product_id').references('ecommerce_products.id').onDelete('CASCADE');

        table.engine('MyISAM');
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('ecommerce_car_dealer');
}

