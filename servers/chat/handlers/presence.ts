import ChatClient, { ClientStates } from "../client";
import PresenceResponse from "../packages/presence/response";
import { Element } from '@xmpp/xml';
import ChatServer from "../server";
import PresenceReportResponse from "../packages/presence/report";

export default class PresenceHandler {
    constructor(public server: ChatServer) {}

    execute(client: ChatClient, packet: Element) {
        let channel = packet.attrs.to || false;

        if(channel) {
            client.channel = channel;
        }

        // Currently we will just respond with a response.
        // This presence is to be broadcasted.
        this.server.clients/*.filter((srvClient: ChatClient) => srvClient !== client)*/
            .forEach((srvClient: ChatClient) => new PresenceResponse(client, channel).send(srvClient));

        if(client.status === ClientStates.Connecting) {
            // Send a packet with all the connected clients.
            let connectedClients = this.server.clients.filter((srvClient: ChatClient) => srvClient.status == ClientStates.Connected && srvClient !== client);

            new PresenceReportResponse(connectedClients).send(client);
            client.status = ClientStates.Connected;
        }
    }
}