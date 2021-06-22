import ChatClient from "../client";
import PresenceResponse from "../packages/presence/response";
import {Element} from '@xmpp/xml';

export default class PresenceHandler {
    execute(client: ChatClient, packet: Element) {
        let channel = packet.attrs.to || false;

        // Currently we will just respond with a response.
        new PresenceResponse({
            subscribeTo: channel
        }).send(client);
    }
}

// <presence><show>chat</show><status>Online</status><priority>0</priority></presence>
// <presence from="sbrw.133583@51.161.118.213/EA-Chat" to="sbrw.133583@51.161.118.213/EA-Chat"><show>chat</show><status>Online</status><priority>0</priority></presence>

// <presence to='channel.EN__1@conference.127.0.0.1/nfsw.2'/>
// <presence to="sbrw.133583@51.161.118.213/EA-Chat" from="channel.en__2@conference.51.161.118.213/sbrw.134372"><x xmlns="http://jabber.org/protocol/muc#user"><item affiliation="none" role="participant"/></x></presence>