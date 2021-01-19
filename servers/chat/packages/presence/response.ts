import xml from "@xmpp/xml";
import ChatClient from "../../client";

export default class PresenceResponse
{
    constructor(public data: any) {}

    send(client: ChatClient) {
        if(this.data.subscribeTo) {
            return this.subscribeResponse(client);
        }

        return client.send(
            xml(
                'presence',
                {
                    from: `nfsw.${client.personaId}@${process.env.FREEROAM_IP}/EA-Chat`,
                    to: `nfsw.${client.personaId}@${process.env.FREEROAM_IP}/EA-Chat`
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
                    from: this.data.subscribeTo,
                    to: `nfsw.${client.personaId}@${process.env.FREEROAM_IP}/EA-Chat`
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

        // <presence to="sbrw.133583@51.161.118.213/EA-Chat" from="channel.en__2@conference.51.161.118.213/sbrw.134372"><x xmlns="http://jabber.org/protocol/muc#user"><item affiliation="none" role="participant"/></x></presence>
        // <presence to="nfsw.2@127.0.0.1/EA-Chat"           from="channel.EN__1@conference.127.0.0.1/nfsw.2">          <x xmlns="http://jabber.org/protocol/muc#user"><item affiliation="none" role="participant"/></x></presence>
    }
}