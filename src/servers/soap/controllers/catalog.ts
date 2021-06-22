import { Controller, Route } from "../decorators/routing";
import {Request} from "express";
import Game from "../../../game";

@Controller()
export default class CatalogController {
    @Route('get', 'catalog/productsInCategory')
    async getProductsInCategory(req: Request) {
        if(!req.query.categoryName) {
            return {};
        }

        let category = await Game.db.ecommerceCategory.findFirst({
            where: {
                internalName: req.query.categoryName as string
            },
            include: {
                products: true
            }
        });

        if(!category) {
            return {};
        }

        return {
            ArrayOfProductTrans: {
                ProductTrans: category.products.map(product => {
                    return {
                        BundleItems: {},
                        CategoryId: {},
                        Currency: product.currency,
                        Description: product.description,
                        DurationMinute: product.duration,
                        Hash: product.hash,
                        Icon: product.icon,
                        Level: product.level,
                        LongDescription: product.longDescription,
                        Price: product.price && product.price.toFixed(4),
                        Priority: product.priority,
                        ProductId: product.id,
                        ProductTitle: product.title,
                        ProductType: product.productType,
                        SecondaryIcon: product.secondaryIcon,
                        UseCount: product.useCount,
                        VisualStyle: product.visualStyle,
                        WebIcon: '',
                        WebLocation: '',
                    }
                })
            }
        };
    }
}