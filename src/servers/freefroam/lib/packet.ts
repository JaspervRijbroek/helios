export class InfoPacket {
    currentIndex: number = 0;
    header: Buffer;
    channelInfo: Buffer = Buffer.alloc(0);
    playerInfo: Buffer = Buffer.alloc(0);
    carState: Buffer = Buffer.alloc(0);
    remainingPacket: Buffer;
    sequence: number = 0;

    constructor(public packet: Buffer) {
        this.currentIndex = 0;
        this.header = packet.slice(0, this.currentIndex += 16);
        this.remainingPacket = packet.slice(this.currentIndex, packet.length - 4) // We ignore the crc, in the future this must be fixed.
        this.sequence = this.header.readInt16BE(0);

        this.parseRemaining();
    }

    parseRemaining(): void {
        let type = this.remainingPacket[0],
            length = this.remainingPacket[1] + 2;

        switch (type) {
            case 0:
                this.channelInfo = this.remainingPacket.slice(0, length);
                break;
            case 1:
                this.playerInfo = this.remainingPacket.slice(0, length);
                break;
            case 12:
                this.carState = this.remainingPacket.slice(0, length);
                break;
        }

        this.remainingPacket = this.remainingPacket.slice(length, this.remainingPacket.length);

        // console.log(this.remainingPacket)
        if (this.remainingPacket.length > 4) {
            return this.parseRemaining();
        }

        return;
    }

    getName(): string {
        return this.playerInfo.slice(3, 15).toString();
    }

    getPersonaId(): number {
        if (this.playerInfo.length > 46) {
            return this.playerInfo.readInt16LE(43);
        }

        return 0;
    }

    getChannelName(): string {
        return this.channelInfo.slice(3, 15).toString();
    }

    get type(): PacketType {
        if(this.packet[2] == 6) {
            return PacketType.HELLO;
        } else if(this.packet[2] == 7) {
            return PacketType.INFO;
        }

        return PacketType.END;
    }
}

export function HandlePacket(): MethodDecorator {
    return function(target, propertyKey, descriptor) {

    }
}

export enum PacketType {
    HELLO,
    INFO,
    END
}