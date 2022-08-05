/**
 * Main server starter and this will also include the config and all other stuff.
 */
import 'reflect-metadata';

import { PrismaClient } from '@prisma/client';
import { fork } from 'child_process';
import { sync } from 'glob';
import { parse } from 'path';
import EventEmitter from 'events';

export default class Game {
    static db: PrismaClient = new PrismaClient();
    static event: EventEmitter = new EventEmitter();
    static instance?: Game;

    servers: any = {};

    static getInstance(): Game {
        if (!this.instance) {
            this.instance = new Game();
        }

        return this.instance;
    }

    /**
     * The main process loads the config, as this is env variables it will be forced to all the children.
     * This way it works without a hitch.
     *
     * @param path
     */
    loadConfig(path: string = `${process.cwd()}/.env`): Game {
        require('dotenv').config(path);

        return this;
    }

    startServers(): Game {
        // All servers will be started in the same process.
        sync(`${__dirname}/../servers/*/index.ts`).map((serverPath) => {
            let pathParts = parse(serverPath);

            this.servers[pathParts.name] = fork(serverPath);
            this.servers[pathParts.name].on(
                'message',
                this.handleMessage.bind(this)
            );
        });

        return this;
    }

    handleMessage(messageData: any): void {
        const { recipient, data } = messageData;

        this.servers[recipient]?.send(data);

        return;
    }

    static sendEvent(recipient: 'soap' | 'freeroam' | 'chat', data: any): void {
        // @ts-ignore
        process.send({
            recipient,
            data,
        });

        return;
    }
}
