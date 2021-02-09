import { Request, Response } from "express";
import { toJson } from 'xml2json';

export default (req: Request, res: Response, next: Function) => {
    let requestData = '';

    req.on('data', (chunk) => {
        requestData += chunk.toString();
    });

    req.on('end', function () {
        if (requestData) {
            req.body = JSON.parse(toJson(requestData));
        }

        return next();
    });
}