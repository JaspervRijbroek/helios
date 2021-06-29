import { RemoteInfo } from "dgram";
import Client from "../client";
import FreeroamServer from "../index";

export function canHandle(packet: Buffer) {
    return packet[2] == 6;
}

export function handle(server: FreeroamServer, info: RemoteInfo, packet: Buffer) {
    let client = new Client(info, server.server, packet);
    server.clients.push(client);

    let sequence = client.getSequence(),
        timeDiff = client.getClientTimeDiff(),
        clientTime = client.clientTime;

    let dataPacket = new Uint8Array([
        sequence[0], sequence[1],
        0x01,
        timeDiff[0], timeDiff[1],
        clientTime[0], clientTime[1],
        0x01, 0x01, 0x01, 0x01
    ]);

    client.send(Buffer.from(dataPacket));
}