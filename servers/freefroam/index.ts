import { config } from "dotenv";
import { join } from "path";
import FreeroamServer from "./server";

/*******************************/
/** Load in the configuration **/
/*******************************/
config({
    path: join(__dirname, '..', '..', '.env')
});

/*****************/
/** Setup debug **/
/*****************/
global.debug = require('debug')('nfsw:freeroam');

/**************************/
/** Starting Soap Server **/
/**************************/
new FreeroamServer().start()