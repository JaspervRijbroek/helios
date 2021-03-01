import Client from "../client";
import { InfoPacket } from "../lib/packet";
import FreeroamServer from "../server";

export function canHandle(packet: Buffer) {
    return packet[2] == 7;
}

export function handle(server: FreeroamServer, client: Client) {
    // Get the client by its unique identifier.
    // We need to communicate here with other clients.
    // First we will parse the packet.
    let parsed = client.lastPacket,
        isNew = client.personaId,
        updatePacket;

    // If we have the data, we will update it in this handler.
    // The last packet will remain in the client.

    client.personaId = client.personaId || parsed.getPersonaId();
    client.channel = client.channel || parsed.getChannelName();
    client.name = client.name || parsed.getName();
    client.position = {
        x: parsed.getPosX() || (client.position && client.position.x) || 0,
        y: parsed.getPosY() || (client.position && client.position.y) || 0,
        z: parsed.getPosZ() || (client.position && client.position.z) || 0,
    }

    // if(isNew) {
        let carState = Buffer.from(client.lastPacket.carState),
            timeDiff = client.getClientTimeDiff(),
            channelInfo = Buffer.from(client.lastPacket.channelInfo),
            playerInfo = Buffer.from(client.lastPacket.playerInfo);

        carState[2] = timeDiff[0];
        carState[3] = timeDiff[1];
        
        updatePacket = Buffer.concat([channelInfo, playerInfo, carState]);
    // } else {
    //     let timeDiff = client.getClientTimeDiff();

    //     updatePacket = Buffer.from(client.lastPacket.carState)

    //     updatePacket[2] = timeDiff[0];
    //     updatePacket[3] = timeDiff[1];
    // }

    server.broadcast(updatePacket);
}