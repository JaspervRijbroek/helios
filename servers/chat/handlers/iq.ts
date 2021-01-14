import ChatClient from "../client";
import GetIqResponse from "../packages/getIqResponse";

export default class IqHandler {
    execute(client: ChatClient, packet: any) {
        console.log(packet.children);

        if(packet.attrs.type === 'get') {
            this.getIqRequest(client, packet);
        } else {
            this.setIqRequest(client, packet);
        }
    }

    getIqRequest(client: ChatClient, packet: any) {
        let child = packet.children[0],
            usernameElement = child.children[0],
            username = usernameElement.children[0].replace('nfsw.', '');

        client.personaId = username;

        // Send an accept packet.
        new GetIqResponse(username).send(client);
    }

    setIqRequest(client: ChatClient, packet: any) {
        
    }
}