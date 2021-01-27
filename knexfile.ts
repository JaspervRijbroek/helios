import { join } from "path";
import { Config } from "./lib/config";

export default {
    client: 'mysql2',
    connection: {
        host : Config.get('database.host'),
        port: Config.get('database.port'),
        user : Config.get('database.user'),
        password : Config.get('database.pass'),
        database : Config.get('database.name')
    },
    migrations: {
        directory: join(__dirname, 'database', 'migrations'),
        loadExtensions: ['.ts']
    },
    seeds: {
        directory: join(__dirname, 'database', 'seeds'),
    }
}