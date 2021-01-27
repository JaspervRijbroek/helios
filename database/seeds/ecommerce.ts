import Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Empty existing tables.
    await knex.schema.raw('SET GLOBAL max_allowed_packet=1073741824;')

    await Promise.all([
        knex("ecommerce_categories").del(),
        knex("ecommerce_products").del(),
        knex("ecommerce_car_dealer").del()
    ]);

    let categories = [
        { id: 1, name: 'Carslots', internal_name: 'NFSW_NA_EP_CARSLOTS' },
        { id: 2, name: 'Body paint', internal_name: 'NFSW_NA_EP_PAINTS_BODY_Category' },
        { id: 3, name: 'Wheel paint', internal_name: 'NFSW_NA_EP_PAINTS_WHEEL_Category' },
        { id: 4, name: 'Performance parts', internal_name: 'NFSW_NA_EP_PERFORMANCEPARTS' },
        { id: 5, name: 'Preset cars', internal_name: 'NFSW_NA_EP_PRESET_RIDES_ALL_Category' },
        { id: 6, name: 'Repairs', internal_name: 'NFSW_NA_EP_REPAIRS' },
        { id: 7, name: 'Skill mod parts', internal_name: 'NFSW_NA_EP_SKILLMODPARTS' },
        { id: 8, name: 'Body kits', internal_name: 'NFSW_NA_EP_VISUALPARTS_BODYKIT' },
        { id: 9, name: 'Hoods', internal_name: 'NFSW_NA_EP_VISUALPARTS_HOOD' },
        { id: 10, name: 'License plates', internal_name: 'NFSW_NA_EP_VISUALPARTS_LICENSEPLATES' },
        { id: 11, name: 'Lowering kits', internal_name: 'NFSW_NA_EP_VISUALPARTS_LOWERINGKIT' },
        { id: 12, name: 'Neon lights', internal_name: 'NFSW_NA_EP_VISUALPARTS_NEONS' },
        { id: 13, name: 'Spoilers', internal_name: 'NFSW_NA_EP_VISUALPARTS_SPOILER' },
        { id: 14, name: 'Rims', internal_name: 'NFSW_NA_EP_VISUALPARTS_WHEELS' },
        { id: 15, name: 'Window tints', internal_name: 'NFSW_NA_EP_VISUALPARTS_WINDOWTINTS' },
        { id: 16, name: 'Starting cars', internal_name: 'Starting_Cars' },
        { id: 17, name: 'Aftermarket cardpacks', internal_name: 'STORE_AFTERMARKETSHOP_CARDPACK' },
        { id: 18, name: 'Amplifiers', internal_name: 'STORE_AMPLIFIERS' },
        { id: 19, name: 'Boosterpacks', internal_name: 'STORE_BOOSTERPACKS' },
        { id: 20, name: 'Cars', internal_name: 'STORE_CARS' },
        { id: 21, name: 'Owned cars', internal_name: 'STORE_OWNEDCARS' },
        { id: 22, name: 'Performance cardpacks', internal_name: 'STORE_PERFORMANCESHOP_CARDPACK' },
        { id: 23, name: 'Powerups', internal_name: 'STORE_POWERUPS' },
        { id: 24, name: 'Skillmod parts', internal_name: 'STORE_SKILLMODPARTS' },
        { id: 25, name: 'Skillmod cardpacks', internal_name: 'STORE_SKILLMODSHOP_CARDPACK' },
        { id: 26, name: 'Streak recovery', internal_name: 'STORE_STREAK_RECOVERY' },
        { id: 27, name: 'Vanity bodykits', internal_name: 'STORE_VANITY_BODYKIT' },
        { id: 28, name: 'Vanity hoods', internal_name: 'STORE_VANITY_HOOD' },
        { id: 29, name: 'Vanity license plates', internal_name: 'STORE_VANITY_LICENSE_PLATE' },
        { id: 30, name: 'Vanity lowering kits', internal_name: 'STORE_VANITY_LOWERING_KIT' },
        { id: 31, name: 'Vanity neon lights', internal_name: 'STORE_VANITY_NEON' },
        { id: 32, name: 'Vanity spoilers', internal_name: 'STORE_VANITY_SPOILER' },
        { id: 33, name: 'Vanity rims', internal_name: 'STORE_VANITY_WHEEL' },
        { id: 34, name: 'Vanity window tints', internal_name: 'STORE_VANITY_WINDOW' },
        { id: 35, name: 'Vinyls', internal_name: 'STORE_VINYLCATEGORIES' },
    ],
        products = require('./productData.json').map((product: any, index: number) => {
            product.category_id = categories.find((category: any) => category.internal_name == product.category);
            delete product.category;

            if (product.category_id) {
                product.category_id = product.category_id.id;
            }

            product.id = index + 1;

            return product;
        }),
        cars = require('./carDealerData.json').map((car: any) => {
            // Find the related product.
            let product = products.find((product: any) => {
                return product.originalID === car.fileID;
            });

            return {
                car_id: car.Id,
                custom_car_id: car.CustomCar.Id,
                base_car: car.CustomCar.BaseCar,
                car_class_hash: car.CustomCar.CarClassHash,
                physics_profile_hash: car.CustomCar.PhysicsProfileHash,
                is_preset: car.CustomCar.IsPreset === 'true' ? 1 : 0,
                level: car.CustomCar.Level,
                rating: car.CustomCar.Rating,
                version: car.CustomCar.Version,
                skill_mod_parts_count: car.CustomCar.SkillModSlotCount,
                name: car.CustomCar.Name,
                durability: car.Durability,
                heat: car.Heat,
                ownership_type: car.OwnershipType,
                paints: JSON.stringify(car.CustomCar.Paints),
                performance_parts: JSON.stringify(car.CustomCar.PerformanceParts),
                skill_mod_parts: JSON.stringify(car.CustomCar.SkillModParts),
                vinyls: JSON.stringify(car.CustomCar.Vinyls),
                visual_parts: JSON.stringify(car.CustomCar.VisualParts),
                product_id: product ? product.id : 0
            };
        });

    await Promise.all([
        knex('ecommerce_categories').insert(categories),
        knex('ecommerce_products').insert(products.map((product: any) => {
            delete product.originalID;

            return product;
        })),
        knex('ecommerce_car_dealer').insert(cars)
    ]);
};
