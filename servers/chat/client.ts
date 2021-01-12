import { EventEmitter } from "events";
import { readFileSync } from "fs";
import { Socket } from "net";
import { join, resolve } from "path";
import { TLSSocket } from "tls";
import { toJson } from "xml2json";

export default class ChatClient extends EventEmitter {
    isConnected: boolean = false;
    isShakingHands: boolean = false;

    constructor(public socket: Socket) {
        super();

        this.bindEvents();
    };

    bindEvents() {
        this.socket.on('data', (packet: Buffer) => {
            if(packet.toString() === '</stream:stream>') {
                return this.emit('close', this);
            }

            this.emit('packet', this, packet.toString());
        });
    }

    sendHandshake() {
        this.isConnected = true;

        [
            `<stream:stream xmlns='jabber:client' xml:lang='en' xmlns:stream='http://etherx.jabber.org/streams' from='127.0.0.1' id='174159513' version='1.0'><stream:features />`,
            `<proceed xmlns='urn:ietf:params:xml:ns:xmpp-tls'/>`
        ].forEach(packet => {
            this.socket.write(packet);
        });

        // Wrap into a tlssocket.
        // this.socket = new TLSSocket(this.socket, {
        //     isServer: true,
        //     key: readFileSync(join(process.cwd(), 'public', 'resources', 'selfsigned.key')),
        //     cert: readFileSync(join(process.cwd(), 'public', 'resources', 'selfsigned.cer')),
        //     passphrase: '123456',
        //     rejectUnauthorized: false
        // });

        // this.bindEvents();

        [
            "<stream:stream xmlns='jabber:client' xml:lang='en' xmlns:stream='http://etherx.jabber.org/streams' from='127.0.0.1' id='5000000000000A' version='1.0'><stream:features/>",
            "",
            "<iq id='EA-Chat-2' type='result' xml:lang='en'/>",
            ""
        ].forEach(packet => {
            this.socket.write(packet);
        })
    }
}