import ChatClient from "../lib/client";
import xml, {Element} from '@xmpp/xml';
import { Handler, HandleType } from "../decorators/handler";
import AbstractHandler from "./abstract";

/**
 * While reading up on the information presented in the XMPP MUC documentation it becomes clear
 * as to how the information should be send. Not things start to fall into place.
 */

@Handler('presence')
export default class PresenceHandler extends AbstractHandler {
    @HandleType()
    addPresence(client: ChatClient, packet: Element) {
        let channel = packet.attrs.to || false;

        if(channel) {
            return this.getRoom(channel).addClient(client);
        }

        // Currently we will just respond with a response.
        return client.send(
            xml(
                'presence',
                {
                    from: client.jid,
                    to: client.jid
                },
                xml(
                    'show',
                    {},
                    'chat'
                ),
                xml(
                    'status',
                    {},
                    'Online'
                ),
                xml(
                    'priority',
                    {},
                    0
                )
            )
        );
    }
}

// <presence><show>chat</show><status>Online</status><priority>0</priority></presence>
// <presence from="sbrw.133583@51.161.118.213/EA-Chat" to="sbrw.133583@51.161.118.213/EA-Chat"><show>chat</show><status>Online</status><priority>0</priority></presence>

// <presence to='channel.EN__1@conference.127.0.0.1/nfsw.2'/>
// <presence to="sbrw.133583@51.161.118.213/EA-Chat" from="channel.en__2@conference.51.161.118.213/sbrw.134372"><x xmlns="http://jabber.org/protocol/muc#user"><item affiliation="none" role="participant"/></x></presence>