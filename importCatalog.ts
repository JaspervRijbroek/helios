import { fstat, readFileSync, writeFileSync } from "fs";
import { sync } from "glob";
import { parse } from "path";
import { toJson } from "xml2json";

let files = sync('./originalXML/catalog/*.xml'),
    products = files.map(file => {
        let xmlContent = readFileSync(file),
            content = JSON.parse(toJson(xmlContent).toString()),
            parts = parse(file),
            category = parts.name.replace('productsInCategory_', '');

        let items = content && content.ArrayOfProductTrans && content.ArrayOfProductTrans.ProductTrans;

        if (!Array.isArray(items)) {
            items = [items];
        }

        if (!items.length) {
            return;
        }

        return items.filter((item: any) => !!item).map((item: any) => {
            function getValue(val: any, fallback: any = '') {
                return (val && typeof val != 'object') ? val : fallback;
            }

            return {
                originalID: getValue(item.ProductId),
                currency: getValue(item.Currency),
                description: getValue(item.Description),
                duration: getValue(item.DurationMinute, 60),
                category: category,
                hash: getValue(item.Hash),
                icon: getValue(item.Icon),
                level: getValue(item.Level, 1),
                long_description: getValue(item.LongDescription),
                price: parseInt(getValue(item.Price, 0)),
                priority: parseInt(getValue(item.Priority, 0)),
                type: getValue(item.ProductType),
                secondary_icon: getValue(item.SecondaryIcon),
                use_count: parseInt(getValue(item.UseCount, 1)),
                visual_style: getValue(item.VisualStyle),
                // product_id: getValue(item.ProductId),
                title: getValue(item.ProductTitle)
            }
        });
    }),
    allProducts = [].concat(...products)
        .filter((item: any, index: number, self: any[]) => self.indexOf(item) === index);

writeFileSync('./database/seeds/productData.json', JSON.stringify(allProducts));