import {PrismaClient} from '@prisma/client';
import ecommerceSeeder from "./seeds/ecommerce";
import eventsSeeder from "./seeds/events";
import usersSeeder from "./seeds/users";
import sceneriesSeeder from "./seeds/sceneries";

;(async () => {
    let client = new PrismaClient();

    await Promise.all([
        ecommerceSeeder(client),
        eventsSeeder(client),
        usersSeeder(client),
        sceneriesSeeder(client)
    ]);

    await client.$disconnect();
})();