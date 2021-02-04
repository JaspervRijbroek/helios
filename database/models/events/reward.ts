import { Database } from "../../../lib/database";

export class EventReward extends Database.getModel() {
    /******** Model properties ********/
    id!: number;
    reputation!: number;
    experience!: number;
    boost!: number;
    cash!: number;
    card_pack_name!: string;
    event_id!: number;

    /******** Default properties ********/
    static tableName: string = 'event_rewards';
}