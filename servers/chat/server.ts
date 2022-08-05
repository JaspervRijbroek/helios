import { Server, Socket } from 'net';
import ChatClient from './lib/client';
import { sync } from 'glob';
import { join, parse } from 'path';
import xml, { Element } from '@xmpp/xml';
import { jid } from '@xmpp/jid';

export default class ChatServer extends Server {
    clients: ChatClient[] = [];
    handlers: Map<string, any> = new Map();
    rooms: any = {};
    jid: string = `nfsw.engine.engine@${process.env.SERVER_IP}/EA_Chat`;

    constructor() {
        super();

        this.loadHandlers();

        this.on('connection', (socket: Socket) => {
            const client = new ChatClient(socket);

            this.clients.push(client);

            client.on('stanza', this.handlePacket.bind(this));
            client.on('close', this.closeSocket.bind(this));
        });

        process.on('message', (message: any) => {
            if (message.event === 'powerup') {
                this.broadcastPowerup(message.data);
            }
        });
    }

    handlePacket(client: ChatClient, packet: Element) {
        let event = `${packet.name}`;

        if (packet.attrs && packet.attrs.type) {
            event += `:${packet.attrs.type}`;
        }

        // Get the handler of the current packet.
        if (this.handlers.has(event)) {
            this.handlers.get(event)(client, packet);
        }
    }

    loadHandlers(): void {
        sync(join(__dirname, 'handlers', '*.ts')).map((handlerPath: string) => {
            const Handler = require(handlerPath).default,
                typeHandler = Reflect.getMetadata('handler', Handler),
                typeHandlers = Reflect.getMetadata('typeHandlers', Handler);

            if (!typeHandlers) {
                return;
            }

            const handler = new Handler(this);

            typeHandlers.forEach((element: any) => {
                this.handlers.set(
                    `${typeHandler}${element.type ? ':' + element.type : ''}`,
                    handler[element.handler].bind(handler)
                );
            });
        });
    }

    closeSocket(client: ChatClient) {
        this.clients = this.clients.filter((tmpClient) => {
            return tmpClient !== client;
        });

        client.socket.end();
    }

    start() {
        this.listen(process.env.CHAT_PORT, () => {});
    }

    stop() {
        this.close(() => {});
    }

    broadcastMessage(message: Element) {
        this.clients.forEach((client: ChatClient) => {
            client.send(message);
        });
    }

    broadcastPowerup(data: string) {
        this.clients.forEach((client: ChatClient) => {
            const to = jid(client.jid);
            to.setResource('');

            client.send(
                xml(
                    'message',
                    {
                        to,
                        id: 'JN_1234567',
                        from: this.jid,
                    },
                    xml('subject', {}, '1337733113377331'),
                    xml('body', {}, data)
                )
            );
        });
    }
}
