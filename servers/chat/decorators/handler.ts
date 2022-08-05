export function Handler(namespace: string): ClassDecorator {
    return (target: any) => {
        Reflect.defineMetadata('handler', namespace, target);

        if (!Reflect.hasMetadata('typeHandlers', target)) {
            Reflect.defineMetadata('typeHandlers', [], target);
        }
    };
}

export function HandleType(type?: string): MethodDecorator {
    return (target: any, propertyKey) => {
        if (!Reflect.hasMetadata('typeHandlers', target.constructor)) {
            Reflect.defineMetadata('typeHandlers', [], target.constructor);
        }

        Reflect.getMetadata('typeHandlers', target.constructor).push({
            type,
            handler: propertyKey,
        });
    };
}
