import { Controller, Get } from '../decorators/routing';
import { Request } from 'express';
import Game from '../../../lib/game';

@Controller()
export default class CatalogController {
    @Get('catalog/productsInCategory')
    async getProductsInCategory(req: Request) {
        if (!req.query.categoryName) {
            return {};
        }

        let products = await Game.db.ecommerceProduct.findMany({
            where: {
                category: {
                    internalName: req.query.categoryName as string,
                },
            },
        });

        return {
            ArrayOfProductTrans: {
                ProductTrans: products.map((product) => {
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
                    };
                }),
            },
        };
    }
}
