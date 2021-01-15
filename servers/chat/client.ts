import { EventEmitter } from "events";
import { Socket } from "net";
import {Element, Parser} from "@xmpp/xml";

export default class ChatClient extends EventEmitter {
    parser: Parser = new Parser();
    isShakingHands: boolean = true;
    personaId: number|string = 0;

    constructor(public socket: Socket) {
        super();

        this.bindEvents();
    };

    bindEvents() {
        this.parser.on('element', this._onElement.bind(this));
        this.parser.on('start', this.sendHandshake.bind(this));
        // this.parser.on('end', this.sendHandshake.bind(this));

        this.socket.on('data', (packet: Buffer) => {
            this.parser.write(packet);
        });
    }

    _onElement(element: any) {
        let isStanza = ['iq', 'presence', 'message'].includes(element.name);

        console.log(element.toString());
        this.emit(isStanza ? 'stanza' : 'nonstanza', this, element);
    }

    sendHandshake() {
        [
            `<stream:stream xmlns='jabber:client' xml:lang='en' xmlns:stream='http://etherx.jabber.org/streams' from='127.0.0.1' id='174159513' version='1.0'><stream:features />`,
            `<proceed xmlns='urn:ietf:params:xml:ns:xmpp-tls'/>`
        ].forEach(packet => {
            this.socket.write(packet);
        });
    }

    send(xml: Element) {
        global.debug('Sending XMPP response to client: ' + xml.toString());
        this.socket.write(xml.toString())
    }
}