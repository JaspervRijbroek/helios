import Express, {NextFunction, Request, Response, static as staticPath, Router, raw} from 'express';
import { glob } from 'glob';
import { join } from 'path';
import { IRouteDefinition } from './decorators/routing';
import {validate} from "uuid";
import Game from "../../game";
import {compare, hashSync} from "bcrypt";
import NewsController from './controllers/news';
import { toJson } from 'xml2json';
import { parse } from 'js2xmlparser';
import { gzipSync } from 'zlib';
import Levels from "./lib/levels";

const log = require('debug')('nfsw:soap');

declare global {
    namespace Express {
        interface Request {
            user: any
        }

        interface Response {
            result: any
        }
    }
}

export default class SoapServer {
    server: any;
    listener: any = null;

    constructor() {
        log('Starting server');
        this.server = Express();
        this.server.disable('etag');
        this.server.disable('x-powered-by');
    }

    controllerRoutes(): Router {
        let router = Router();

        log('Bind routes');
        glob
            .sync(join(__dirname, 'controllers', '**', '*'))
            .map((controllerPath: string) => {
                let Controller = require(controllerPath).default,
                    instance = new Controller();

                Reflect.getMetadata('routes', Controller)
                    .forEach((route: IRouteDefinition) => {
                        log(`Bind route [${route.method}] on ${route.path}`);

                        router[route.method](route.path, async (req: Request, res: Response, next: NextFunction) => {
                            res.result = await instance[route.methodName].call(instance, req, res);

                            next();
                        });
                    })
            })

        router.use((req: Request, res: Response, next: NextFunction) => {
            res.result = res.result || {};

            next();
        })

        return router;
    }

    start() {
        this.listener = this.server
            .use(staticPath(
                join(__dirname, '..', 'public')
            ))
            .use(raw({type: '*/*'}))
            .use((req: Request, res: Response, next: NextFunction) => {
                log(`[${req.method}] ${req.url}`);

                next();
            })
            .use(this.authenticate.bind(this))
            .use(this.parse.bind(this))
            .use(this.controllerRoutes())
            .use(this.build)
            .listen(process.env.SOAP_PORT, () => {
                log(`Server listening on port: ${process.env.SOAP_PORT}`);
            });
    }

    stop() {
        this.listener.close(() => {
            log('Server stopped');
        })
    }

    async authenticate(req: Request, res: Response, next: NextFunction) {
        // If any of the required headers is missing, return a 401.
        if (!req.headers['userid'] || !req.headers['securitytoken']) {
            return res.status(401).end();
        }

        let user: any = false;

        if(process.env.REGISTRATION_PREFIX && req.headers['userid'] && req.headers['userid'].includes(process.env.REGISTRATION_PREFIX)) {
            // Check if the user is already present.
            let foundUsers = await Game.db.user.count({
                where: {
                    username: (req.headers['userid'] as string).replace(process.env.REGISTRATION_PREFIX, '')
                }
            });

            if(foundUsers) {
                return res.status(400).end();
            }

            // Register the user.
            user = await Game.db.user.create({
                data: {
                    username: (req.headers['userid'] as string).replace(process.env.REGISTRATION_PREFIX, ''),
                    password: hashSync(req.headers['securitytoken'] as string, 10)
                }
            });
        } else if(req.headers['securitytoken'] && validate(req.headers['securitytoken'] as string)) {
            user = await Game.db.user.findFirst({
                where: {
                    id: parseInt(req.headers['userid'] as string),
                    token: req.headers['securitytoken'] as string
                }
            });
        } else {
            let foundUser = await Game.db.user.findFirst({
                where: {
                    username: req.headers['userid'] as string
                }
            });

            if(foundUser && await compare(req.headers['securitytoken'] as string, foundUser.password)) {
                user = foundUser;
            }
        }

        if (!user) {
            return res.status(401).end();
        }

        req.user = user;

        return next();
    }

    parse(req: Request, res: Response, next: Function) {
        if(req.body && (typeof req.body === 'string' || req.body instanceof Buffer)) {
            req.body = toJson(req.body);
            req.body = JSON.parse(req.body);
        }

        next();
    }

    build(req: Request, res: Response, next: Function) {
        let keys = Object.keys(res.result),
            xmlBody: string|Buffer = '';

        if (keys.length) {
            xmlBody = parse(keys[0], res.result[keys[0]], {
                declaration: {
                    include: false
                },
                format: {
                    doubleQuotes: true
                },
                useSelfClosingTagIfEmpty: true
            });
        }

        xmlBody = gzipSync(xmlBody);

        res.status(200)
            .header('Content-Length', xmlBody.length.toString())
            .header('Content-Type', 'application/xml;charset=utf-8')
            .header("Content-Encoding", "gzip")
            .header('Connection', 'close')
            .send(xmlBody);

        next();
    }
}