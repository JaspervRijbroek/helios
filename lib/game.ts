/**
 * This is the main index file for helios.
 */

import { blue, green, red, yellow } from "chalk";
import { config } from "dotenv";
import { glob } from "glob";
import { ChildProcess, fork } from "child_process";
import { join } from "path";
import { Socket } from "dgram";
import { IMessage } from "./communicator";
import { Config } from "./config";
import { Setup } from "./setup";
import User from "../database/models/user";
import { prompt } from "inquirer";

export default class Game {
    static instance: Game;
    serverInstances: any[] = [];


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

    async start() {
        if(Config.get('showHeader') !== 'false') {
            this.showHeader();
        }

        if(!Config.check()) {
            console.log(red('Config file is missing, please run "yarn cli" to create a config file.'));
            process.exit();
        }

        await this.createAdminUser();

        this.serverInstances = this.getServerPaths()
            .map((serverPath: string) => {
                let process = fork(serverPath);

                process.on('message', this.handleMessage.bind(this, process));

                return process;
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

    async createAdminUser(): Promise<void> {
        let totalAdminUsers = await User.query().where({
            is_admin: true
        });

        if(totalAdminUsers.length) {
            return;
        }

        // Create the first admin.
        console.log(blue('It seems you don\'t have an admin user yet, we will now create it.'));
        
        let answers = await prompt([{
            type: 'input',
            message: 'Your desired username',
            name: 'username'
        }, {
            type: 'password',
            message: 'Your desired password',
            name: 'password'
        }, {
            type: 'confirm',
            message: 'Are these credentials correct?',
            name: 'confirm'
        }]);

        if(!answers.confirm) {
            console.log(red('An admin user is required for all other functions, please create one!'));
            process.exit();
        }

        let adminUser = await User.register(answers.username, answers.password);
        if(adminUser) {
            await adminUser.$query().patch({
                is_admin: true
            });
        }

        return;
    }
}