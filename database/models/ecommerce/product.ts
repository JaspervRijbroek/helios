import { Model } from "objection";
import DealerCar from "./dealer_car";
import { Database } from "../../../lib/database";
import { BaseProperty } from "admin-bro";

export default class Product extends Database.getModel() {
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
            relation: Model.BelongsToOneRelation,
            modelClass: 'Category',
            join: {
                from: `${Product.tableName}.category_id`,
                to: `categories.id`
            }
        },
        dealerCar: {
            relation: Model.HasOneRelation,
            modelClass: DealerCar,
            join: {
                from: `${Product.tableName}.related_car`,
                to: `${DealerCar.tableName}.${DealerCar.idColumn}`
            }
        }
    }

    /******** Instance methods ********/
    toResponse(): any {
        return {
            BundleItems: {},
            CategoryId: {},
            Currency: this.currency,
            Description: this.description,
            DurationMinute: this.duration,
            Hash: this.hash,
            Icon: this.icon,
            Level: this.level,
            LongDescription: this.long_description,
            Price: this.price && this.price.toFixed(4),
            Priority: this.priority,
            ProductId: this.id,
            ProductTitle: this.title,
            ProductType: this.type,
            SecondaryIcon: this.secondary_icon,
            UseCount: this.use_count,
            VisualStyle: this.visual_style,
            WebIcon: '',
            WebLocation: ''
        }
    }
}