import { RemoteInfo } from 'dgram';
import FreeroamServer from '../server';
import CarState from './states/car';
import ChannelState from './states/channel';
import InfoState from './states/info';
import { Buffer } from 'buffer';

/**
 * What will we need:
 * - the last know clients that are close to our current client
 *   Identified by their x and y coordinates, I don't know the radius just yet.
 *
 * - Last time that a package was send.
 * - Last send package
 * - A registry of all the packages to send at an interval
 * - A timed event to add all changes in the surrounding.
 *   The data that is accumilated is buffered in a huge buffer.
 * - A timed event to send all the collected data.
 *   After sending the data, it will empty the accumilator
 * - A packet parser
 * - A sequence, dont know its reason yet.
 *
 */

const log = require('debug')('nfsw:freeroam:client');

export interface ISiblingSlots {
    client: Client;
    updateAcked: boolean;
    hasSentFull: boolean;
    ackMissedCount: number;
    packetSendSeq: number;
    lastCptTime: number;
}

export default class Client {
    sequence: number = 0;
    lastPacketTime: number = new Date().getTime();
    identifier: string;
    slots: ISiblingSlots[] = [];
    startTime: number = new Date().getTime();
    cliTime?: number;
    ping: number = 0;
    posRecvTD: number = 0;
    states: any = {
        car: new CarState(),
        channel: new ChannelState(),
        info: new InfoState(),
    };

    /**
     * There seems to be an accumilator of what happens on the server.
     * This is send every so much time (about 100ms in the SBRW server)
     */

    constructor(public info: RemoteInfo, public server: FreeroamServer) {
        this.identifier = `${info.port}-${info.address}`;
    }

    getTimeDiff(): number {
        let diff = new Date().getTime() - this.startTime;

        if (diff >= 65535) {
            this.startTime = new Date().getTime();
            diff -= 65535;
        }

        return diff;
    }

    getSequence(): number {
        return this.sequence++;
    }

    get active(): boolean {
        return new Date().getTime() - this.lastPacketTime < 5000;
    }

    get ready() {
        return (
            this.getState('car').data.length &&
            this.getState('info').data.length &&
            this.getState('channel').data.length
        );
    }

    sendRaw(packet: Buffer): void {
        return this.server.send(packet, this.info.port, this.info.address);
    }

    getState(state: 'car' | 'info' | 'channel') {
        return this.states[state];
    }

    getPosPacket(ping: number): Buffer {
        let carBuffer = this.getState('car').data;

        if (!carBuffer) {
            return Buffer.alloc(0);
        }

        carBuffer.writeUInt16BE(ping);

        return Buffer.concat([
            Buffer.from([0]),
            Buffer.concat([Buffer.from([18, carBuffer.length]), carBuffer]),
            Buffer.from([255]),
        ]);
    }

    getFullPacket(ping: number): Buffer {
        let carBuffer = this.getState('car').data,
            playerInfo = this.getState('info').data,
            channelInfo = this.getState('channel').data;

        if (
            !carBuffer ||
            !playerInfo ||
            !channelInfo ||
            !carBuffer.length ||
            !playerInfo.length ||
            !channelInfo.length
        ) {
            return Buffer.alloc(0);
        }

        carBuffer.writeUInt16BE(ping);

        return Buffer.concat([
            Buffer.from([0]),
            Buffer.concat([Buffer.from([0, channelInfo.length]), channelInfo]),
            Buffer.concat([Buffer.from([1, playerInfo.length]), playerInfo]),
            Buffer.concat([Buffer.from([18, carBuffer.length]), carBuffer]),
            Buffer.from([255]),
        ]);
    }
}
