import xml from "@xmpp/xml";
import ChatClient from "./client";

export default class Channel {
    clients: ChatClient[] = [];

    constructor(public name: string) {}

    /**
     * When a client is connected we will send the past messages to him.
     */
    addClient(newClient: ChatClient) {
        newClient.send(xml(
            'presence',
            {
                from: this.name,
                to: `nfsw.${newClient.personaId}@${process.env.SERVER_IP}/EA-Chat`
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

        // Send a presence to all other connected clients.
        this.clients.forEach((client: ChatClient) => {
            client.send(xml(
                'presence',
                {
                    from: `nfsw.${newClient.personaId}@${process.env.SERVER_IP}/EA-Chat`,
                    to: `nfsw.${client.personaId}@${process.env.SERVER_IP}/EA-Chat`
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

    broadcastMessage() {
        this.clients.forEach((client: ChatClient) => {
            client.send(xml('message', {
                from: this.name,
                to: `nfsw.${client.personaId}@${process.env.SERVER_IP}/EA-Chat`
            }));
        })
    }
}