import Express, { Request, Response, static as staticPath } from 'express';
import { glob } from 'glob';
import { join } from 'path';
import Communicator from '../../lib/communicator';
import { Config } from '../../lib/config';
import Controller from '../../lib/controller';
import { IRouteDefinition } from './decorators/routing';

export default class SoapServer {
    server: any;
    communicator: Communicator = Communicator.getInstance();

    constructor() {
        this.server = Express();
        this.server.disable('etag');
        this.server.disable('x-powered-by');

        // this.communicator.emit('event_data', 'data');
    }

    loadControllersRoutes(): void {
        debug('Bind routes');
        glob
            .sync(join(__dirname, 'controllers', '**', '*'))
            .map((controllerPath: string) => {
                let Controller = require(controllerPath).default,
                    instance = new Controller();

                Reflect.getMetadata('routes', Controller)
                    .forEach((route: IRouteDefinition) => {
                        debug(`Bind route [${route.method}] on ${route.path}`);

                        this.server[route.method](route.path, instance.execute.bind(instance, route.methodName));
                    })
            })
    }

    loadMiddleware(): void {
        debug('Bind middleware');
        glob
            .sync(join(__dirname, 'middleware', '**', '*'))
            .map((middlewarePath: string) => {
                this.server.use(
                    require(middlewarePath).default
                );
            })
    }

    async start() {
        let port = Config.get('servers.http.port'),
            abstractController = new Controller();

        this.loadMiddleware();
        this.loadControllersRoutes();

        this.server
            .use(staticPath(
                join(__dirname, '..', 'public')
            ))
            .use((req: Request, res: Response) => {
                debug(`Missing route hanlder for ${req.method} on ${req.url}`);

                abstractController.execute('missing', req, res);
            })
            .listen(port, () => {
                debug(`Soap server listening on port: ${port}`);
            })
    }
}