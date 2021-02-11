import { prompt } from "inquirer";
import Prompt from "inquirer/lib/prompts/base";
import { Config } from '../lib/config';

export default class CliSetup {
    priority: number = 10;
    message: string = 'Create a new config';

    async execute(): Promise<void> {


        // request all the database and server configuration.
        console.log();
        console.log('Please tell us your database credentials')

        let dbCreds = await prompt([{
            name: 'host',
            type: 'input',
            message: 'Database host',
            default: Config.get('database.host') || 'localhost'
        }, {
            name: 'port',
            type: 'number',
            message: 'Database port',
            default: Config.get('database.port') || 3306
        }, {
            name: 'user',
            type: 'input',
            message: 'Database username',
            default: Config.get('database.user') || null
        }, {
            name: 'pass',
            type: 'password',
            message: 'Database password',
            default: Config.get('database.pass') || null
        }, {
            name: 'name',
            type: 'input',
            message: 'Database name',
            default: Config.get('database.name') || null
        }, {
            name: 'confirm',
            message: 'Are your settings correct?',
            type: 'confirm'
        }]);

        if(!dbCreds.confirm) {
            console.log('Not saving settings, aborting!');
            return;
        }

        console.log();
        console.log('Thanks, now for the server settings');
        let servers = await prompt([{
            name: 'http_port',
            message: 'HTTP server port',
            type: 'number',
            default: Config.get('servers.http.port') || 3000
        }, {
            name: 'chat_host',
            message: 'Chat server host',
            type: 'input',
            default: Config.get('servers.chat.host') || '127.0.0.1'
        }, {
            name: 'chat_port',
            message: 'Chat server port',
            type: 'input',
            default: Config.get('servers.chat.port') || 5222
        }, {
            name: 'freeroam_host',
            message: 'Freeroam communication server host',
            type: 'input',
            default: Config.get('servers.freeroam.host') || '127.0.0.1'
        }, {
            name: 'freeroam_port',
            message: 'Freeroam communication server port',
            type: 'number',
            default: Config.get('servers.freeroam.port') || 9999
        }, {
            name: 'confirm',
            message: 'Are your server settings correct?',
            type: 'confirm'
        }]);

        if(!servers.confirm) {
            console.log('Not saving settings, aborting!');
            return;
        }

        let {host, port, user, pass, name} = dbCreds;
        Config.set('database', {host, port, user, pass, name});
        Config.set('servers', {
            chat: {
                host: servers.chat_host,
                port: servers.chat_port
            },
            freeroam: {
                host: servers.freeroam_host,
                port: servers.freeroam_port
            },
            http: {
                port: servers.http_port,
            }
        });

        Config.save();

        return;
    }
}