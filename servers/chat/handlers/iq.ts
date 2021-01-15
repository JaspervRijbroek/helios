import ChatClient from "../client";
import GetIqResponse from "../packages/getIqResponse";
import SetIqResponse from "../packages/setIqResponse";

export default class IqHandler {
    execute(client: ChatClient, packet: any) {
        console.log(packet.attrs.type === 'get' ? 'Executing get' : 'Executing set');

        if(packet.attrs.type === 'get') {
            this.getIqRequest(client, packet);
        } else {
            this.setIqRequest(client, packet);
        }
    }

    getIqRequest(client: ChatClient, packet: Element) {
        let child = packet.children[0],
            usernameElement = child.children[0],
            username = usernameElement.children[0].toString().replace('nfsw.', '');

        client.personaId = username;

        // Send an accept packet.
        new GetIqResponse(username).send(client);
    }

    setIqRequest(client: ChatClient, packet: any) {
        new SetIqResponse().send(client);
    }
}