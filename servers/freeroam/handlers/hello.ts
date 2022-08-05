import debug from 'debug';
import { RemoteInfo } from 'dgram';
import Client from '../lib/client';
import FreeroamServer from '../server';

export function canHandle(packet: Buffer) {
    return packet[2] === 6;
}

export function handle(server: FreeroamServer, client: Client, packet: Buffer) {
    if (!server.clients.includes(client)) {
        server.clients.push(client);
    }

    const sequence = client.getSequence(),
        dataPacket = Buffer.alloc(11);

    dataPacket.writeInt16LE(sequence);
    dataPacket.writeInt8(1, 2);
    dataPacket.writeUInt16BE(client.getTimeDiff(), 3);
    dataPacket.writeInt16LE((client.cliTime = packet.readInt16LE(52)), 5);
    dataPacket.writeInt8(73, 7);
    dataPacket.writeInt8(38, 8);
    dataPacket.writeInt8(3, 9);
    dataPacket.writeInt8(1, 10);

    client.sendRaw(dataPacket);
}
