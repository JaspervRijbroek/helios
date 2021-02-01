import Knex, { CreateTableBuilder } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTableIfNotExists('persona_cars', (table: CreateTableBuilder) => {
        table.bigIncrements().primary().unsigned();
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
        table.integer('resell_value').unsigned().nullable();

        table.json('paints').nullable();
        table.json('performance_parts').nullable();
        table.json('skill_mod_parts').nullable();
        table.json('vinyls').nullable();
        table.json('visual_parts').nullable();

        table.bigInteger('persona_id');
        table.foreign('persona_id').references('personas.id').onDelete('CASCADE');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('persona_cars');
}