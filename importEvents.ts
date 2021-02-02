import { readFileSync, writeFileSync } from "fs";
import { toJson } from "xml2json";

(async () => {
    let xml = readFileSync(`./availableatlevel.xml`),
        eventsJson: any = toJson(xml, {
            object: true
        }),
        events: any[] = eventsJson.EventsPacket.Events.EventDefinition.map((event: any) => {
            return {
                carClassHash: event.CarClassHash,
                coins: event.Coins,
                engagePoint: {
                    x: event.EngagePoint['a:X'],
                    y: event.EngagePoint['a:Y'],
                    z: event.EngagePoint['a:Z'],
                },
                eventId: event.EventId,
                eventLocalization: event.EventLocalization,
                eventModeDescriptionLocalization: event.EventModeDescriptionLocalization,
                eventModeIcon: event.EventModeDescriptionLocalization,
                eventModeId: event.EventModeId,
                eventModeLocalization: event.EventModeLocalization,
                isEnabled: event.IsEnabled == 'true',
                isLocked: event.IsLocked == 'true',
                laps: parseInt(event.Laps),
                length: parseFloat(event.Length),
                maxClassRating: event.MaxClassRating,
                maxEntrants: event.MaxEntrants,
                maxLevel: parseInt(event.MaxLevel),
                minClassRating: event.MinClassRating,
                minEntrants: event.MinEntrants,
                minLevel: parseInt(event.MinLevel),
                regionLocalization: event.RegionLocalization,
                rewardModes: event.RewardModes['a:int'],
                timeLimit: event.TimeLimit,
                trackLayoutMap: event.TrackLayoutMap,
                trackLocalization: event.TrackLocalization
            }
        });

        writeFileSync(`${process.cwd()}/database/seeds/eventData.json`, JSON.stringify(events));
})();