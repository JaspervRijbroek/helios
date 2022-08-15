import Game from "./lib/game";
import chalk from 'chalk';
import debug from "debug";

console.log(chalk.yellow('Welcome to') + chalk.green('  _ _'))
console.log(chalk.green('  /\\  /\\___| (_) ___  ___ '));
console.log(chalk.green(' / /_/ / _ \\ | |/ _ \\/ __|'));
console.log(chalk.green('/ __  /  __/ | | (_) \\__ \\'));
console.log(chalk.green('\\/ /_/ \\___|_|_|\\___/|___/'));
console.log((debug.enabled('nfsw:game') ? chalk.red(chalk.bold('Debug mode!')) : '           ') + chalk.yellow('        A NFS: World Server'));
console.log();

Game
    .start();
