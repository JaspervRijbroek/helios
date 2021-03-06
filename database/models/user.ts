import { Database } from "../../lib/database";
import Persona from "./persona";
import { Config } from '../../lib/config';
import { compare, hash } from "bcrypt";
import { validate } from "uuid";
import { BaseProperty } from "admin-bro";

export default class User extends Database.getModel() {
    /******** Model properties ********/
    id!: number;
    username!: string;
    password!: string;
    token!: string;
    current_persona!: number;
    is_admin!: boolean;

    /******** Default properties ********/
    static tableName = 'users';
    static relationMappings: any = {
        personas: {
            relation: Database.getModel().HasManyRelation,
            modelClass: Persona,
            join: {
                from: `${User.tableName}.${User.idColumn}`,
                to: `${Persona.tableName}.user_id`
            }
        },
        persona: {
            relation: Database.getModel().HasOneRelation,
            modelClass: Persona,
            join: {
                from: `${User.tableName}.current_persona`,
                to: `${Persona.tableName}.${Persona.idColumn}`
            }
        }
    }
    static BroProperties = [
        new BaseProperty({path: 'id', type: 'number', isId: true}),
        new BaseProperty({path: 'username', type: 'string'}),
        new BaseProperty({path: 'password', type: 'password'}),
        new BaseProperty({path: 'is_admin', type: 'boolean'})
    ]

    /******** Static methods ********/
    static async login(username: any, password: any) {
        let canRegister = Config.get('features.register');

        if(canRegister && username.indexOf(canRegister) === 0) {
            return this.register(
                username.replace(canRegister, ''),
                password
            );
        }

        if (validate(password)) {
            return User.query().findOne({
                id: username,
                token: password
            });
        } else {
            // Try it as a password. First we will get the user, then validate.
            let foundUser = await User.query().findOne({
                username
            });
    
            if (foundUser && await compare(password, foundUser.password)) {
                return foundUser;
            }
        }

        return false;
    }

    static async register(username: any, password: any): Promise<User|false> {
        // Check if a user already exists.
        // If so return a false.
        let users = await this.query().where({username});
        if(users.length) {
            console.log(users.length);
            return false;
        }

        return User.query().insert({
            username,
            password: await hash(password, 10)
        });
    }
}