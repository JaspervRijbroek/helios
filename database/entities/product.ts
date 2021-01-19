import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    currency?: string;

    @Column()
    category?: string;

    @Column('text')
    description?: string;

    @Column()
    durationMinute?: number;

    @Column()
    hash?: string;

    @Column()
    icon?: string;

    @Column()
    level?: number;

    @Column('longtext')
    long_description?: string;

    @Column()
    price?: number;

    @Column()
    priority?: number;

    @Column()
    product_title?: string;

    @Column()
    product_id?: string;

    @Column()
    product_type?: string;

    @Column()
    secondary_icon?: string;

    @Column()
    use_count?: number;

    @Column()
    visual_style?: string;

    @Column()
    web_icon?: string;

    @Column()
    web_location?: string;
}