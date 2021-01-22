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
createConnection();

/**************************/
/** Starting Soap Server **/
/**************************/
new SoapServer().start();