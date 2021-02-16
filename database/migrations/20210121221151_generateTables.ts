import Knex, { CreateTableBuilder } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTableIfNotExists('users', (table: CreateTableBuilder) => {
            table.bigIncrements().primary().unsigned();
            table.string('username');
            table.text('password');
            table.text('token').nullable();
            table.integer('current_persona').unsigned().nullable();

            table.engine('MyISAM');
        })
        .createTableIfNotExists('personas', (table: CreateTableBuilder) => {
            table.bigIncrements().primary().unsigned();
            table.string('name');
            table.text('motto');
            table.integer('icon').nullable();
            table.integer('level').defaultTo(1);
            table.float('level_percentage').defaultTo(0.0);
            table.integer('boost').unsigned().defaultTo(1000); // Boost will be removed, perhaps.
            table.integer('cash').unsigned().defaultTo(250000);
            table.float('rating').unsigned().defaultTo(0.0);
            table.integer('rep').unsigned().defaultTo(0);
            table.float('rep_level').unsigned().defaultTo(0);
            table.integer('score').unsigned().defaultTo(0);

            table.bigInteger('user_id').unsigned();
            table.foreign('user_id')
                .references('users.id')
                .onDelete('CASCADE');

            table.engine('MyISAM');
        })
        .createTableIfNotExists('cars', (table: CreateTableBuilder) => {
            table.bigIncrements().primary().unsigned();
            table.string('name');
            table.integer('base_car');
            table.integer('class_hash');
            table.integer('performance_hash');
            table.integer('level').unsigned().defaultTo(1);
            table.integer('is_default').unsigned().defaultTo(0);
            table.integer('is_preset').unsigned().defaultTo(1);
            table.text('paints').nullable();
            table.text('performance_parts').nullable();
            table.text('skill_parts').nullable();
            table.text('vinyls');
            table.text('visual_parts');

            table.integer('rating').unsigned().defaultTo(0);
            table.integer('resale_price').unsigned().defaultTo(0);
            table.integer('skill_mod_slots').unsigned().defaultTo(0);
            table.integer('height_drop').defaultTo(0);
            table.integer('version').unsigned().defaultTo(0);

            table.bigInteger('persona_id').unsigned();
            table.foreign('persona_id')
                .references('personas.id')
                .onDelete('CASCADE');

            table.engine('MyISAM');
        })
        .createTableIfNotExists('ecommerce_categories', (table: CreateTableBuilder) => {
            table.bigIncrements().primary().unsigned();
            table.string('name');
            table.string('internal_name');

            table.engine('MyISAM');
        })
        .createTableIfNotExists('ecommerce_products', (table: CreateTableBuilder) => {
            table.bigIncrements().primary().unsigned();
            table.string('currency').defaultTo('CASH');
            table.string('title');
            table.string('type').nullable();
            table.text('description').nullable();
            table.text('long_description').nullable();
            table.integer('duration').nullable().unsigned().comment('Duration in minutes');
            table.integer('hash').nullable();
            table.string('icon');
            table.string('secondary_icon').nullable();
            table.integer('level').unsigned().nullable();
            table.integer('price').unsigned();
            table.integer('priority').unsigned().nullable();

            table.integer('use_count').unsigned().nullable();
            table.text('visual_style');

            table.bigInteger('category_id').unsigned();
            table.foreign('category_id')
                .references('ecommerce_categories.id')
                .onDelete('CASCADE');

            table.engine('MyISAM');
        });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTableIfExists('users')
        .dropTableIfExists('personas')
        .dropTableIfExists('cars')
        .dropTableIfExists('ecommerce_categories')
        .dropTableIfExists('ecommerce_products');
}

