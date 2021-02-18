import { ContextMethod, QueryContext } from "objection";
import { Database } from "../../lib/database";

export default class PersonaCar extends Database.getModel() {
    /******** Model properties ********/
    id!: number;
    car_id?: string;
    custom_car_id?: string;
    base_car?: string;
    car_class_hash?: string;
    physics_profile_hash?: string;
    is_preset?: boolean;
    level?: number;
    rating?: number;
    version?: number;
    skill_mod_parts_count?: number;
    name?: string;
    durability?: number;
    expiration_date?: number;
    heat?: number;
    ownership_type?: string;
    resell_value?: number;
    paints?: string|any;
    performance_parts?: string|any;
    skill_mod_parts?: string|any;
    vinyls?: string|any;
    visual_parts?: string|any;
    persona_id?: number;

    /******** Default properties */
    static tableName: string = 'persona_cars';

    /******** Hooks ********/
    $beforeInsert(context: QueryContext) {
        // Serialize JSON.
        console.log(context);
    }
}