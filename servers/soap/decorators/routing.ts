import { NextFunction, Request, Response } from 'express';
import Game from '../../../lib/game';

export interface IRouteDefinition {
    method: 'get' | 'post';
    name?: string;
    path: string;
    handler: (req?: Request) => any;
}

export function Controller(): ClassDecorator {
    return (target: any) => {
        // Since routes are set by our methods this should almost never be true (except the controller has no methods)
        if (!Reflect.hasMetadata('routes', target)) {
            Reflect.defineMetadata('routes', [], target);
        }
    };
}

export function Route(
    method: string,
    path: string,
    includePrefix: boolean = true
): MethodDecorator {
    return (target, propertyKey) => {
        if (!Reflect.hasMetadata('routes', target.constructor)) {
            Reflect.defineMetadata('routes', [], target.constructor);
        }

        const routes = Reflect.getMetadata('routes', target.constructor);

        routes.push({
            method,
            path: `${includePrefix ? '/Engine.svc/' : ''}${path}`,
            handler: async (
                req: Request,
                res: Response,
                next: NextFunction
            ) => {
                Game.event.emit(`route.before`, { req });

                // @ts-ignore
                res.result = await target[propertyKey].call(target, req);

                Game.event.emit(`route.after`, { res });

                next();
            },
        });
        Reflect.defineMetadata('routes', routes, target.constructor);
    };
}

export function Get(
    path: string,
    includePrefix: boolean = true
): MethodDecorator {
    return Route('get', path, includePrefix);
}

export function Post(
    path: string,
    includePrefix: boolean = true
): MethodDecorator {
    return Route('post', path, includePrefix);
}

export function Put(
    path: string,
    includePrefix: boolean = true
): MethodDecorator {
    return Route('put', path, includePrefix);
}
