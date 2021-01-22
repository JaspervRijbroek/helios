import { Request, Response } from "express";
import { parse } from "js2xmlparser";
import { gzipSync } from "zlib";
import { User } from '../database/entities/user';
import {writeFileSync} from "fs";
import { parse as parseUri } from 'url';
import {parse as parsePath} from 'path';
import { sync } from "mkdirp";

export interface IAuthenticatedRequest extends Request {
    user: User
}

export default class BaseController {
    async execute(method: string, req: Request, res: Response) {
        let funct = this[method as keyof BaseController] as Function,
            response = await funct(req),
            xmlResponse = this.buildXML(response);

        let uri = parseUri(req.url);
        if (uri.pathname) {
            try {
                let path = `${process.cwd()}\\requests\\${uri.pathname}${req.query.categoryName ? '_' + req.query.categoryName : ''}.xml`,
                    parts = parsePath(path);

                
                sync(parts.dir);

                writeFileSync(path, xmlResponse);
            } catch(e) {
                console.log(e.message);
            }
        }

        let xmlResponse2 = gzipSync(xmlResponse);

        return res.status(200)
            .header('Content-Length', xmlResponse2.length.toString())
            .header('Content-Type', 'application/xml;charset=utf-8')
            .header("Content-Encoding", "gzip")
            .header('Connection', 'close')
            .send(xmlResponse2);
    }

    missing(req: Request, res: Response) {
        return {};
    }

    protected buildXML(json: any): string {
        let keys = Object.keys(json),
            xmlBody = '';

        if (keys.length) {
            xmlBody = parse(keys[0], json[keys[0]], {
                declaration: {
                    include: false
                },
                format: {
                    doubleQuotes: true
                },
                useSelfClosingTagIfEmpty: true
            });
        }

        return xmlBody;
    }
}