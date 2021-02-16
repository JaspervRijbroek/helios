import { blue, green, yellow } from "chalk";
import { existsSync, fstat } from "fs";
import { sync } from "glob";
import { prompt } from "inquirer";
import { parse } from "path";

console.log(yellow('Welcome to') + green('  _ _               ___   __   _____ '));
console.log(green('  /\\  /\\___| (_) ___  ___    / __\\ / /   \\_   \\'));
console.log(green(' / /_/ / _ \\ | |/ _ \\/ __|  / /   / /     / /\\/'));
console.log(green('/ __  /  __/ | | (_) \\__ \\ / /___/ /___/\\/ /_  '));
console.log(green('\\/ /_/ \\___|_|_|\\___/|___/ \\____/\\____/\\____/  '));
console.log();

(async () => {
    let configPath = `${process.cwd()}/config.json`,
        items = sync(`${__dirname}/cli-*.ts`).map((pathName: string) => {
            let parts = parse(pathName),
                fileName = parts.name.replace('cli-', ''),
                Module = require(pathName).default,
                module = new Module();

            return {
                name: module.message,
                value: fileName,
                module
            }
        }),
        commands = items
            .reduce((carry: any, item: any) => {
                carry[item.value] = item.module;

                return carry;
            }, {});

    items.sort((a: any, b: any) => {
        if(a.module.priority == b.module.priority) {
            return 0;
        }

        return a.module.priority < b.module.priority ? -1 : 1;
    });

    items.push({
        name: 'Abort',
        value: '',
        module: false
    });

    if (!existsSync(configPath)) {
        // Calling setup.
        console.log(blue('Config file is missing, running first-time-setup!'));
        await commands['setup'].execute();
    } else {
        let answers = await prompt([{
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: items
        }]);

        if(!answers.action) {
            console.log(green('Aborting!'));
            return;
        }
    }

    console.log(green('All Done!'));
})();