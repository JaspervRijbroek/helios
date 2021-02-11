import { prompt } from "inquirer";
import { Config } from '../lib/config';

export default class CliFeatures
{
    message: string = 'Manage server features';
    priority: number = 30;

    async execute(): Promise<void> {
        let answers = await prompt([{
            name: 'features',
            message: 'Which features do you want to modify?',
            type: 'checkbox',
            choices: [{
                name: 'Registration',
                value: 'register'
            }, {
                name: 'Levelled categories',
                value: 'leveled_category'
            }]
        }, {
            name: 'register_enable',
            message: 'Do you want to enable registration',
            type: 'confirm',
            when: (answers) => answers.features.includes('register')
        }, {
            name: 'register_value',
            message: 'What should the registration prefix be',
            type: 'input',
            when: (answers) => answers.features.includes('register') && answers.register_enable
        }])

        if(answers.features.includes('register')) {
            Config.set('features.register', answers.register_enable ? answers.register_value : false);
        }

        Config.save();

        return;
    }
}