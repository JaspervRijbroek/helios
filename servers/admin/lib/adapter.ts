import { BaseDatabase, BaseProperty, BaseRecord, BaseResource, Filter } from "admin-bro";
import { readFileSync } from "fs";
import { sync } from "glob";
import Knex from "knex";
import { Model } from "objection";
import { createSourceFile, ScriptTarget, SyntaxKind } from "typescript";
import User from "../../../database/models/user";
import { Config } from '../../../lib/config';

class Database extends BaseDatabase {
    static isAdapterFor(database: any): boolean {
        return database.name && database.name === 'knex';
    }

    resources(): BaseResource[] {
        return sync(`../../../database/models/**/*.ts`).map((modelPath: string) => {
            return new Resource(
                require(modelPath).default
            )
        });
    }
}

class Resource extends BaseResource {
    constructor(public resource: any) {
        super(resource);
    };

    static isAdapterFor(model: any): boolean {
        return model.prototype && model.prototype instanceof Model;
    }

    databaseName(): string {
        return Config.get('database.name');
    }

    databaseType(): string {
        return 'MySQL';
    }

    properties(): BaseProperty[] {
        // I want to get all the definitions automatically based on the file.
        return this.resource.BroProperties || [];
    }

    id(): string {
        return this.resource.tableName;
    }

    async find(filter: Filter, options?: any): Promise<BaseRecord[]> {
        let query = this.resource.query()
            .limit(options.limit)
            .offset(options.offset)
            .orderBy(options.sort.sortBy, options.sort.direction);

        return (await query).map((item: any) => {
            return new BaseRecord(item.toJSON(), this);
        });
    }

    async count(): Promise<number> {
        return this.resource.query().resultSize();
    }

    async findOne(id: string): Promise<BaseRecord> {
        let item = await this.resource.query().findById(id);

        return new BaseRecord(item.toJSON(), this);
    }

    // findOne
    // findMany
    // build
    // create
    // update
    // delete
}

export default { Database, Resource };