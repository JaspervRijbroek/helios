import xml from "@xmpp/xml";
import { Config } from "../../../../lib/config";
import ChatClient from "../../client";

export default class PresenceResponse {
    constructor(public presenceClient: ChatClient, public subscribeTo?: any) { }

    send(client: ChatClient) {
        if (this.subscribeTo) {
            return this.subscribeResponse(client);
        }

        return client.send(
            xml(
                'presence',
                {
                    from: `nfsw.${this.presenceClient.personaId}@${Config.get('servers.chat.host')}/EA-Chat`,
                    to: `nfsw.${this.presenceClient.personaId}@${Config.get('servers.chat.host')}/EA-Chat`
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

    subscribeResponse(client: ChatClient) {
        return client.send(
            xml(
                'presence',
                {
                    from: this.subscribeTo,
                    to: `nfsw.${this.presenceClient.personaId}@${Config.get('servers.chat.host')}/EA-Chat`
                },
                xml(
                    'x',
                    'http://jabber.org/protocol/muc#user',
                    xml(
                        'item',
                        {
                            affiliation: 'none',
                            role: 'participant'
                        }
                    )
                )
            )
        );
    }
}