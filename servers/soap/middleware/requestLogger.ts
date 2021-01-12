import {NextFunction, Request, Response} from "express";

export default (req: Request, res: Response, next: NextFunction) => {
    global.debug(`Calling ${req.method} on ${req.url}`);

    return next();
}