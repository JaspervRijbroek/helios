import {Server, Socket} from "net";
import Game from "../game";
import Client from "../client";
import Response from "../response";
import {Element, Parser} from "@xmpp/xml";
import {JID, parse} from "@xmpp/jid";
import Request from "../request";

export default class ChatServer extends Server {
    constructor(protected game: typeof Game) {
        super();

        this.on('connection', (socket: Socket) => {
            // It is a connection, so no data is present.
            let parser = new Parser();

            parser.on('element', this.handlePacket.bind(this, socket));
            parser.on('start', this.sendHandshake.bind(this, socket));
            parser.on('end', () => {});

            socket.on('data', (packet: Buffer) => parser.write(packet.toString()));
        })
    }

    reply(client: Client, response: Response) {

    }

    start() {
        this.listen(process.env.CHAT_PORT, () => {
            console.log(`Chat server listening on port ${process.env.CHAT_PORT}`);
        })
    }

    getClient(socket: Socket) {
        let client = Game.clients.find(client => {
            return client.identification.chat && client.identification.chat == `${socket.remoteAddress}:${socket.remotePort}`
        });

        if(client) {
            return client
        }

        // Create or relate a client, return a new one for now.
        return new Client();
    }

    handlePacket(socket: Socket, element: Element): void {
        // We now get some data.
        // let client = this.getClient(socket);
        if(!['iq', 'presence', 'message'].includes(element.name)) {
            return;
        }

        // Handle the request, we have a from in most if not all the headers, so we know from whom the request comes.
        let jid = parse(element.attr('from')),
            event = element.name + (element.attr('type') && ':' + element.attr('type') || ''),
            request = new Request(event, element.toJSON()),
            response = new Response(this, socket);
        // Get the client, and parse the entire object into an object.
        // I think I can make a helper to parse an object into an xmpp xml message.

        this.emit('package', new Client(), request, response);
        return;
    }

    sendHandshake(socket: Socket) {
        [
            `<stream:stream xmlns='jabber:client' xml:lang='en' xmlns:stream='http://etherx.jabber.org/streams' from='127.0.0.1' id='174159513' version='1.0'><stream:features />`,
            `<proceed xmlns='urn:ietf:params:xml:ns:xmpp-tls'/>`,
        ].forEach((packet) => socket.write(packet));
    }
}