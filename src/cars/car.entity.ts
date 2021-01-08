import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Car extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    persona_id?: number;

    @Column()
    base_car?: number;

    @Column()
    name?: string;

    @Column()
    class_hash?: number;

    @Column()
    level?: number;

    @Column()
    is_preset?: boolean;

    @Column()
    is_default?: boolean;

    @Column('simple-json')
    paints?: any[];

    @Column('simple-json')
    performance_parts?: any[];

    @Column()
    physics_hash?: number;

    @Column()
    rating?: number;

    @Column()
    resale_price?: number;

    @Column('simple-json')
    skill_parts?: any[];

    @Column()
    skill_mod_slots?: number;

    @Column()
    height_drop?: number;

    @Column()
    version?: number;

    @Column('simple-json')
    vinyls?: any[];

    @Column('simple-json')
    visual_parts?: any[];
}