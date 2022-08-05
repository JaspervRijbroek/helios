import { InfoPacket } from '../packet';

export default class PacketParser {
    static parse(packet: Buffer): InfoPacket {
        // Parse the header
        let header = packet.slice(0, 16),
            packetData = packet.slice(16, packet.length - 5),
            infoPacket = new InfoPacket();

        infoPacket.sequence = header.readInt16BE(0);

        if (packetData.length > 4) {
            this.parsePacketData(packetData, infoPacket);
        }

        return infoPacket;
    }

    static parsePacketData(packet: Buffer, infoPacket: InfoPacket): void {
        let type = packet.readUInt8(),
            length = packet.readUInt8(1) + 2;

        let remaining = packet.slice(length);

        switch (type) {
            case 0:
                infoPacket.channelInfo = packet.slice(2, length);
                break;
            case 1:
                infoPacket.playerInfo = packet.slice(2, length);
                break;
            case 18:
                infoPacket.carState = packet.slice(2, length);
                break;
        }

        if (remaining.length > 4) {
            return this.parsePacketData(remaining, infoPacket);
        }

        return;
    }
}
