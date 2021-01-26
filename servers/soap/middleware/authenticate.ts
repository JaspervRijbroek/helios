import { compare } from "bcrypt";
import {NextFunction, Request, Response} from "express";
import { validate } from "uuid";
import { User } from "../../../database/models/user";

export default async (req: any, res: Response, next: NextFunction) => {
    let user: any = false;

    if(!req.headers['userid'] || !req.headers['securitytoken']) {
        return res.status(401).end();
    }

    // We have them both now.
    // If the securitytoken isn't a uuidv4 we will treat it as a password, else we will use it as a token.
    if(validate(req.headers['securitytoken'])) {
        user = await User.query().findOne({
            id: parseInt(req.headers['userid'] as string),
            token: req.headers['securitytoken']
        });
    } else {
        // Try it as a password. First we will get the user, then validate.
        let foundUser = await User.query().findOne({
            username: req.headers['userid']
        });

        if(foundUser && await compare(req.headers['securitytoken'], foundUser.password)) {
            user = foundUser;
        }
    }

    if(!user) {
        return res.status(401).end();
    }

    req.user = user;

    return next();
}