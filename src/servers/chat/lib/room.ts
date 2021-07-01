import jid from "@xmpp/jid";
import xml from "@xmpp/xml";
import { v4 } from "uuid";
import ChatClient from "./client";

export default class Room {
    clients: ChatClient[] = [];

    constructor(public jid: string) {}

    /**
     * When a client is connected we will send the past messages to him.
     * <message to="sbrw.133583@51.161.118.213/EA-Chat" type="groupchat" from="channel.en__1@conference.51.161.118.213/sbrw.84367"><channel>Chat_All</channel><body>&lt;ChatMsg Type="0" Uid="78155" Time="7950043322319973973" Cs="-6753293625965889453"&gt;&lt;From&gt;XYASENPAIHUN&lt;/From&gt;&lt;Msg&gt;nice driving ^^&lt;/Msg&gt;&lt;/ChatMsg&gt;</body><stanza-id xmlns="urn:xmpp:sid:0" id="d8944b19-01b1-42ab-9e17-e06a658dd00a" by="channel.en__1@conference.51.161.118.213"/></message>
     */
    addClient(newClient: ChatClient) {
        // In usual EA fashion, they change the jid when the broadcast is done to the one from the user.
        let from = jid(this.jid),
            clientJid = jid(newClient.jid);

        from.setResource(clientJid.getLocal());

        newClient.send(xml(
            'presence',
            {
                from,
                to: newClient.jid
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
        ));

        // Send all the clients to the current user.

        // Send a presence to all other connected clients.
        this.clients.forEach((client: ChatClient) => {
            newClient.send(xml(
                'presence',
                {
                    from,
                    to: client.jid
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
            ));

            client.send(xml(
                'presence',
                {
                    from,
                    to: client.jid
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
            ));
        });

        this.clients.push(newClient);
    }

    /**
     * This method will broadcast a unavailable to the entire chat.
     * It will generate a message per client.
     */
    removeClient() {
        // Send a unavailable for the client to all connected clients.
    }

    broadcastMessage(from: ChatClient, channel: string, message: string) {
        let parsed = jid(this.jid),
            fromJid = jid(from.jid);
        parsed.setResource(fromJid.local);

        console.log(channel, message);

        this.clients.forEach((client: ChatClient) => {
            client.send(
                xml(
                    'message', {
                        from: parsed.toString(),
                        to: client.jid
                    },
                    xml('channel', {}, channel),
                    xml('body', {}, message),
                    xml('stanza-id', {
                        xmlns: 'urn:xmpp:sid:0',
                        id: v4(),
                        by: jid(this.jid).bare()
                    })
            ));

            // <stanza-id xmlns="urn:xmpp:sid:0" id="2b3e80df-5a63-4b7a-91e6-330ed8289531" by="channel.en__1@conference.51.161.118.213"/>
        })
    }
}