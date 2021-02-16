import { blue, green, yellow } from "chalk";
import { existsSync, fstat } from "fs";
import { sync } from "glob";
import { parse } from "path";

console.log(yellow('Welcome to') + green('  _ _               ___   __   _____ '));
console.log(green('  /\\  /\\___| (_) ___  ___    / __\\ / /   \\_   \\'));
console.log(green(' / /_/ / _ \\ | |/ _ \\/ __|  / /   / /     / /\\/'));
console.log(green('/ __  /  __/ | | (_) \\__ \\ / /___/ /___/\\/ /_  '));
console.log(green('\\/ /_/ \\___|_|_|\\___/|___/ \\____/\\____/\\____/  '));
console.log();

(async () => {
    let configPath = `${process.cwd()}/config.json`,
        commands = sync(`${__dirname}/cli-*.ts`)
            .reduce((carry: any, pathName: string) => {
                let parts = parse(pathName),
                    fileName = parts.name.replace('cli-', ''),
                    Module = require(pathName).default;

                carry[fileName] = new Module();

                return carry;
            }, {});

    if (!existsSync(configPath)) {
        // Calling setup.
        console.log(blue('Config file is missing, running first-time-setup!'));
        await commands['setup'].execute();
    } else {

    }

    console.log(green('All Done!'));
})();