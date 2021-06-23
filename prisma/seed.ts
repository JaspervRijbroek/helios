// import {PrismaClient} from '@prisma/client';
// import ecommerceSeeder from "./seeds/ecommerce";
// import eventsSeeder from "./seeds/events";

export default async function seed() {
    console.log('Called2');
    return 'Hello World';
}

// ;(async () => {
//     let client = new PrismaClient();

//     console.log('Called');

//     try {
//         await Promise.all([
//             ecommerceSeeder(client),
//             eventsSeeder(client)
//         ]);
//     } catch(err) {
//         console.log(err);
//     }

//     await client.$disconnect();
// })();