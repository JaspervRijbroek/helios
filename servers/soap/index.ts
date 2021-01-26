import { config } from "dotenv";
import SoapServer from "./server";
import 'reflect-metadata';

/*******************************/
/** Load in the configuration **/
/*******************************/
config();

/*****************/
/** Setup debug **/
/*****************/
global.debug = require('debug')('nfsw:soap');

/**************************/
/** Starting Soap Server **/
/**************************/
new SoapServer().start();