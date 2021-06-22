import {PrismaClient} from "@prisma/client";

export default async function eventsSeeder(client: PrismaClient) {
    await client.event.deleteMany({})

    require('./eventsData.json')
        .map((eventData: any) => ({
            carClassHash: eventData.carClassHash,
            coins: parseInt(eventData.coins),
            engagePoint: eventData.engagePoint,
            localization: eventData.eventLocalization,
            modeDescriptionLocalization: eventData.eventModeDescriptionLocalization,
            modeIcon: eventData.eventModeIcon,
            modeId: eventData.eventModeId,
            modeLocalization: eventData.eventModeLocalization,
            enabled: eventData.isEnabled,
            locked: eventData.isLocked,
            laps: eventData.laps,
            length: eventData.length,
            maxClassRating: eventData.maxClassRating,
            maxEntrants: parseInt(eventData.maxEntrants),
            maxLevel: eventData.maxLevel,
            minClassRating: eventData.minClassRating,
            minEntrants: parseInt(eventData.minEntrants),
            minLevel: eventData.minLevel,
            regionLocalization: eventData.regionLocalization,
            rewardModes: eventData.rewardModes,
            timeLimit: parseInt(eventData.timeLimit),
            trackLayoutMap: eventData.trackLayoutMap,
            trackLocalization: eventData.trackLocalization,
        }))
        .forEach(async (eventData: any) => {
            await client.event.create({data: eventData})
        });
}