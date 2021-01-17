import xml from "@xmpp/xml";
import ChatClient from "../../client";

export default class PresenceResponse
{
    send(client: ChatClient) {
        client.send(
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

        // <presence from="sbrw.133583@51.161.118.213/EA-Chat" to="sbrw.133583@51.161.118.213/EA-Chat"><show>chat</show><status>Online</status><priority>0</priority></presence>
    }
}