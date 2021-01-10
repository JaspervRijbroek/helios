import { Request, Response, Send } from "express";
import { toJson } from 'xml2json';
import { parse } from 'js2xmlparser';
import { gzipSync } from 'zlib';
import { writeFileSync } from 'fs';
import { parse as parseUri } from 'url'

export function parseXMLBody(req: Request, res: Response, next: Function) {
    // Check the accepts here.
    // If there is an explicit mention of xml, then we will serve xml.

    // if(req.headers['user-agent'] && !req.headers['user-agent'].includes('EA/2.0')) {
    //     return next();
    // }

    res.json = (body: any): Response => {
        // get the root key.
        let keys = Object.keys(body),
            xmlBody = '';

        if (keys.length) {
            xmlBody = parse(keys[0], body[keys[0]], {
                declaration: {
                    include: false
                },
                format: {
                    doubleQuotes: true
                },
                useSelfClosingTagIfEmpty: true
            });
        }

        let uri = parseUri(req.url);
        if (uri.pathname) {
            writeFileSync(process.cwd() + '/requests/' + uri.pathname.replace(/\//g, '_') + '.xml', xmlBody);
        }

        let encodedBody = gzipSync(xmlBody);

        return res.status(200)
            .header('Content-Length', encodedBody.length.toString())
            .header('Content-Type', 'application/xml;charset=utf-8')
            .header("Content-Encoding", "gzip")
            .header('Connection', 'close')
            .send(encodedBody);
    }

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