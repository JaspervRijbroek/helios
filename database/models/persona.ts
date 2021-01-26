import { Database } from "../../lib/database";
import { User } from "./user";

export class Persona extends Database.getModel() {
    /******** Model properties ********/
    id!: number;
    name!: string;
    motto!: string;
    icon!: number;
    level!: number;
    level_percentage!: number;
    boost!: number;
    cash!: number;
    rating!: number;
    rep!: number;
    rep_level!: number;
    score!: number;
    user_id!: number;

    /******** Default properties ********/
    static tableName = 'personas';
    static relationMappings: any = {
        user: {
            relation: Database.getModel().BelongsToOneRelation,
            modelClass: User,
            join: {
                from: 'personas.user_id',
                to: `users.id`
            }
        }
    }
}