import AbstractHandler from './abstract';
import { Handler, HandleType } from '../decorators/handler';
import { Element } from '@xmpp/xml';
import ChatClient from '../lib/client';

/**
 * When a message is received, we will get the channel.
 * If the channel is not present an error will be returned,
 *
 * else we will forward the message to the room with the client that has send the message.
 * A message will be send back to all the users of a room.
 */

@Handler('message')
export default class MessageHandler extends AbstractHandler {
    @HandleType('groupchat')
    handleMessage(client: ChatClient, packet: Element) {
        // Get the message and broadcast it to the channel.
        const channel = this.getRoom(packet.attrs.to);

        if (!channel) {
            return;
        }

        channel.broadcastMessage(
            client,
            packet.getChildText('channel') || '',
            packet.getChildText('body') || ''
        );
    }
}
