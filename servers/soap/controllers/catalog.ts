import { Request, Response } from "express";
import { Controller, Route } from "../decorators/routing";
import BaseController, { IAuthenticatedRequest } from '../../../lib/controller';
import {Product} from "../../../database/models/ecommerce/product";
import { readFileSync } from "fs";
import { join } from "path";
import { toJson } from 'xml2json';
import { Category } from "../../../database/models/ecommerce/category";
import { Persona } from "../../../database/models/persona";


@Controller()
export default class CatalogController extends BaseController {
    @Route('get', 'catalog/productsInCategory')
    async getProductsInCategory(req: IAuthenticatedRequest) {
        let persona = await req.user.$relatedQuery<Persona>('persona').first(),
            category = await Category.query().where({
                internal_name: req.query.categoryName
            }).first(),
            // Only find leveled products.
            products = !category ? [] : await category.$relatedQuery<Product>('products').where('level', '>=', persona ? persona.level : 0);

        return {
            ArrayOfProductTrans: {
                ProductTrans: products.map((product: Product) => {
                    return {
                        BundleItems: {},
                        CategoryId: {},
                        Currency: product.currency,
                        Description: product.description,
                        DurationMinute: product.duration,
                        Hash: product.hash,
                        Icon: product.icon,
                        Level: product.level,
                        LongDescription: product.long_description,
                        Price: product.price && product.price.toFixed(4),
                        Priority: product.priority,
                        ProductId: product.id,
                        ProductTitle: product.title,
                        ProductType: product.type,
                        SecondaryIcon: product.secondary_icon,
                        UseCount: product.use_count,
                        VisualStyle: product.visual_style,
                        WebIcon: '',
                        WebLocation: '',
                    }
                })
            }
        };
    }
}