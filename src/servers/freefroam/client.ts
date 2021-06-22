import { RemoteInfo, Socket } from "dgram";
import { InfoPacket } from "./lib/packet";

export default class Client {
    sequence: number = 0;
    lastPacket: InfoPacket|null = null;
    startTime: number = (new Date()).getTime();
    clientTime: Buffer;
    identifier: string;
    accumilator: Buffer = Buffer.alloc(0);
    timers: any[] = [];

    /**
     * There seems to be an accumilator of what happens on the server.
     * This is send every so much time (about 100ms in the SBRW server) 
     */

    constructor(public data: RemoteInfo, public server: Socket, public packet: Buffer) {
        this.clientTime = packet.slice(52, 54);

        this.identifier = `${data.port}-${data.address}`;

        // First I will create the updater.
        setInterval(this.sendAccumilator.bind(this), 100);
    }

    setPacket(packet: InfoPacket) {
        this.lastPacket = packet;
    }

    getSequence() {
        let sequence = Buffer.alloc(2);
        sequence.writeUInt8(this.sequence++);

        return sequence;
    }

    getClientTimeDiff() {
        let diff = (new Date()).getTime() - this.startTime,
            diffBuffer = Buffer.alloc(2);

        diffBuffer.writeUInt16LE(diff);

        return diffBuffer;
    }

    accumilate(packet: Buffer) {
        this.accumilator = Buffer.concat([this.accumilator, packet]);
    }

    send(data: Buffer) {
        this.server.send(data, this.data.port, this.data.address, () => {
            console.log(`Lets pray the data finds its way to: ${this.data.address}:${this.data.port}`);
        });
    }

    sendAccumilator() {
        // I will generate a header, set the accumilator, and set the crc.
    }

    cleanup() {
        this.timers.forEach(timer => {
            clearInterval(timer);
            clearTimeout(timer);
        })
    }
}