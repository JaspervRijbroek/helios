import FreeroamServer from '../server';
import Client, { ISiblingSlots } from '../lib/client';
import PacketParser from '../lib/packet/parser';

export function canHandle(packet: Buffer) {
    return packet[2] === 7;
}

export function handle(server: FreeroamServer, client: Client, packet: Buffer) {
    const infoPacket = PacketParser.parse(packet);

    client.ping = new Date().getTime() - client.lastPacketTime;
    client.lastPacketTime = new Date().getTime();

    // Set all the parsed data.
    infoPacket.carState.length &&
        client.getState('car').setData(infoPacket.carState) &&
        (client.posRecvTD = client.getTimeDiff());
    infoPacket.playerInfo.length &&
        client.getState('info').setData(infoPacket.playerInfo);
    infoPacket.channelInfo.length &&
        client.getState('channel').setData(infoPacket.channelInfo);

    // If the client isn't ready yet we will skip all the information.
    if (!client.ready) {
        return;
    }

    let count = packet.readInt16BE(8);
    client.slots.forEach((slot) => {
        if (!slot.updateAcked) {
            if (count === slot.packetSendSeq) {
                slot.updateAcked = true;
            } else {
                slot.ackMissedCount++;
            }
        }
    });

    // Create the package.
    let buff = Buffer.alloc(12),
        sequence = client.getSequence();

    recalculateSlots(server, client);

    buff.writeUInt16BE(sequence);
    buff.writeInt8(0x02, 2);
    buff.writeUInt16BE(client.getTimeDiff(), 3);
    buff.writeInt16BE(client.cliTime || 0, 5);
    buff.writeUInt16BE(sequence, 7);
    buff.writeUInt8(255, 9);
    buff.writeUInt8(255, 10);
    buff.writeInt8(0, 11);

    let fullSends = 0;
    for (let i = 0; i < 14; i++) {
        let slot = client.slots[i] as ISiblingSlots,
            packetTime =
                client.getTimeDiff() -
                ((slot && slot.client && slot.client.ping) || 0);

        packetTime = packetTime < 0 ? 0 : packetTime;

        if (!slot) {
            buff = Buffer.concat([buff, Buffer.from([255, 255])]);
        } else if (fullSends >= 3) {
            buff = Buffer.concat([buff, slot.client.getPosPacket(packetTime)]);
            slot.lastCptTime = slot.client.posRecvTD;
        } else if (!slot.hasSentFull) {
            buff = Buffer.concat([buff, slot.client.getFullPacket(packetTime)]);

            slot.hasSentFull = true;
            slot.packetSendSeq = sequence;
            slot.lastCptTime = slot.client.posRecvTD;
            fullSends++;
        } else if (slot.updateAcked || slot.ackMissedCount < 5) {
            buff = Buffer.concat([buff, slot.client.getPosPacket(packetTime)]);
            slot.lastCptTime = slot.client.posRecvTD;
        } else {
            buff = Buffer.concat([buff, slot.client.getFullPacket(packetTime)]);
            slot.ackMissedCount = 0;
            slot.packetSendSeq = sequence;
            slot.lastCptTime = slot.client.posRecvTD;
            fullSends++;
        }
    }

    client.sendRaw(Buffer.concat([buff, Buffer.from([1, 1, 1, 1])]));
}

function recalculateSlots(server: FreeroamServer, client: Client): void {
    let allowedDistance = 105000, // Just a random number for now.
        possibleCandidates = server.clients
            .filter((sibling) => sibling.active) // Filter out inactive clients
            .filter((sibling) => sibling.ready)
            .filter((sibling) => sibling !== client) // Filter out myself.
            .filter((sibling: Client) => {
                const siblingLocation = sibling.getState('car').getLocation(),
                    ownLocation = client.getState('car').getLocation();

                if (!siblingLocation || !ownLocation) {
                    return false;
                }

                const distance = Math.sqrt(
                    Math.pow(siblingLocation.x - ownLocation.x, 2) +
                        Math.pow(siblingLocation.y - ownLocation.y, 2)
                );

                return distance <= allowedDistance;
            });

    // Remove old slots.
    client.slots
        .filter((slot) => !possibleCandidates.includes(slot.client))
        .forEach((slot) => client.slots.slice(client.slots.indexOf(slot), 1));

    // Add new candidates
    possibleCandidates
        .filter(
            (candidate: Client) =>
                !client.slots.find((slot) => slot.client === candidate)
        )
        .forEach((candidate: Client) => {
            client.slots.push({
                client: candidate,
                updateAcked: false,
                hasSentFull: false,
                ackMissedCount: 0,
                packetSendSeq: 0,
                lastCptTime: 0,
            });
        });
}
