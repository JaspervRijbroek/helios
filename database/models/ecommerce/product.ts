import { Database } from "../../../lib/database";
import { Category } from "./category";

export class Product extends Database.getModel() {
    /******** Model properties ********/
    id!: number;
    currency!: string;
    description!: string;
    duration!: number;
    hash!: number;
    icon!: string;
    level!: number;
    long_description!: string;
    price!: number;
    priority!: number;
    title!: string;
    type!: string;
    secondary_icon!: string;
    use_count!: number;
    visual_style!: string;

    /******** Default properties ********/
    static tableName: string = 'ecommerce_products';
    static relationMappings: any = {
        category: {
            relation: Database.getModel().BelongsToOneRelation,
            modelClass: 'Category',
            join: {
                from: `${Product.tableName}.category_id`,
                to: `categories.id`
            }
        }
    }
}