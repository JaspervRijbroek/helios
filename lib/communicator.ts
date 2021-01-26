/**
 * This is an IPC wrapper. This allows messages via UDP to transcend between server on the same host.
 * As far as I can still remember sockets can be send back and forth between servers and using this knowladge I can also send other sockets back and forth.
 * This is the reason that the cluster module works.
 * 
 * So every server will receive a communicator socket (which is accessable from this class).
 * And when requested it will be retrieved by the main process and send to the requester.
 */

import { EventEmitter } from "events";

export interface IMessage {
    event: string|Symbol;
    data: any[];
}

export default class Communicator extends EventEmitter {
    static instance: Communicator|null = null;

    constructor() {
        super();

        global.process && global.process.on && global.process.on('message', (data: IMessage) => {
            super.emit(data.event as string, data.data);
        })
    }

    static getInstance(): Communicator {
        if (!this.instance) {
            this.instance = new Communicator();
        }

        return this.instance;
    }

    /**
     * Send a message to a server.
     * 
     * @param server 
     * @param message 
     */
    emit(event: string|Symbol, ...data: any[]): boolean {
        // Trigger the parent
        super.emit(event as string, ...data);

        let eventData: IMessage = {
            event,
            data
        }

        global.process && global.process.send && global.process.send(eventData);

        return true;
    }
}