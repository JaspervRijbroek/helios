import { Model } from "objection";
import { Database } from "../../../lib/database";
import Event from "../event";

export default class EventSession extends Database.getModel() {
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

    /******** Instance methods ********/
    toResponse(): any {
        return {
            Challenge: {
                ChallengeId: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                LeftSize: 14,
                Pattern: 'FFFFFFFFFFFFFFFF',
                RightSize: 50,
            },
            EventId: this.event_id,
            SessionId: this.id
        }
    }
}