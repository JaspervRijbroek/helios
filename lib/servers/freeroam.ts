import {RemoteInfo, Socket} from "dgram";
import Game from "../game";
import Client from "../client";
import Response from "../response";
import Request from "../request";

export default class FreeroamServer extends Socket {
    constructor(protected game: typeof Game) {
        // @ts-ignore
        super('udp4');

        this.on('message', (data: Buffer, info: RemoteInfo) => {
            let event = this.getEvent(data),
                requestData = this.parsePackage(data),
                client = this.getClient(info, requestData),
                request = new Request(event, requestData),
                response = new Response(this, info);

            this.emit('package', client, request, response);
            return;
        });
    }

    reply(client: Client, response: Response) {
        if(response.getData() === false) {
            return;
        }

        let {port, address} = response.reference as RemoteInfo;

        this.send(response.getData(), port, address);
        return;
    }

    start() {
        this.bind(parseInt(process.env.FREEROAM_PORT as string), () => {
            console.log(`Freeroam server listening on port ${process.env.FREEROAM_PORT}`);
        })
    }

    getEvent(data: Buffer) {
        return '';
    }

    parsePackage(data: Buffer) {
        return {};
    }

    getClient(rinfo: RemoteInfo, data: any) {
        return new Client();
    }
}