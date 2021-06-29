import AbstractHandler from "./abstract";
import {Handler, HandleType} from "../decorators/handler";
import {Element} from "@xmpp/xml";
import ChatClient from "../lib/client";

@Handler('message')
export default class MessageHandler extends AbstractHandler {
    @HandleType()
    handleMessage(client: ChatClient, packet: Element) {
        // Get the message and broadcast it to the channel.
        let channel = this.getChannel(packet.attrs.to);

        if(!channel) {
            return;
        }


    }
}