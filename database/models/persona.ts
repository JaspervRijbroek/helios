import { Model } from "objection";
import { Database } from "../../lib/database";
import { PersonaCar } from "./persona_car";
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
        },
        cars: {
            relation: Model.HasManyRelation,
            modelClass: PersonaCar,
            join: {
                from: `${Persona.tableName}.${Persona.idColumn}`,
                to: `${PersonaCar.tableName}.persona_id`
            }
        }
    }

    /******** Instance methods ********/
    toResponse(): any {
        return {
            Boost: this.boost,
            Cash: this.cash,
            IconIndex: this.icon,
            Level: this.level,
            Motto: this.motto,
            Name: this.name,
            PercentToLevel: this.level_percentage,
            PersonaId: this.id,
            Rating: this.rating,
            Rep: this.rep,
            RepAtCurrentLevel: this.rep_level
        }
    }
}