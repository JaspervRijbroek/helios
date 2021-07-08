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

    @HandleType('unavailable')
    unavailable(client: ChatClient, packet: Element) {
        // Loop through all the rooms and check if the client is in there.
        // If so send an unavailable to all the connected clients.
    }
}