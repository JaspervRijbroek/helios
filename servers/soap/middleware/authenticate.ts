import {NextFunction, Request, Response} from "express";
import {User} from "../../../entities/user";

export default async (req: any, res: Response, next: NextFunction) => {
    let user: any = false;

    if(req.headers['userid']) {
        if(req.headers['securitytoken']) {
            user = await User.findOne({
                id: parseInt(req.headers['userid'] as string),
                // token: req.headers['securitytoken'] as string
            });
        }
    }

    if(!user) {
        return res.status(401).end();
    }

    req.user = user;

    return next();
}