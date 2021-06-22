import {PrismaClient} from '@prisma/client';
import ecommerceSeeder from "./seeds/ecommerce";
import eventsSeeder from "./seeds/events";

;(async () => {
    let client = new PrismaClient();

    await Promise.all([
        ecommerceSeeder(client),
        eventsSeeder(client)
    ]);

    await client.$disconnect();
})();