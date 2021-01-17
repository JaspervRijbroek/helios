import ChatClient from "../client";
import PresenceResponse from "../packages/presence/response";

export default class PresenceHandler {
    execute(client: ChatClient, packet: Element) {
        // let methodName = packet.children[0]['name'] || false;

        // Currently we will just respond with a response.
        new PresenceResponse().send(client);
    }
}

// <presence><show>chat</show><status>Online</status><priority>0</priority></presence>
// <presence from="sbrw.133583@51.161.118.213/EA-Chat" to="sbrw.133583@51.161.118.213/EA-Chat"><show>chat</show><status>Online</status><priority>0</priority></presence>