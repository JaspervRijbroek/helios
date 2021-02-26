import { RemoteInfo } from "dgram";
import { InfoPacket } from "../lib/packet";
import FreeroamServer from "../server";

export function canHandle(packet: Buffer) {
    return packet[2] == 7;
}

export function handle(server: FreeroamServer, info: RemoteInfo, packet: Buffer) {
    // Get the client by its unique identifier.
    // We need to communicate here with other clients.
    // First we will parse the packet.
    let parsed = new InfoPacket(packet),
        client = server.getClient(info);

    if(!client) {
        return;
    }

    if(!client.personaId) {
        client.personaId = parsed.getPersonaId();
        client.channel = parsed.getChannelName();

        // We have the client and the parsed data.
        console.log(parsed.getName(), client.personaId || parsed.getPersonaId(), client.channel || parsed.getChannelName(), parsed.sequence);
    }
}