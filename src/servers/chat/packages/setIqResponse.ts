import xml from "@xmpp/xml";
import ChatClient from "../client";

export default class SetIqResponse {
    send(client: ChatClient) {
        client.send(xml(
            'iq',
            {
                type: 'result',
                id: 'EA-Chat-2',
                to: `nfsw.${client.personaId}@${process.env.SERVER_IP}/EA-Chat`
            }
        ));
    }
}