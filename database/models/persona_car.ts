import { QueryContext } from "objection";
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

    /******** Default properties ********/
    static tableName: string = 'persona_cars';

    /******** Instance methods ********/
    toResponse(): any {
        return {
            CustomCar: {
                BaseCar: this.base_car,
                CarClassHash: this.car_class_hash,
                Id: this.id,
                IsPreset: 'true',
                Level: this.level,
                Name: this.name,
                Paints: JSON.parse(this.paints),
                PerformanceParts: JSON.parse(this.performance_parts),
                PhysicsProfileHash: this.physics_profile_hash,
                Rating: this.rating,
                ResalePrice: this.resell_value,
                RideHeightDrop: 0,
                SkillModParts: JSON.parse(this.skill_mod_parts),
                SkillModSlotCount: this.skill_mod_parts_count,
                Version: this.version,
                Vinyls: JSON.parse(this.vinyls),
                VisualParts: JSON.parse(this.visual_parts)
            },
            Durability: this.durability,
            Heat: this.heat,
            Id: this.id,
            OwnershipType: this.ownership_type
        };
    }

    /******** Hooks ********/
    $beforeInsert(context: QueryContext) {
        // Serialize JSON.
        console.log(context);
    }
}