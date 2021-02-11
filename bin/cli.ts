import { green, yellow } from "chalk";
import { existsSync } from "fs";
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
    let commandRegistry: any = sync(`${__dirname}/cli-*.ts`)
        .reduce((carry: any, filePath) => {
            let parts = parse(filePath),
                Module = require(filePath).default;


            carry[parts.name.replace('cli-', '')] = new Module();

            return carry;
        }, {}),
        choices = Object.keys(commandRegistry).map((key: string) => {
            return {
                name: commandRegistry[key].message,
                value: key
            }
        });

    choices = choices.sort((a: any, b: any): number => {
        let aCommand = commandRegistry[a.value],
            bCommand = commandRegistry[b.value];

        if(aCommand.priority == bCommand.priority) {
            return 0;
        }

        return aCommand.priority < bCommand.priority ? -1 : 1;
    });

    choices.push({
        name: 'Abort',
        value: ''
    });

    if (!existsSync(`${process.cwd()}/config.json`)) {
        // Run the setup.
        console.log(green('Welcome to Helio CLI!'));
        console.log(yellow('Running first time setup!'));

        if (commandRegistry['setup']) {
            return commandRegistry['setup'].execute();
        }
    }

    let answers = await prompt([{
        name: 'action',
        message: 'What would you like to do?',
        type: 'list',
        choices: choices
    }]);

    if(answers.action) {
        await commandRegistry[answers.action].execute();
    }

    console.log('All Done!');
    process.exit();

})();