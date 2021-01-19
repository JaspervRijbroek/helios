import { config } from "dotenv";
import { readFileSync } from "fs";
import { sync } from "glob";
import { join, parse } from "path";
import { createConnection } from "typeorm";
import { toJson } from "xml2json";
import { Product } from "./database/entities/product";

config();

createConnection({
    type: "mysql",
    host: (process.env.DB_HOST as string),
    port: parseInt(process.env.DB_PORT as string),
    username: (process.env.DB_USER as string),
    password: (process.env.DB_PASS as string),
    database: (process.env.DB_NAME as string),
    entities: [join(__dirname, 'database', 'entities', '**', '*.ts')],
    synchronize: true
})
    .then(() => {
        let files = sync('./originalXML/catalog/*.xml'),
            promises = files.map(file => {
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

                let prses = items.filter((item: any) => !!item).map((item: any) => {
                    function getValue(val: any, fallback: any = '') {
                        return (val && typeof val != 'object') ? val : fallback;
                    }

                    let product = new Product();
                    product.currency = getValue(item.Currency);
                    product.description = getValue(item.Description);
                    product.durationMinute = getValue(item.DurationMinute, 60);
                    product.category = category;
                    product.hash = getValue(item.Hash);
                    product.icon = getValue(item.Icon);
                    product.level = getValue(item.Level, 1);
                    product.long_description = getValue(item.LongDescription);
                    product.price = parseInt(getValue(item.Price, 0));
                    product.priority = parseInt(getValue(item.Priority, 0));
                    product.product_type = getValue(item.ProductType);
                    product.secondary_icon = getValue(item.SecondaryIcon);
                    product.use_count = parseInt(getValue(item.UseCount, 1));
                    product.visual_style = getValue(item.VisualStyle);
                    product.product_id = getValue(item.ProductId);
                    product.product_title = getValue(item.ProductTitle);
                    product.product_type = getValue(item.ProductType);
                    product.web_icon = '';
                    product.web_location = '';

                    return product.save()
                        .catch((err: any) => {
                            console.log(err.message);
                            console.log(item);
                            process.exit();
                        });
                });

                return Promise.all(prses);
            })

        return Promise.all(promises);
    }).then(() => {
        console.log('Data imported');
    });