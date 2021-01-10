export interface IRouteDefinition {
    method: 'get'|'post';
    path: string;
    methodName: string;
}

export function Controller(): ClassDecorator {
    return (target: any) => {
        // Since routes are set by our methods this should almost never be true (except the controller has no methods)
        if (! Reflect.hasMetadata('routes', target)) {
            Reflect.defineMetadata('routes', [], target);
        }
    }
}

export function Route(method: string, path: string, includePrefix: boolean = true): MethodDecorator {
    return (target, propertyKey) => {
        if (! Reflect.hasMetadata('routes', target.constructor)) {
            Reflect.defineMetadata('routes', [], target.constructor);
        }
      
        const routes = Reflect.getMetadata('routes', target.constructor);
      
        routes.push({
            method,
            path: `${includePrefix ? '/Engine.svc/' : ''}${path}`,
            methodName: propertyKey
        });
        Reflect.defineMetadata('routes', routes, target.constructor);
    }
}

export function Middleware(handler: Function): MethodDecorator {
    return (target, propertyKey) => {
        let middleware = Reflect.getMetadata('middleware', target, propertyKey) || [];

        middleware.push(handler);
        Reflect.defineMetadata('middleware', middleware, target, propertyKey);
    }
}