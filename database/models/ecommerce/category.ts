import { Model } from "objection";
import { Database } from "../../../lib/database";
import { Product } from "./product";

export class Category extends Database.getModel() {
    /******** Model properties ********/
    id!: number;
    name!: string;
    internal_name!: string;

    /******** Default properties ********/
    static tableName: string = 'ecommerce_categories';
    static relationMappings: any = {
        products: {
            relation: Model.HasManyRelation,
            modelClass: Product,
            join: {
                from: `${Category.tableName}.${Category.idColumn}`,
                to: `${Product.tableName}.category_id`
            }
        }
    }
}