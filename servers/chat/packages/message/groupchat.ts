import xml from "@xmpp/xml";
import { v4 } from "uuid";
import { Config } from "../../../../lib/config";
import ChatClient from "../../client";

export default class MessageGroupChatResponse {
    constructor(public channel: string, public from: string, public body: string, public by: string) {}

    send(client: ChatClient): void {
        // Response
        // <message><stanza-id xmlns="urn:xmpp:sid:0" id="e9d4020b-f8ab-4c94-801f-5dd6f199c672" by="channel.en__2@conference.51.161.118.213"/></message>

        client.send(xml(
            'message',
            {
                to: `nfsw.${client.personaId}@${Config.get('servers.chat.host')}/EA-Chat`,
                type: 'groupchat',
                from: this.from
            },
            xml(
                'channel',
                {},
                this.channel
            ),
            xml(
                'body',
                {},
                this.body
            ),
            xml(
                'stanza-id',
                {
                    xmlns: 'urn:xmpp:sid:0',
                    id: v4(),
                    by: this.by
                }
            )
        ));

        return;
    }
}