import { createSocket, RemoteInfo, Socket } from 'dgram';
import Client from './lib/client';

export default class FreeroamServer extends Socket {
    clients: Client[] = [];
    timers: any[] = [];
    handlers: any[] = [require('./handlers/hello'), require('./handlers/info')];

    constructor() {
        // @ts-ignore
        super('udp4');

        this.on('message', (packet: Buffer, rinfo: RemoteInfo) => {
            // console.log(`${rinfo.address}:${rinfo.port} ${packet.toString('hex')}`);
            this.handlers
                .find((handler) => handler.canHandle(packet))
                ?.handle(this, this.getClient(rinfo), packet);
        });

        // Cleanup clients every second.
        // When a client disconnects there is no way of knowing
        // So we cleanup clients that didn't have a packet in a long time.
        // this.timers.push(setInterval(this.clientsCleanup.bind(this), 1000));
    }

    getClient(info: RemoteInfo): Client {
        let identifier = `${info.port}-${info.address}`;

        return (
            this.clients.find((client) => {
                return client.identifier === identifier;
            }) || new Client(info, this)
        );
    }

    clientsCleanup(): void {
        return this.clients
            .filter((client) => client.active)
            .forEach((client) =>
                this.clients.splice(this.clients.indexOf(client), 1)
            );
    }

    start(): void {
        this.bind(parseInt(process.env.FREEROAM_PORT as string), () => {});

        return;
    }

    stop(): void {
        this.close();

        this.timers.forEach((timer: any) => {
            clearTimeout(timer);
            clearInterval(timer);
        });

        return;
    }
}
