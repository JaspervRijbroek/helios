import Knex from "knex";
import { Model } from "objection";

export class Database {
    knex: Knex;

    static instance: Database|null = null;

    constructor() {
        this.knex = Knex(
            require(`${process.cwd()}/knexfile`).default
        );

        Model.knex(this.knex);
    }

    getKnex() {
        return this.knex;
    }

    getModel(): typeof Model {
        return Model;
    }

    static getInstance() {
        if(!this.instance) {
            this.instance = new Database();
        }

        return this.instance;
    }

    static getModel(): typeof Model {
        return this
            .getInstance()
            .getModel();
    }
}