import jid from '@xmpp/jid';
import Room from '../lib/room';
import ChatServer from '../server';

export default class AbstractHandler {
    constructor(public server: ChatServer) {}

    getRoom(room: string): Room {
        const parsed = jid(room);

        if (!this.server.rooms[parsed.local]) {
            this.server.rooms[parsed.local] = new Room(parsed.toString());
        }

        return this.server.rooms[parsed.local];
    }
}
