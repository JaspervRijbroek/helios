import {createServer, Server} from "net";
import ChatClient from "./client";

export default class ChatServer {
    server: Server;
    clients: ChatClient[] = [];

    constructor() {
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