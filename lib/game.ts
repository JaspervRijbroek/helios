/**
 * This is the main index file for helios.
 */

import { green, yellow } from "chalk";
import { config } from "dotenv";
import SoapServer from "../servers/soap/server";

export default class Game {
    static instance: Game;

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

        // Start the various servers,
        // I still need to think about it to make this threaded.
        // This still is a possibility.
        new SoapServer().start();
    }

    showHeader() {
        console.log(yellow('Welcome to') + green('  _ _'))
        console.log(green('  /\\  /\\___| (_) ___  ___ '));
        console.log(green(' / /_/ / _ \\ | |/ _ \\/ __|'));
        console.log(green('/ __  /  __/ | | (_) \\__ \\'));
        console.log(green('\\/ /_/ \\___|_|_|\\___/|___/'));
        console.log(yellow('                   A NFS: World Server'));
    }
}