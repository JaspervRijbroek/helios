import {IncomingMessage, Server, ServerResponse} from "http";
import Game from "../game";
import Response from "../response";
import Client from "../client";
import Request from "../request";
import {User} from '@prisma/client';
import {validate} from "uuid";
import {compareSync, hashSync} from "bcrypt";
import {gzipSync} from "zlib";
import {parse} from "js2xmlparser";
import Route from "route-parser";

export default class SoapServer extends Server {
    // So far there is just one url per functionality, this has to do with the nature of SOAP I guess
    private routes: any[] = [
        [new Route('/Engine.svc/achievements/loadall'), 'achievements.loadall']
    ];

    constructor(protected game: typeof Game) {
        super();

        this.on('request', this.handleRequest);
    }

    start() {
        this.listen(process.env.SOAP_PORT, () => {
            console.log(`Server listening on port ${process.env.SOAP_PORT}`);
        })
    }

    async handleRequest(req: IncomingMessage, res: ServerResponse): Promise<void> {
        let client = await this.authenticate(req),
            response = new Response(this, res),
            [event, data] = this.findRoute(req);

        if(!client || !event) {
            return this.reply(new Client(), response.setData(false));
        }

        let request = new Request(event, data);

        this.game.emit('package', client, request, response);

        return;
    }

    reply(client: Client, response: Response) {
        if(!response.getData() && response.reference) {
            response.reference.statusCode = 401;

            return response.reference.end();
        }

        // Parse the json to xml.
        let responseXml = this.buildResponse(response.getData());

        response.reference.setHeader('Content-Length', responseXml.length.toString());
        response.reference.setHeader('Content-Type', 'application/xml;charset=utf-8');
        response.reference.setHeader('Content-Encoding', 'gzip');
        response.reference.setHeader('Connection', 'close');

        return response.reference.end(responseXml);
    }

    async authenticate(req: IncomingMessage): Promise<false|undefined|User|null> {
        // There are a couple of ways we can authenticate.
        // 1. We have a username with a prefix to create a new account (if enabled)
        // 2. We have a normal username and password
        // 3. The user is logged in, and we have an userid and a token

        // The third option is the easiest as this is a database query.
        // Then we have the second, then the first as the first will require a database check if the current user already exists.

        // First things first, we must always have a userid and a security token, if either is missing we will return a false.
        if(!req.headers.userid || !req.headers.securitytoken) {
            return false;
        }

        if(validate(req.headers.securitytoken as string)) {
            // We have a logged-in user. If incorrect credentials are given (hacker) we will return null.
            return Game.db.user.findFirst({
                where: {
                    id: parseInt(req.headers.userid as string),
                    token: req.headers.securitytoken as string
                }
            });
        } else if(process.env.CREATE_PREFIX && req.headers.userid.includes(process.env.CREATE_PREFIX)) {
            // Check if the user already exists based on userid.
            let username = (req.headers.userid as string).replace(process.env.CREATE_PREFIX, ''),
                existingCount = await Game.db.user.findMany({
                    where: {
                        username
                    }
                });

            if(existingCount.length) {
                return false;
            }

            return Game.db.user.create({
                data: {
                    username,
                    password: hashSync(req.headers.securitytoken as string, 10)
                }
            })
        } else {
            let user = await Game.db.user.findMany({
                where: {
                    username: req.headers.userid as string
                }
            });

            if(!user.length || user.length > 1) {
                return false;
            }

            if(!compareSync(req.headers.securitytoken as string, user[0].password)) {
                return false;
            }

            return user[0];
        }
    }

    buildResponse(data: any): Buffer {
        let keys = Object.keys(data),
            xmlBody: string | Buffer = '';

        if (keys.length) {
            xmlBody = parse(keys[0], data[keys[0]], {
                declaration: {
                    include: false,
                },
                format: {
                    doubleQuotes: true,
                },
                useSelfClosingTagIfEmpty: true,
            });
        }

        return gzipSync(xmlBody);
    }

    private findRoute(req: IncomingMessage): any[] {
        for(let value of this.routes) {
            if(value[0].match(req.url)) {
                return [value[1], {}];
            }
        }

        return [false, {}];
    }
}