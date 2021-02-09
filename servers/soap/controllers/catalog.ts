import { Controller, Route } from "../decorators/routing";
import BaseController, { IAuthenticatedRequest } from '../../../lib/controller';
import { Product } from "../../../database/models/ecommerce/product";
import { Category } from "../../../database/models/ecommerce/category";
import { Persona } from "../../../database/models/persona";
import { Config } from "../../../lib/config";


@Controller()
export default class CatalogController extends BaseController {
    @Route('get', 'catalog/productsInCategory')
    async getProductsInCategory(req: IAuthenticatedRequest) {
        let persona = await req.user.$relatedQuery<Persona>('persona').first(),
            category = await Category.query().where({
                internal_name: req.query.categoryName
            }).first(),
            products: any[] = [];

        if (category) {
            let queryBuilder = category.$relatedQuery<Product>('products');

            if (persona && Config.get('features.leveled_category')) {
                queryBuilder.where('level', '<=', persona.level);
            }

            products = await queryBuilder;
        }

        return {
            ArrayOfProductTrans: {
                ProductTrans: products.map((product: Product) => product.toResponse())
            }
        };
    }
}