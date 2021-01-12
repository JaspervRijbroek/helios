import { Request, Response, Send } from "express";
import { toJson } from 'xml2json';
import { parse } from 'js2xmlparser';
import { gzipSync } from 'zlib';
import { writeFileSync } from 'fs';
import { parse as parseUri } from 'url'

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