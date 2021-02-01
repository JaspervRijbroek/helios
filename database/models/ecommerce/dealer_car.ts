import { Database } from "../../../lib/database";

export class DealerCar extends Database.getModel() {
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
    product_id?: number;

    /******** Default properties */
    static tableName: string = 'ecommerce_car_dealer';
}