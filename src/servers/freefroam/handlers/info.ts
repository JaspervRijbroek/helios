import { RemoteInfo } from "dgram";
import { InfoPacket } from "../lib/packet";
import FreeroamServer from "../index";

export function canHandle(packet: Buffer) {
    return packet[2] == 7;
}

export function handle(server: FreeroamServer, info: RemoteInfo, packet: Buffer) {
    // Get the client by its unique identifier.
    // We need to communicate here with other clients.
    // First we will parse the packet.
    let parsed = new InfoPacket(packet),
        client = server.getClient(info);

    // We have the client and the parsed data.
    console.log(parsed.getName(), parsed.getPersonaId(), parsed.getChannelName(), parsed.sequence);

}