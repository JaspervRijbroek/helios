import {createServer, Server} from "net";
import ChatClient from "./client";
import {sync} from 'glob';
import { join, parse } from "path";
import Communicator from "../../lib/communicator";
import { Config } from "../../lib/config";

export default class ChatServer {
    server: Server;
    clients: ChatClient[] = [];
    handlers: Map<string, any> = new Map();
    communicator: Communicator = Communicator.getInstance();

    constructor() {
        this.loadHandlers()
            .forEach((handlerPath: string) => {
                let Handler = require(handlerPath).default,
                    parts = parse(handlerPath),
                    handler = new Handler();

                this.handlers.set(parts.name, handler);
            });

        this.server = createServer((socket) => {
            let client = new ChatClient(socket)

            debug('Client connected');
            this.clients.push(client)

            client.on('stanza', this.handlePacket.bind(this));
            client.on('close', this.closeSocket.bind(this));
        });
    }

    handlePacket(client: ChatClient, packet: any) {
        // Get the handler of the current packet.
        if(this.handlers.has(packet.name)) {
            this.handlers.get(packet.name).execute(client, packet);
        }

    }

    loadHandlers(): string[] {
        return sync(join(__dirname, 'handlers', '*.ts'));
    }

    closeSocket(client: ChatClient) {
        console.log('Closing the chat client');
        this.clients = this.clients.filter(tmpClient => {
            return tmpClient != client;
        });

        client.socket.end();
    }

    start() {
        let port = Config.get('servers.chat.port');

        this.server.listen(port, () => {
            debug(`Chat server listening on port ${port}`);
        })
    }
}