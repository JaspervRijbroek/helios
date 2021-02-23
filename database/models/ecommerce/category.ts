import { BaseProperty } from "admin-bro";
import { Model } from "objection";
import { Database } from "../../../lib/database";
import Product from "./product";

export default class Category extends Database.getModel() {
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
    static BroProperties: BaseProperty[] = [
        new BaseProperty({path: 'id', type: 'number', isId: true, position: 0}),
        new BaseProperty({path: 'name', type: 'string', position: 10}),
        new BaseProperty({path: 'internal_name', type: 'string', position: 20})
    ]
}