import ChatClient from "../client";
import PresenceResponse from "../packages/presence/response";
import { Element } from '@xmpp/xml';
import ChatServer from "../server";

export default class PresenceHandler {
    constructor(public server: ChatServer) {}

    execute(client: ChatClient, packet: Element) {
        let channel = packet.attrs.to || false;

        // Currently we will just respond with a response.
        new PresenceResponse({
            subscribeTo: channel
        }).send(client);

        // When setting new presence, we need to update the client with all the present cars.
        // This however will not make them visible yet, but most likely do a call to the server to get the users default car.

        // Broadcast presence.
        // <presence to="sbrw.133583@51.161.118.213/EA-Chat" from="channel.en__2@conference.51.161.118.213/sbrw.7912"><x xmlns="http://jabber.org/protocol/muc#user"><item affiliation="none" role="participant"/></x></presence>
    }
}