import xml from "@xmpp/xml";
import ChatClient from "../client";

export default class GetIqResponse {
    constructor(public username: string) {}

    send(client: ChatClient) {
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
                    'nfsw.' + this.username
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
}

// <iq type="result" id="EA-Chat-1"><query xmlns="jabber:iq:auth"><username>sbrw.133583</username><password/><digest/><resource/></query></iq>