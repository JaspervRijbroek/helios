import { createConnection } from "net";

let connection = createConnection({
    port: 5222,
    host: '127.0.0.1'
});

connection.on('data', (chunk) => console.log(chunk.toString()));

connection.write(`<?xml version='1.0' ?><stream:stream to='51.161.118.213' xmlns='jabber:client' xmlns:stream='http://etherx.jabber.org/streams' version='1.0' xml:lang='en'>`);
connection.write(`<message to='channel.EN__2@conference.51.161.118.213' type='groupchat'><channel>Chat_All</channel><body>&lt;ChatMsg Type=&quot;0&quot; Uid=&quot;120634&quot; Time=&quot;-1254859235720894747&quot; Cs=&quot;3339213786820241329&quot;&gt;&lt;From&gt;JASPER199069&lt;/From&gt;&lt;Msg&gt;Hello Everyone&lt;/Msg&gt;&lt;/ChatMsg&gt;</body></message>`);