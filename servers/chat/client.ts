import { EventEmitter } from "events";
import { Socket } from "net";
import {Parser} from "@xmpp/xml";

export default class ChatClient extends EventEmitter {
    isConnected: boolean = false;
    parser: Parser = new Parser();

    constructor(public socket: Socket) {
        super();

        this.bindEvents();
    };

    bindEvents() {
        this.socket.on('data', (packet: Buffer) => {
            this.parser.on('element', this._onElement.bind(this))
                .write(packet);
        });
    }

    _onElement(element) {
        let isStanza = ['iq', 'presence', 'message'].includes(element.name);

        this.emit(isStanza ? 'stanza' : 'nonstanza', element);
    }

    sendHandshake() {
        this.isConnected = true;

        [
            `<stream:stream xmlns='jabber:client' xml:lang='en' xmlns:stream='http://etherx.jabber.org/streams' from='127.0.0.1' id='174159513' version='1.0'><stream:features />`,
            `<proceed xmlns='urn:ietf:params:xml:ns:xmpp-tls'/>`
        ].forEach(packet => {
            this.socket.write(packet);
        });
    }
}