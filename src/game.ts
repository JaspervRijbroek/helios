/**
 * Main server starter and this will also include the config and all other stuff.
 */
import 'reflect-metadata';

import debug from "debug";
import {sync} from "glob";
import {PrismaClient} from "@prisma/client";

const log = debug('nfsw:game')

export default class Game {
    static db: PrismaClient = new PrismaClient();

    loadConfig(path: string = `${__dirname}/../.env`): Game {
        log(`Loading configuration: ${path}`);
        require('dotenv').config(path);

        return this;
    }

    startServers() {
        // All servers will be started in the same process.
        log('Starting all servers');

        sync(`${__dirname}/servers/*/index.ts`).forEach((path) => {
            let Server = require(path).default;

            new Server().start();
        });
    }
}