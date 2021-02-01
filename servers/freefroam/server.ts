import {createSocket, RemoteInfo, Socket} from "dgram";
import {createConnection, createServer, Server} from "net";
import Communicator from "../../lib/communicator";
import { Config } from "../../lib/config";
import Client from "./client";
import { InfoPacket } from "./lib/packet";

export default class FreeroamServer {
    server: Socket;
    clients: Client[] = [];
    communicator: Communicator = Communicator.getInstance();

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

    async start() {
        let port = Config.get('servers.freeroam.port');

        this.server.bind(port, () => {
            global.debug(`Freefoam Server listening on port: ${port}`);
        })
    }
}