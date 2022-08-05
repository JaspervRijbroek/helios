import { EventEmitter } from 'events';
import { Socket } from 'net';
import { Element, Parser } from '@xmpp/xml';
import jid from '@xmpp/jid';

export default class ChatClient extends EventEmitter {
    parser: Parser = new Parser();
    personaId: number | string = 0;
    jid: string = '';

    constructor(public socket: Socket) {
        super();

        this.bindEvents();
    }

    setJID(jidString: string) {
        this.jid = jidString;
    }

    bindEvents() {
        this.parser.on('element', this._onElement.bind(this));
        this.parser.on('start', this.sendHandshake.bind(this));
        this.parser.on('end', () => {
            this.emit('close', this);
        });

        this.socket.on('data', (packet: Buffer) => {
            this.parser.write(packet.toString());
        });
    }

    _onElement(element: any) {
        const isStanza = ['iq', 'presence', 'message'].includes(element.name);

        this.emit(isStanza ? 'stanza' : 'nonstanza', this, element);
    }

    sendHandshake() {
        [
            `<stream:stream xmlns='jabber:client' xml:lang='en' xmlns:stream='http://etherx.jabber.org/streams' from='127.0.0.1' id='174159513' version='1.0'><stream:features />`,
            `<proceed xmlns='urn:ietf:params:xml:ns:xmpp-tls'/>`,
        ].forEach((packet) => {
            this.socket.write(packet);
        });
    }

    send(xml: Element) {
        this.socket.write(xml.toString());
    }

    getUsername(): string {
        return jid(this.jid).getResource();
    }
}
