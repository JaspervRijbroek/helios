import jid from "@xmpp/jid";
import ChatServer from "..";
import Room from "../lib/room";

export default class AbstractHandler {
    constructor(public server: ChatServer) {}

    getRoom(room: string): Room {
        let parsed = jid(room);

        if(!this.server.rooms[parsed.local]) {
            this.server.rooms[parsed.local] = new Room(parsed.toString());
        }

        return this.server.rooms[parsed.local];
    }
}