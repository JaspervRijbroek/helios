import { existsSync, writeFileSync } from "fs";
import { prompt } from "inquirer";
import Listr from "listr";

export class Setup {
    /**
     * This method will check if the config.json exists and is complete.
     * If complete and existing it will return true, otherwise it will return false.
     */
    static check(): boolean {
        return existsSync(`${process.cwd()}/config.json`);
    }

    static async execute(): Promise<any> {
        debug('Running first time setup.');
        debug('Please fill in this questionare.');

        let answers: any = await prompt([
            {
                type: 'input',
                name: 'db_host',
                message: 'Database server host'
            },
            {
                type: 'number',
                name: 'db_port',
                message: 'Database server port'
            },
            {
                type: 'input',
                name: 'db_user',
                message: 'Database username'
            },
            {
                type: 'password',
                name: 'db_pass',
                message: 'Database password'
            },
            {
                type: 'input',
                name: 'db_name',
                message: 'Database name'
            },
            {
                type: 'number',
                name: 'web_port',
                message: 'Desired web server port',
                default: 3000
            },
            {
                type: 'input',
                name: 'chat_host',
                message: 'Desired chat server host',
                default: '127.0.0.1'
            },
            {
                type: 'number',
                name: 'chat_port',
                message: 'Desired chat server port',
                default: 5222
            },
            {
                type: 'input',
                name: 'freeroam_host',
                message: 'Desired freeroam server host',
                default: '127.0.0.1'
            },
            {
                type: 'number',
                name: 'freeroam_port',
                message: 'Desired freeroam server port',
                default: 9999
            },
            {
                type: 'input',
                name: 'race_host',
                message: 'Desired race server host',
                default: '127.0.0.1'
            },
            {
                type: 'number',
                name: 'race_port',
                message: 'Desired race server port',
                default: 9998
            },
            {
                type: 'input',
                name: 'registerFeature',
                message: 'Register prefix for the register feature, leave empty to disable',
                default: ''
            }
        ]);

        return new Listr([{
            title: 'Creating config object',
            async task(ctx: any) {
                ctx.config = {
                    database: {
                        host: answers.db_host,
                        port: answers.db_port,
                        user: answers.db_user,
                        pass: answers.db_pass,
                        name: answers.db_name
                    },
                    servers: {
                        http: {
                            port: answers.web_port
                        },
                        chat: {
                            host: answers.chat_host,
                            port: answers.chat_port
                        },
                        freeroam: {
                            host: answers.freeroam_host,
                            port: answers.freeroam_port
                        },
                        race: {
                            host: answers.race_host,
                            port: answers.race_port
                        }
                    },
                    features: {
                        register: answers.registerFeature || false
                    }
                }

                return true;
            }
        }, {
            title: 'Saving config',
            task(ctx: any) {
                writeFileSync(`${process.cwd()}/config.json`, JSON.stringify(ctx.config));
            }
        }]).run();
    }
}