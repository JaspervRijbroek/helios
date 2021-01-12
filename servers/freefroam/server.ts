import {createSocket, Socket} from "dgram";
import {createConnection, createServer, Server} from "net";

export default class FreeroamServer {
    server: Socket;

    constructor() {
        this.server = createSocket('udp4', () => {
            console.log('Connected!');
        })

        this.server.on('error', (err) => {
            console.log(`server error:\n${err.stack}`);
            this.server.close();
        });

        this.server.on('message', (msg, rinfo) => {
            console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
        });

        // this.server = createServer(() => {
        //     console.log('Connected');
        // })
    }

    async start() {
        this.server.bind(parseInt(process.env.FREEROAM_PORT as string), () => {
            global.debug(`Freefoam Server listening on port: ${process.env.FREEROAM_PORT}`);
        })
    }
}