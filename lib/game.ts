/**
 * This is the main index file for helios.
 */

import { green, yellow } from "chalk";
import { config } from "dotenv";
import { glob } from "glob";
import { ChildProcess, fork } from "child_process";
import { join } from "path";

export default class Game {
    static instance: Game;
    serverInstances: ChildProcess[] = [];

    static getInstance(): Game {
        if(!this.instance) {
            this.instance = new Game();
        }

        return this.instance;
    }

    constructor() {
        // Load in all the environment variables.
        config();
    }

    start() {
        if(process.env.SHOWHEADER !== 'false') {
            this.showHeader();
        }

        this.serverInstances = this.getServerPaths()
            .map((serverPath: string) => {
                return fork(serverPath);
            });

        // new FreeroamServer().start();
        // new SoapServer().start();
        // new ChatServer().start();
    }

    getServerPaths(): string[] {
        return glob.sync(
            join(__dirname, '..', 'servers', '*', 'index.ts')
        );
    }

    showHeader() {
        console.log(yellow('Welcome to') + green('  _ _'))
        console.log(green('  /\\  /\\___| (_) ___  ___ '));
        console.log(green(' / /_/ / _ \\ | |/ _ \\/ __|'));
        console.log(green('/ __  /  __/ | | (_) \\__ \\'));
        console.log(green('\\/ /_/ \\___|_|_|\\___/|___/'));
        console.log(yellow('                   A NFS: World Server'));
        console.log();
    }
}