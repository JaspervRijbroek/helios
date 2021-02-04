import { Model } from "objection";
import { Database } from "../../../lib/database";
import { Event } from "../event";

export class EventSession extends Database.getModel() {
    /******** Model properties ********/
    id!: number;
    lobby_id!: number;
    event_id!: number;

    /******** Default properties ********/
    static tableName: string = 'event_sessions';
    static relationMappings = {
        event: {
            relation: Model.HasOneRelation,
            modelClass: Event,
            join: {
                from: `${EventSession.tableName}.event_id`,
                to: `${Event.tableName}.${Event.idColumn}`
            }
        }
    }
}