import xml, { Element } from "@xmpp/xml";
import ChatClient from "../lib/client";
import { Handler, HandleType } from "../decorators/handler";

@Handler('iq')
export default class IqHandler {
    @HandleType('get')
    getIqRequest(client: ChatClient, packet: Element) {
        let username = packet.getChild('query')?.getChildText('username');

        if(!client.jid && username) {
            client.jid = `${username}@${process.env.SERVER_IP}/EA-Chat`;
        }

        client.send(xml(
            'iq',
            {
                type: 'result',
                id: 'EA-Chat-1'
            },
            xml(
                'query',
                {
                    'xmlns': 'jabber:iq:auth'
                },
                xml(
                    'username',
                    {},
                    client.getUsername()
                ),
                xml(
                    'password'
                ),
                xml(
                    'digest'
                ),
                xml(
                    'resource'
                ),
                xml(
                    'query'
                )
            )
        ));
    }

    @HandleType('set')
    setIqRequest(client: ChatClient, packet: any) {
        client.send(xml(
            'iq',
            {
                type: 'result',
                id: 'EA-Chat-2',
                to: client.jid
            }
        ));
    }
}