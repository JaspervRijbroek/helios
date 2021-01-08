import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { toJson } from 'xml2json';
import { map } from 'rxjs/operators';
import { parse } from 'js2xmlparser';

@Injectable()
export class HandleNsfwInterceptor implements NestInterceptor {
    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        let req = context.switchToHttp().getRequest(),
            res = context.switchToHttp().getResponse();

        console.log(req.headers);
        if (req.headers['user-agent'] && !req.headers['user-agent'].includes('EA/2.0')) {
            return next.handle();
        }

        // parse the body.
        req.body = await this.parseRequestBody(req);

        return next.handle()
            .pipe(
                map(this.transformResponse.bind(this, req, res))
            );
    }

    private parseRequestBody(req): Promise<any> {
        let data = '';

        return new Promise((resolve) => {
            req.on('data', chunk => {
                data += chunk.toString()
            });

            req.on('end', () => {
                if (!data) {
                    return resolve('');
                }

                data = JSON.parse(toJson(data));
                return resolve(data);
            })
        })
    }

    private transformResponse(req, res, body) {
        let keys = body ? Object.keys(body) : [],
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
        
        res.header('Content-Type', 'application/xml;charset=utf-8')
            .header('Connection', 'close');

        return xmlBody;

    }
}
