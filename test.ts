import { Parser } from '@xmpp/xml';

[
    '<stream:stream xmlns=\'jabber:client\' xml:lang=\'en\' xmlns:stream=\'http://etherx.jabber.org/streams\' from=\'127.0.0.1\' id=\'174159513\' version=\'1.0\'><stream:features />',
    `<proceed xmlns='urn:ietf:params:xml:ns:xmpp-tls'/>`,
    '<iq id=\'EA-Chat-2\' type=\'result\' xml:lang=\'en\'/>',
    `<iq type='result' id='disco1' from='capulet.lit' to='juliet@capulet.lit/balcony'><query xmlns='http://jabber.org/protocol/disco#info'><feature var='urn:xmpp:chat-markers:0'/></query></iq>`,
    `<message from='northumberland@shakespeare.lit/westminster' id='message-1' to='kingrichard@royalty.england.lit/throne'><thread>sleeping</thread><body>My lord, dispatch; read o'er these articles.</body><markable xmlns='urn:xmpp:chat-markers:0'/></message>`
    // '</stream:stream>'
].forEach(packet => {
    let parser = new Parser();
    parser
        .on('element', (element) => console.log('element', element))
        .on('start', (err) => console.log('start', err));

    parser.write(Buffer.from(packet));
})