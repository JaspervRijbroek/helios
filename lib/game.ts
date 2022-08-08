/**
 * Main server starter and this will also include the config and all other stuff.
 */
import 'reflect-metadata';

import { PrismaClient } from '@prisma/client';
import EventEmitter from 'events';
import Client from "./client";
import SoapServer from "./servers/soap";
import ChatServer from "./servers/chat";
import FreeroamServer from "./servers/freeroam";
import Request from "./request";
import Response from "./response";

export default new class Game extends EventEmitter {
    db: PrismaClient = new PrismaClient();
    clients: Client[] = [];
    handlers: any[] = [];
    servers: any[] = [new SoapServer(this), new ChatServer(this), new FreeroamServer(this)];

    constructor() {
        super();

        // load in the config from fixed path!
        require('dotenv').config(`${process.cwd()}/.env`);

        this.on('package', (client: Client, request: Request, response: Response) => {
            let handler = this.handlers.find(handler => handler.event == request.event);

            if(!handler) {
                return response.fail();
            }

            // We have a handler, first fire the events.
            this.emit(`before.${request.event}`, client, request, response);

            response = handler(client, request, response) as Response;

            this.emit(`after.${request.event}`, client, request, response);

            return response.send();
        });

        this.servers.forEach(server => server.start());
    }
}
