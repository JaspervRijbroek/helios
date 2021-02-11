/**
 * This is the main index file for helios.
 */

import { green, red, yellow } from "chalk";
import { config } from "dotenv";
import { glob } from "glob";
import { ChildProcess, fork } from "child_process";
import { join } from "path";
import { IMessage } from "./communicator";
import { Config } from "./config";
import { enabled } from 'debug'
import { WriteStream } from "tty";
import { Gauge } from 'clui';
import { EOL, freemem, totalmem } from "os";
import MemoryUsageGauge from "./guages/memory_usage";
import LoadGauge from "./guages/load";

export default class Game {
    static instance: Game;
    serverInstances: any[] = [];


    static getInstance(): Game {
        if (!this.instance) {
            this.instance = new Game();
        }

        return this.instance;
    }

    constructor() {
        // Load in all the environment variables.
        config();
    }

    async start() {
        if (Config.get('showHeader') !== 'false') {
            this.showHeader();
        }

        if (!Config.check()) {
            console.log(red('Config is not yet complete, please run the command "yarn cli" to continue the setup.'));
            process.exit();
        }

        this.serverInstances = this.getServerPaths()
            .map((serverPath: string) => {
                let process = fork(serverPath);

                process.on('message', this.handleMessage.bind(this, process));

                return process;
            });

        if(!enabled('*')) {
            this.showProgress();
        }
    }

    getServerPaths(): string[] {
        return glob.sync(
            join(__dirname, '..', 'servers', '*', 'index.ts')
        );
    }

    handleMessage(requester: ChildProcess, eventData: IMessage): void {
        this.serverInstances
            .filter((server: ChildProcess) => {
                return server != requester;
            })
            .forEach((server: ChildProcess) => {
                server.send(eventData);
            });

        return;
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

    showProgress() {
        // I don't want to rely on anything system wise (it works perfect as it is).
        // So we create our own terminal.
        let terminal = new WriteStream(2),
            memoryUsage = new MemoryUsageGauge(),
            systemLoad = new LoadGauge();

        function writeGauges() {
            terminal.cursorTo(0, 0);
            terminal.clearScreenDown();

            terminal.write(memoryUsage.render());
            terminal.write(EOL);
            terminal.write(systemLoad.render());
        }

        writeGauges();
        setInterval(writeGauges, 5000);
    }
}