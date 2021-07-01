import { RemoteInfo } from "dgram";
import Client from "../client";
import FreeroamServer from "../index";

export function canHandle(packet: Buffer) {
    return packet[2] == 6;
}

export function handle(server: FreeroamServer, info: RemoteInfo, packet: Buffer) {
    let client = new Client(info, server.server, packet);

    if(!server.clients.includes(client)) {
        server.clients.push(client);
    }

    let sequence = client.getSequence(),
        timeDiff = client.getClientTimeDiff(),
        clientTime = client.clientTime,
        dataPacket = Buffer.alloc(11);

    dataPacket.writeInt16LE(sequence);
    dataPacket.writeInt8(1, 2);
    dataPacket.writeInt16LE(timeDiff, 3);
    dataPacket.writeInt16LE(clientTime, 5);
    dataPacket.writeInt8(1, 7);
    dataPacket.writeInt8(1, 8);
    dataPacket.writeInt8(1, 9);
    dataPacket.writeInt8(1, 10);

    // 0000010000185301010101
    // 0000010000285701010101
    // 0000010000384b01010101
    // 0000010000481d01010101
    // 0000010000802d49260301

    console.log('0000010000092e49260301');
    console.log(Buffer.from(dataPacket).toString('hex'));
    client.send(Buffer.from(dataPacket));
}