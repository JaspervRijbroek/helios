import { compare } from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { validate } from "uuid";
import { User } from "../../../database/models/user";

export default async (req: any, res: Response, next: NextFunction) => {
    if (!req.headers['userid'] || !req.headers['securitytoken']) {
        return res.status(401).end();
    }

    // We have them both now.
    // If the securitytoken isn't a uuidv4 we will treat it as a password, else we will use it as a token.
    let user: User|false = await User.login(req.headers['userid'], req.headers['securitytoken']);

    if (!user) {
        return res.status(401).end();
    }

    req.user = user;

    return next();
}