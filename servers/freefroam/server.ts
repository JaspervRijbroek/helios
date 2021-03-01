import { createSocket, RemoteInfo, Socket } from "dgram";
import Communicator from "../../lib/communicator";
import { Config } from "../../lib/config";
import Client from "./client";

export default class FreeroamServer {
    server: Socket;
    clients: Client[] = [];
    communicator: Communicator = Communicator.getInstance();

    constructor() {
        this.server = createSocket('udp4', (msg, rinfo) => {
            let packet = Buffer.from(msg);

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
        ].find(handler => handler.canHandle(packet)),
            client = this.getClient(info, packet);

        client.setPacket(packet);
        handler.handle(this, client);
    }

    broadcast(packet: Buffer) {
        this.clients.forEach(client => {
            client.accumilate(packet);
        })
    }

    getClient(info: RemoteInfo, packet: Buffer): Client {
        let identifier = `${info.port}-${info.address}`,
            client = this.clients.find(client => {
                return client.identifier = identifier;
            });

        if (!client) {
            console.log(info);

            client = new Client(info, this.server, packet);
            this.clients.push(client);
        }

        return client;
    }

    clientsCleanup() {
        
    }

    async start() {
        let port = Config.get('servers.freeroam.port');

        this.server.bind(port, () => {
            debug(`Freefoam Server listening on port: ${port}`);
        })
    }
}