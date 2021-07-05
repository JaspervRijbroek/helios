// <message to="sbrw.133583@51.161.118.213" id="JN_1234567" from="sbrw.engine.engine@51.161.118.213/EA_Chat"><subject>1337733113377331</subject><body><response status="1" ticket="0"><PowerupActivated><Count>1</Count><Id>-1681514783</Id><PersonaId>140559</PersonaId><TargetPersonaId>0</TargetPersonaId></PowerupActivated></response></body></message>

// <response status="1" ticket="0"><PowerupActivated><Count>1</Count><Id>-1681514783</Id><PersonaId>140559</PersonaId><TargetPersonaId>0</TargetPersonaId></PowerupActivated></response>

import { jid } from "@xmpp/jid";
import xml from "@xmpp/xml";
import { Request } from "express";
import { parse } from "js2xmlparser";
import Game from "../../../game";
import ChatServer from "../../chat";
import ChatClient from "../../chat/lib/client";
import { Controller, Route } from "../decorators/routing";

@Controller()
export default class PowerupsController {
    @Route('post', 'powerups/activated/:powerupId')
    powerupActivated(req: Request) {
        let server = Game.getInstance().getServer('chat') as ChatServer,
            serverJid = server.jid,
            xmlMessage = parse('response', {
                '@': {
                    status: '1',
                    ticket: '0'
                },
                PowerupActivated: {
                    Count: 1,
                    Id: req.params.powerupId,
                    PersonaId: req.user.currentPersonaId,
                    TargetPersonaId: 0,
                }
            }, {
                declaration: {
                    include: false
                },
                format: {
                    doubleQuotes: true,
                    newline: '',
                    indent: ''
                },
                useSelfClosingTagIfEmpty: true
            })

        server?.clients.forEach((client: ChatClient) => {
            let to = jid(client.jid);
            to.setResource('');

            // <message to="sbrw.133583@51.161.118.213" id="JN_1234567" from="sbrw.engine.engine@51.161.118.213/EA_Chat"><subject>1337733113377331</subject><body>&lt;response status="1" ticket="0"&gt;&lt;PowerupActivated&gt;&lt;Count&gt;1&lt;/Count&gt;&lt;Id&gt;-1681514783&lt;/Id&gt;&lt;PersonaId&gt;140559&lt;/PersonaId&gt;&lt;TargetPersonaId&gt;0&lt;/TargetPersonaId&gt;&lt;/PowerupActivated&gt;&lt;/response&gt;</body></message>
            // <message to="sbrw.133583@51.161.118.213" id="JN_1234567" from="sbrw.engine.engine@51.161.118.213/EA_Chat"><subject>1337733113377331</subject><body>&lt;response status="1" ticket="0"&gt;&lt;PowerupActivated&gt;&lt;Count&gt;1&lt;/Count&gt;&lt;Id&gt;-1681514783&lt;/Id&gt;&lt;PersonaId&gt;140559&lt;/PersonaId&gt;&lt;TargetPersonaId&gt;0&lt;/TargetPersonaId&gt;&lt;/PowerupActivated&gt;&lt;/response&gt;</body></message>
            // <message to="nfsw.103@127.0.0.1"         id="JN_1234567" from="helios.server@127.0.0.1/EA_Chat">          <subject>1337733113377331</subject><body>&lt;response status="1" ticket="0"&gt;&lt;PowerupActivated&gt;&lt;Count&gt;1&lt;/Count&gt;&lt;Id&gt;-1681514783&lt;/Id&gt;&lt;PersonaId&gt;103   &lt;/PersonaId&gt;&lt;TargetPersonaId&gt;0&lt;/TargetPersonaId&gt;&lt;/PowerupActivated&gt;&lt;/response&gt;</body></message>

            client.send(
                xml(
                    'message',
                    {
                        to,
                        id: 'JN_1234567',
                        from: serverJid
                    },
                    xml(
                        'subject',
                        {},
                        '1337733113377331'
                    ),
                    xml(
                        'body',
                        {},
                        xmlMessage
                    )
                )
            )
        });

        return '';
    }
}