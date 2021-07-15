/**
 * Main server starter and this will also include the config and all other stuff.
 */
import 'reflect-metadata';

import debug from "debug";
import {PrismaClient} from "@prisma/client";
import SoapServer from "./servers/soap";
import FreeroamServer from "./servers/freefroam";
import ChatServer from "./servers/chat";

const log = debug('nfsw:game')

export default class Game {
    static db: PrismaClient = new PrismaClient();
    static instance?: Game;

    servers: any = {};

    static getInstance(): Game {
        if(!this.instance) {
            this.instance = new Game();
        }

        return this.instance;
    }

    loadConfig(path: string = `${process.cwd()}/.env`): Game {
        log(`Loading configuration: ${path}`);
        require('dotenv').config(path);

        return this;
    }

    startServers(): Game {
        // All servers will be started in the same process.
        log('Starting all servers');

        this.servers['soap'] = new SoapServer();
        this.servers['freeroam'] = new FreeroamServer();
        this.servers['chat'] = new ChatServer();

        for(let server in this.servers) {
            if(this.servers.hasOwnProperty(server)) {
                this.servers[server].start();
            }
        }

        return this;
    }

    stopServers(): Game {
        for (let server in this.servers) {
            if (this.servers.hasOwnProperty(server)) {
                this.servers[server].stop();
            }
        }

        return this;
    }

    getServer(server: 'soap'|'freeroam'|'chat'): any {
        return this.servers[server];
    }
}