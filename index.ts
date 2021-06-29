import Game from "./src/game";
import {yellow, green, red, bold} from 'chalk';
import debug from "debug";

console.log(yellow('Welcome to') + green('  _ _'))
console.log(green('  /\\  /\\___| (_) ___  ___ '));
console.log(green(' / /_/ / _ \\ | |/ _ \\/ __|'));
console.log(green('/ __  /  __/ | | (_) \\__ \\'));
console.log(green('\\/ /_/ \\___|_|_|\\___/|___/'));
console.log((debug.enabled('nfsw:game') ? red(bold('Debug mode!')) : '           ') + yellow('        A NFS: World Server'));
console.log();

new Game()
    .loadConfig()
    .startServers()