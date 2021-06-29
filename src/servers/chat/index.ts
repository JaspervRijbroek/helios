import {createServer, Server} from "net";
import ChatClient from "./lib/client";
import {sync} from 'glob';
import { join, parse } from "path";
import { Element } from "@xmpp/xml";

const log = require('debug')('nfsw:chat');

export default class ChatServer {
    server: Server;
    clients: ChatClient[] = [];
    handlers: Map<string, any> = new Map();
    channels: any = {};

    constructor() {
        log('Starting server');
        this.loadHandlers();

        this.server = createServer((socket) => {
            let client = new ChatClient(socket)

            log('Client connected');
            this.clients.push(client)

            client.on('stanza', this.handlePacket.bind(this));
            client.on('close', this.closeSocket.bind(this));
        });
    }

    handlePacket(client: ChatClient, packet: Element) {
        let event = `${packet.name}`;

        if(packet.attrs && packet.attrs.type) {
            event += `:${packet.attrs.type}`;
        }

        console.log(event);
        // Get the handler of the current packet.
        if(this.handlers.has(event)) {
            this.handlers.get(event)(client, packet);
        }
    }

    loadHandlers(): void {
        log('Loading handlers');
        sync(join(__dirname, 'handlers', '*.ts'))
            .map((handlerPath: string) => {
                let Handler = require(handlerPath).default,
                    typeHandler = Reflect.getMetadata('handler', Handler),
                    typeHandlers = Reflect.getMetadata('typeHandlers', Handler);

                if(!typeHandlers) {
                    return;
                }

                let handler = new Handler(this);

                typeHandlers.forEach((element: any) => {
                    this.handlers.set(`${typeHandler}${element.type ? ':' + element.type : '' }`, handler[element.handler].bind(handler));
                });
            });
    }

    closeSocket(client: ChatClient) {
        log('Closing the chat client');
        this.clients = this.clients.filter(tmpClient => {
            return tmpClient != client;
        });

        client.socket.end();
    }

    start() {
        this.server.listen(process.env.CHAT_PORT, () => {
            log(`Server listening on port ${process.env.CHAT_PORT}`);
        })
    }

    stop() {
        this.server.close(() => {
            log('Server stopped');
        });
    }
}