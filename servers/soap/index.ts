import { config } from "dotenv";
import { join } from "path";
import { createConnection } from "typeorm";
import SoapServer from "./server";

/*******************************/
/** Load in the configuration **/
/*******************************/
config();

/*****************/
/** Setup debug **/
/*****************/
global.debug = require('debug')('nfsw:soap');

/************************************/
/** Create the database connection **/
/************************************/
createConnection({
    type: "mysql",
    host: (process.env.DB_HOST as string),
    port: parseInt(process.env.DB_PORT as string),
    username: (process.env.DB_USER as string),
    password: (process.env.DB_PASS as string),
    database: (process.env.DB_NAME as string),
    entities: [join(__dirname, '..', '..', 'database', 'entities', '**', '*.ts')],
    synchronize: true
});

/**************************/
/** Starting Soap Server **/
/**************************/
new SoapServer().start();