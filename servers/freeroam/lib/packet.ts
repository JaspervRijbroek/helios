export class InfoPacket {
    header: Buffer = Buffer.alloc(0);
    channelInfo: Buffer = Buffer.alloc(0);
    playerInfo: Buffer = Buffer.alloc(0);
    carState: Buffer = Buffer.alloc(0);
    sequence: number = 0;

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
        if (this.header[2] === 6) {
            return PacketType.HELLO;
        } else if (this.header[2] === 7) {
            return PacketType.INFO;
        }

        return PacketType.END;
    }
}

export enum PacketType {
    HELLO,
    INFO,
    END,
}
