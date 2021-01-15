import {createSocket, RemoteInfo, Socket} from "dgram";
import {createConnection, createServer, Server} from "net";
import Client from "./client";

export default class FreeroamServer {
    server: Socket;
    clients: Client[] = [];

    constructor() {
        this.server = createSocket('udp4', (msg, rinfo) => {
            let packet = Buffer.from(msg);

            console.log(packet.toString('hex'));
            this.executePipeline(rinfo, packet)
        });

        // Cleanup clients every second.
        // When a client disconnects there is no way of knowing
        // So we cleanup clients that didn't have a packet in a long time.
        setInterval(this.clientsCleanup.bind(this), 1000);
    }

    executePipeline(info: any, packet: Buffer) {
        let handler = [
            require('./handlers/hello'),
            require('./handlers/info'),
            require('./handlers/end')
        ].find(handler => handler.canHandle(packet))

        handler.handle(this, info, packet);
    }

    broadcast(packet) {
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

    async start() {
        this.server.bind(parseInt(process.env.FREEROAM_PORT as string), () => {
            global.debug(`Freefoam Server listening on port: ${process.env.FREEROAM_PORT}`);
        })
    }
}