import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @OneToOne(() => Persona, {
        eager: true
    })
    @JoinColumn()
    currentPersona?: Persona;

    @OneToMany(() => Persona, persona => persona.user)
    personas?: Promise<Persona[]>;
}