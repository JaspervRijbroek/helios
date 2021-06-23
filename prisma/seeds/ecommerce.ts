import {PrismaClient} from "@prisma/client";

export default async function ecommerceSeeder(client: PrismaClient) {
    await client.ecommerceCategory.deleteMany({});
    await client.ecommerceProduct.deleteMany({});
    await client.dealerCar.deleteMany({});

    let
        carDealer = require('./ecommerceCarDealer.json'),
        categories = await Promise.all(require('./ecommerceCategories.json').map(async (category: any) => {
            return client.ecommerceCategory.create({
                data: {
                    name: category.name,
                    internalName: category.internal_name
                }
            })
        })),
        products = await Promise.all(require('./ecommerceProducts.json').map(async (product: any) => {
            let category = categories.find((category: any) => category.internalName == product.category) as any,
                newProduct = await client.ecommerceProduct.create({
                    data: {
                        currency: product.currency,
                        description: product.description,
                        duration: parseInt(product.duration),
                        hash: product.hash,
                        icon: product.icon,
                        level: parseInt(product.level),
                        longDescription: product.long_description,
                        price: product.price,
                        priority: product.priority,
                        title: product.title,
                        productType: product.type,
                        secondaryIcon: product.secondary_icon,
                        useCount: product.use_count,
                        visualStyle: product.visual_style,
                        categoryId: category.id
                    }
                }) as any;

            newProduct.originalID = product.originalID;

            return newProduct;
        }));

    return carDealer.map(async (car: any) => {
        let product = products.find((product: any) => car.fileID == product.originalID) as any;

        return client.dealerCar.create({
            data: {
                carId: car.Id,
                customCarId: car.CustomCar.Id,
                baseCar: car.CustomCar.BaseCar,
                carClassHash: car.CustomCar.CarClassHash,
                physicsProfileHash: car.CustomCar.PhysicsProfileHash,
                isPreset: car.CustomCar.IsPreset == 'true',
                level: parseInt(car.CustomCar.Level),
                rating: parseInt(car.CustomCar.Rating),
                version: parseInt(car.CustomCar.Version),
                skillModPartsCount: parseInt(car.CustomCar.SkillModSlotCount),
                name: car.CustomCar.Name,
                durability: parseInt(car.Durability),
                expirationDate: 0,
                heat: parseInt(car.Heat),
                ownershipType: car.OwnershipType,
                resellValue: parseInt(car.CustomCar.ResalePrice),
                paints: car.CustomCar.Paints,
                performanceParts: car.CustomCar.PerformanceParts,
                skillModParts: car.CustomCar.SkillModParts,
                vinyls: car.CustomCar.Vinyls,
                visualParts: car.CustomCar.VisualParts,
                ecommerceProductId: product.id
            }
        })
    });
}