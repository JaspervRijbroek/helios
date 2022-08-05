import { PrismaClient } from ".prisma/client";

export default async function sceneriesSeeder(client: PrismaClient) {
    await client.sceneries.deleteMany({});

    [{
        sceneryId: 0,
        description: 'SCENERY_GROUP_NORMAL',
        active: true
    }, {
        sceneryId: 1,
        description: 'SCENERY_GROUP_OKTOBERFEST',
        active: true
    }, {
        sceneryId: 2,
        description: 'SCENERY_GROUP_HALLOWEEN',
        active: true
    }, {
        sceneryId: 3,
        description: 'SCENERY_GROUP_CHRISTMAS',
        active: true
    }, {
        sceneryId: 5,
        description: 'SCENERY_GROUP_NEWYEARS',
        active: true
    }].map(async (scenery) => {
        await client.sceneries.create({
            data: scenery
        });
    })
}