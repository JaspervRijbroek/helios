import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user.entity";

@Entity()
export class Persona extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @ManyToOne(() => User, user => user.personas)
    user?: User;

    @Column()
    boost?: number;

    @Column()
    cash?: number;

    @Column()
    icon?: number;

    @Column()
    level?: number;

    @Column()
    motto?: string;

    @Column()
    name?: string;

    @Column()
    level_percentage?: number;

    @Column()
    rating?: number;

    @Column()
    rep?: number;

    @Column()
    rep_level?: number;

    @Column()
    score?: number;
}