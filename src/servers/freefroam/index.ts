import {createSocket, RemoteInfo, Socket} from "dgram";
import Client from "./client";

const log = require('debug')('nfsw:freeroam');

export default class FreeroamServer {
    server: Socket;
    clients: Client[] = [];
    timers: any[] = [];
    handlers: any[] = [
        require('./handlers/hello'),
        require('./handlers/info'),
        require('./handlers/end')
    ];

    constructor() {
        log('Starting server');

        this.server = createSocket('udp4', (packet, rinfo) => {
            this.handlers.find(handler => handler.canHandle(packet))?.handle(this, rinfo, packet);
        });

        // Cleanup clients every second.
        // When a client disconnects there is no way of knowing
        // So we cleanup clients that didn't have a packet in a long time.
        this.timers.push(setInterval(this.clientsCleanup.bind(this), 1000));
    }

    broadcast(packet: Buffer) {
        this.clients.forEach(client => {
            client.accumilate(packet);
        })
    }

    getClient(info: RemoteInfo): Client|undefined {
        let identifier = `${info.port}-${info.address}`;

        return this.clients.find(client => {
            return client.identifier = identifier;
        });
    }

    clientsCleanup() {

    }

    start() {
        this.server.bind((process.env.FREEROAM_PORT || 9999) as number, () => {
            log(`Server listening on port: ${process.env.FREEROAM_PORT}`);
        })
    }

    stop() {
        this.server.close(() => {
            log('Server stopped');
        });

        this.timers.forEach((timer: any) => {
            clearTimeout(timer);
            clearInterval(timer);
        })
    }
}