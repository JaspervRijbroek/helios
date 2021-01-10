import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Persona } from "./persona";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    full_access?: boolean;

    @Column()
    starter_pack?: string;

    @Column()
    token?: string;

    @Column()
    username?: string;

    @Column()
    password?: string;

    @OneToMany(() => Persona, persona => persona.user)
    personas?: Promise<Persona[]>;
}