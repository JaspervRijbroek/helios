import { config } from "dotenv";
import 'reflect-metadata';
import AdminServer from "./server";

/*******************************/
/** Load in the configuration **/
/*******************************/
config();

/*****************/
/** Setup debug **/
/*****************/
global.debug = require('debug')('nfsw:admin');

/**************************/
/** Starting Soap Server **/
/**************************/
new AdminServer().start();