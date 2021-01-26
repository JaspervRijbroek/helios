import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await Promise.all([
        knex("users").del(),
        knex("personas").del(),
    ]);

    // Inserts seed entries
    await Promise.all([
        knex("users").insert({
            id: 1,
            username: 'admin',
            password: 'admin'
        }),
        knex('personas').insert({
            id: 100,
            name: 'admin',
            motto: 'It was offline, not it\'s online!',
            icon: 26,
            boost: 50000,
            cash: 1000000
        })
    ]);
};
