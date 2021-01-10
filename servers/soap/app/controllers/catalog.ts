import { Request, Response } from "express";
import { Controller, Route } from "../decorators/routing";
import { Product } from "../models/product";

@Controller()
export default class CatalogController {
    @Route('get', 'catalog/productsInCategory')
    async getProductsInCategory(req: Request, res: Response) {
        let products = await Product.find({
            category: req.query.categoryName as string
        });

        return res.json({
            ArrayOfProductTrans: {
                ProductTrans: products.map((product: Product) => {
                    return {
                        BundleItems: {},
                        CategoryId: {},
                        Currency: product.currency,
                        Description: product.description,
                        DurationMinute: product.durationMinute,
                        Hash: product.hash,
                        Icon: product.icon,
                        Level: product.level,
                        LongDescription: product.long_description,
                        Price: product.price && product.price.toFixed(4),
                        Priority: product.priority,
                        ProductId: product.product_id,
                        ProductTitle: product.product_title,
                        ProductType: product.product_type,
                        SecondaryIcon: product.secondary_icon,
                        UseCount: product.use_count,
                        VisualStyle: product.visual_style,
                        WebIcon: product.web_icon,
                        WebLocation: product.web_location,
                    }
                })
            }
        });
    }
}