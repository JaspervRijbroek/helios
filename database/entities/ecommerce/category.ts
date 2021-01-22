import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product";

@Entity({name: 'ecommerce_category'})
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name?: string;

    @Column()
    internalName?: string;

    @OneToMany(() => Product, product => product.category)
    products?: Product[];
}