import Express, {NextFunction, Request, Response, static as staticPath, Router} from 'express';
import { glob } from 'glob';
import { join } from 'path';
import { IRouteDefinition } from './decorators/routing';
import {validate} from "uuid";
import Game from "../../game";
import {compare} from "bcrypt";

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

    constructor() {
        this.server = Express();
        this.server.disable('etag');
        this.server.disable('x-powered-by');

        // this.communicator.emit('event_data', 'data');
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
                            res.result = await instance[route.methodName].bind(instance);

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

    async start() {
        this.server
            .use(staticPath(
                join(__dirname, '..', 'public')
            ))
            .use(this.authenticate.bind(this))
            .use(this.parse.bind(this))
            .use(this.controllerRoutes())
            .use(this.build)
            .listen(process.env.SOAP_PORT, () => {
                log(`Soap server listening on port: ${process.env.SOAP_PORT}`);
            });
    }

    async authenticate(req: Request, res: Response, next: NextFunction) {
        // If any of the required headers is missing, return a 401.
        if (!req.headers['userid'] || !req.headers['securitytoken']) {
            return res.status(401).end();
        }

        let user: any = false;

        // We have them both now.
        // If the securitytoken isn't a uuidv4 we will treat it as a password, else we will use it as a token.
        // Registration is done elsewhere.
        if(req.headers['securitytoken'] && validate(req.headers['securitytoken'] as string)) {
            user = Game.db.user.findFirst({
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
        console.log(req.body);
    }

    build(req: Request, res: Response, next: Function) {
        console.log()
    }
}