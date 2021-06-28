import ChatServer from "..";
import Channel from "../lib/channel";

export default class AbstractHandler {
    constructor(public server: ChatServer) {}

    getChannel(channel: string): Channel {
        if(!this.server.channels[channel]) {
            this.server.channels[channel] = new Channel(channel);
        }

        return this.server.channels[channel];
    }
}