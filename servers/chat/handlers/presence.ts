import ChatClient from "../client";

export default class PresenceHandler {
    execute(client: ChatClient, packet: Element) {
        console.log(packet);
    }
}