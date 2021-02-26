import xml from "@xmpp/xml";
import { Config } from "../../../lib/config";
import ChatClient from "../client";

export default class SetIqResponse {
    send(client: ChatClient) {
        client.send(xml(
            'iq',
            {
                type: 'result',
                id: 'EA-Chat-2',
                to: `nfsw.${client.personaId}@${Config.get('servers.chat.host')}/EA-Chat`
            }
        ));
    }
}