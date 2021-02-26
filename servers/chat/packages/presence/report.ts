import xml from "@xmpp/xml";
import { Config } from "../../../../lib/config";
import ChatClient from "../../client";

export default class PresenceReportResponse {
    constructor(public clients: ChatClient[]) {}

    send(client: ChatClient) {
        // Send a presenceItem for every connectedClient there is.
        this.clients.forEach((connectedClient: ChatClient) => {
            client.send(xml(
                'presence',
                {
                    to: `nfsw.${client.personaId}@${Config.get('servers.chat.host')}/EA-Chat`,
                    from: `${client.channel}/nfsw.${connectedClient.personaId}`
                },
                xml(
                    'x',
                    {
                        xmlns: 'http://jabber.org/protocol/muc#user'
                    },
                    xml(
                        'item',
                        {
                            affiliation: 'none',
                            role: 'participant'
                        }
                    )
                )
            ));
        })
    }
}