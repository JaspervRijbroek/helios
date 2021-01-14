import {createServer, Server} from "net";
import ChatClient from "./client";
import {sync} from 'glob';
import { join, parse } from "path";

export default class ChatServer {
    server: Server;
    clients: ChatClient[] = [];
    handlers: Map<string, any> = new Map();

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

            global.debug('Client connected');
            this.clients.push(client)

            client.on('stanza', this.handlePacket.bind(this));
            client.on('close', this.closeSocket.bind(this));
        });
    }

    handlePacket(client: ChatClient, packet: any) {
        // Get the package type. I first need to parse it.
        // I need a good parser, after that I will trigger a handler.
        console.log(packet);

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
        this.server.listen(process.env.CHAT_PORT, () => {
            global.debug(`Chat server listening on port ${process.env.CHAT_PORT}`);
        })
    }
}