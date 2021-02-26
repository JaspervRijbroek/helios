import { Element } from "@xmpp/xml";
import ChatClient from "../client";
import MessageGroupChatResponse from "../packages/message/groupchat";
import ChatServer from "../server";

export default class ChatHandler {
    constructor(public server: ChatServer) {}

    execute(client: ChatClient, packet: Element) {
        // We can get a couple of message types.
        let type = packet.attrs.type;

        console.log(packet);

        switch(type) {
            case 'groupchat':
                this.handleGroupChat(client, packet);
        }
    }

    // Groupchat
    // <message to='channel.EN__2@conference.51.161.118.213' type='groupchat'><channel>Chat_All</channel><body>&lt;ChatMsg Type=&quot;0&quot; Uid=&quot;120634&quot; Time=&quot;-1254859235720894747&quot; Cs=&quot;3339213786820241329&quot;&gt;&lt;From&gt;JASPER199069&lt;/From&gt;&lt;Msg&gt;Hello Everyone&lt;/Msg&gt;&lt;/ChatMsg&gt;</body></message>
    handleGroupChat(client: ChatClient, packet: Element) {
        let channel = packet.children[0].children[0].toString(),
            body = packet.children[1].children[0].toString(),
            from = `${packet.attrs.to}/nfsw.${client.personaId}`,
            by = packet.attrs.to;

        this.server.clients.filter((tmpClient: ChatClient) => tmpClient !== client)
            .forEach((tmpClient: ChatClient) => new MessageGroupChatResponse(channel, from, body, by).send(tmpClient));
    }
}