import e, {
    NextFunction,
    Request,
    Response,
    static as staticPath,
    Router,
    raw,
} from 'express';
import { glob, sync } from 'glob';
import { join } from 'path';
import { toJson } from 'xml2json';
import { parse } from 'js2xmlparser';
import { gzipSync } from 'zlib';
import { IRouteDefinition } from './decorators/routing';
import { authenticate, use } from 'passport';

declare global {
    namespace Express {
        interface Response {
            result: any;
        }
    }
}

export default class SoapServer {
    server: e.Express = e();

    constructor() {
        sync(`${__dirname}/lib/authenticators/*.ts`).forEach(
            (authenticatorPath: string) =>
                use(new (require(authenticatorPath).default)())
        );
    }

    controllerRoutes(): Router {
        let router = Router();

        glob.sync(join(__dirname, 'controllers', '**', '*'))
            .reduce((carry: any[], controllerPath: string) => {
                let Controller = require(controllerPath).default;

                return [...carry, ...Reflect.getMetadata('routes', Controller)];
            }, [])
            .forEach((route: IRouteDefinition) => {
                console.log(`binding route ${route.path}`);
                router[route.method](route.path, route.handler);
            });

        router.use((req: Request, res: Response, next: NextFunction) => {
            res.result = res.result || {};

            next();
        });

        return router;
    }

    start() {
        this.server
            .use(staticPath(join(__dirname, '..', 'public')))
            .use(raw({ type: '*/*' }))
            .use(authenticate(['existing', 'logging-in', 'new']))
            .use(this.parse.bind(this))
            .use(this.controllerRoutes())
            .use(this.build);

        this.server.listen(process.env.SOAP_PORT, () => {});
    }

    stop() {
        // this.server.en;
    }

    parse(req: Request, res: Response, next: () => void) {
        if (
            req.body &&
            (typeof req.body === 'string' || req.body instanceof Buffer)
        ) {
            req.body = toJson(req.body);
            req.body = JSON.parse(req.body);
        }

        next();
    }

    build(req: Request, res: Response, next: () => void) {
        let keys = Object.keys(res.result),
            xmlBody: string | Buffer = '';

        if (keys.length) {
            xmlBody = parse(keys[0], res.result[keys[0]], {
                declaration: {
                    include: false,
                },
                format: {
                    doubleQuotes: true,
                },
                useSelfClosingTagIfEmpty: true,
            });
        }

        xmlBody = gzipSync(xmlBody);

        res.status(200)
            .header('Content-Length', xmlBody.length.toString())
            .header('Content-Type', 'application/xml;charset=utf-8')
            .header('Content-Encoding', 'gzip')
            .header('Connection', 'close')
            .send(xmlBody);

        next();
    }
}
