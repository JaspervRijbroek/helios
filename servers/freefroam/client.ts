import { RemoteInfo, Socket } from "dgram";
import { InfoPacket } from "./lib/packet";

export interface IClientPosition {
    x: number,
    y: number,
    z: number
}

export default class Client {
    sequence: number = 0;
    lastPacket: InfoPacket;
    startTime: number = (new Date()).getTime();
    updateTime: number;
    clientTime: Buffer;
    identifier: string;
    accumilator: Buffer = Buffer.alloc(0);
    timers: any[] = [];
    personaId?: number;
    channel?: string;
    name?: string;
    crc_buffer = Buffer.from([0x01, 0x02, 0x03, 0x04]);
    position?: IClientPosition;

    /**
     * There seems to be an accumilator of what happens on the server.
     * This is send every so much time (about 100ms in the SBRW server) 
     */

    constructor(public data: RemoteInfo, public server: Socket, public packet: Buffer) {
        this.clientTime = packet.slice(52, 54);
        this.identifier = `${data.port}-${data.address}`;
        this.updateTime = (new Date()).getTime();
        this.lastPacket = new InfoPacket(packet);

        // First I will create the updater.
        setInterval(this.sendAccumilator.bind(this), 85);
    }

    setPacket(packet: Buffer) {
        this.updateTime = (new Date()).getTime();
        this.lastPacket = new InfoPacket(packet);
    }

    getSequence() {
        let sequence = Buffer.alloc(2);
        sequence.writeUInt16BE(this.sequence++);

        return sequence;
    }

    getClientTimeDiff() {
        let diff = (new Date()).getTime() - this.updateTime,
            diffBuffer = Buffer.alloc(2);

        diffBuffer.writeUInt16BE(diff);

        return diffBuffer;
    }

    accumilate(packet: Buffer) {
        // console.log(packet.length);
        this.accumilator = Buffer.concat([this.accumilator, packet]);
        // console.log(this.accumilator.length);
    }

    send(data: Buffer) {
        this.server.send(data, this.data.port, this.data.address, () => {
            console.log(`Lets pray the data finds its way to: ${this.data.address}:${this.data.port}`);
        });
    }

    sendAccumilator() {
        // I will generate a header, set the accumilator, and set the crc.

        // console.log(this.accumilator.length);
        if (this.accumilator.length) {
            let header = this.getPacketHeader(),
                packet = Buffer.concat([header, this.accumilator, this.crc_buffer]);

            this.send(packet);
            this.accumilator = Buffer.alloc(0);
        }
    }

    getPacketHeader(): Buffer {
        let sequence = this.getSequence(),
            seq2 = Buffer.alloc(2),
            timeDiff = this.getClientTimeDiff();

        seq2.writeUInt16BE(this.sequence + 1);

        return Buffer.from([
            sequence[0], sequence[1],
            0x02,
            timeDiff[0], timeDiff[1],
            this.clientTime[0], this.clientTime[1],
            seq2[0], seq2[1],
            0xff,
            0xff,
            0x00,
            0x00
        ]);
    }

    cleanup() {
        this.timers.forEach(timer => {
            clearInterval(timer);
            clearTimeout(timer);
        })
    }
}