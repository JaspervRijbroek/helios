import { Database } from "../../lib/database";
import { Persona } from "./persona";

export class User extends Database.getModel() {
    /******** Model properties ********/
    id!: number;
    username!: string;
    password!: string;
    token!: string;
    current_persona!: number;

    /******** Default properties ********/
    static tableName = 'users';
    static relationMappings: any = {
        personas: {
            relation: Database.getModel().HasManyRelation,
            modelClass: Persona,
            join: {
                from: `${User.tableName}.${User.idColumn}`,
                to: `${Persona.tableName}.user_id`
            }
        },
        persona: {
            relation: Database.getModel().HasOneRelation,
            modelClass: Persona,
            join: {
                from: `${User.tableName}.current_persona`,
                to: `${Persona.tableName}.${Persona.idColumn}`
            }
        }
    }
}