import { config } from "dotenv"
import { join } from "path";

config();

export default {
    client: 'mysql2',
    connection: {
        host : process.env.DB_HOST,
        port: process.env.DB_PORT,
        user : process.env.DB_USER,
        password : process.env.DB_PASS,
        database : process.env.DB_NAME
    },
    migrations: {
        directory: join(__dirname, 'database', 'migrations'),
        loadExtensions: ['.ts']
    },
    seeds: {
        directory: join(__dirname, 'database', 'seeds'),
    }
}