import { config } from "dotenv";
import { join } from "path";
import ChatServer from "./server";

/*******************************/
/** Load in the configuration **/
/*******************************/
config({
    path: join(__dirname, '..', '..', '.env')
});

/*****************/
/** Setup debug **/
/*****************/
global.debug = require('debug')('nfsw:chat');

/**************************/
/** Starting Soap Server **/
/**************************/
new ChatServer().start();