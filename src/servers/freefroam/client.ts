import { RemoteInfo, Socket } from "dgram";
import { InfoPacket } from "./lib/packet";

export default class Client {
    sequence: number = 0;
    lastPacket?: InfoPacket;
    startTime: number = (new Date()).getTime();
    clientTime: number;
    identifier: string;
    accumilator: Buffer = Buffer.alloc(0);
    timers: any[] = [];
    channel?: string;
    name?: string;
    parser?: InfoPacket;

    /**
     * There seems to be an accumilator of what happens on the server.
     * This is send every so much time (about 100ms in the SBRW server) 
     */

    constructor(public data: RemoteInfo, public server: Socket, public packet: Buffer) {
        this.clientTime = packet.readInt16LE(52);

        this.identifier = `${data.port}-${data.address}`;

        // First I will create the updater.
        setInterval(this.sendAccumilator.bind(this), 85);
    }

    setPacket(packet: Buffer) {
        if(this.lastPacket) {
            this.lastPacket = new InfoPacket(packet);
        }
    }

    getSequence(): number {
        return this.sequence++;
    }

    getClientTimeDiff(): number {
        return (new Date()).getTime() - this.startTime;
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

    getPlayerPacket() {
        let posPacket = this.getStatePosPacket();

        if(!this.lastPacket || !this.isOK() || !posPacket) {
            return null;
        }

        return Buffer.concat([
            this.lastPacket.channelInfo,
            this.lastPacket.playerInfo,
            posPacket
        ]);
    }

    getStatePosPacket() {
        if(!this.lastPacket || !this.isOK()) {
            return null;
        }

        let clone = Buffer.from(this.lastPacket.carState);
        clone.writeInt16LE(this.getClientTimeDiff() - 20);

        return clone;
    }

    isOK() {
        return this.lastPacket && this.lastPacket.carState && this.lastPacket.channelInfo && this.lastPacket.playerInfo;
    }
}