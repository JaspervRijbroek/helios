import { prompt } from "inquirer";
import { Config } from "../lib/config";

export default class CliSetup {
    message: string = 'Create a new configuration file';
    priority: number = 10;

    async execute(): Promise<void> {
        console.log('First a few questions about your database');
        let database: any = await prompt([
            {
                type: 'input',
                name: 'host',
                message: 'Database server host',
                default: Config.get('database.host') || 'localhost'
            },
            {
                type: 'number',
                name: 'port',
                message: 'Database server port',
                default: Config.get('database.port') || 3306
            },
            {
                type: 'input',
                name: 'user',
                message: 'Database username',
                default: Config.get('database.user') || null
            },
            {
                type: 'password',
                name: 'pass',
                message: 'Database password',
                default: Config.get('database.pass') || null
            },
            {
                type: 'input',
                name: 'name',
                message: 'Database name',
                default: Config.get('database.name') || null
            },
            {
                type: 'confirm',
                name: 'confirm',
                message: 'Are these settings correct?'
            }
        ]);

        if (!database.confirm) {
            console.log('Aborting!');
            process.exit();
        }

        console.log()
        console.log('Now for the servers');

        let answers: any = await prompt([{
            type: 'number',
            name: 'web_port',
            message: 'Desired web server port',
            default: Config.get('servers.http.port') || 3000
        },
        {
            type: 'input',
            name: 'chat_host',
            message: 'Desired chat server host',
            default: Config.get('servers.chat.host') || '127.0.0.1'
        },
        {
            type: 'number',
            name: 'chat_port',
            message: 'Desired chat server port',
            default: Config.get('servers.chat.port') || 5222
        },
        {
            type: 'input',
            name: 'freeroam_host',
            message: 'Desired freeroam server host',
            default: Config.get('servers.freeroam.host') || '127.0.0.1'
        },
        {
            type: 'number',
            name: 'freeroam_port',
            message: 'Desired freeroam server port',
            default: Config.get('servers.freeroam.port') || '127.0.0.1'
        },
        {
            type: 'input',
            name: 'race_host',
            message: 'Desired race server host',
            default: Config.get('servers.race.host') || '127.0.0.1'
        },
        {
            type: 'number',
            name: 'race_port',
            message: 'Desired race server port',
            default: Config.get('servers.race.port') || 9998
        }, {
            type: 'confirm',
            name: 'confirm',
            message: 'Are these settings correct?'
        }]);

        if(!answers.confirm) {
            console.log('Aborting!');
            process.exit();
        }

        let {host, port, user, pass, name} = database;
        Config.set('database', {host, port, user, pass, name});

        Config.set('servers', {
            chat: {
                host: answers.chat_host,
                port: answers.chat_port
            },
            freeroam: {
                host: answers.freeroam_host,
                port: answers.freeroam_port
            },
            http: {
                port: answers.web_port
            },
            race: {
                host: answers.race_host,
                port: answers.race_port
            }
        });

        Config.save();

        return;
    }
}