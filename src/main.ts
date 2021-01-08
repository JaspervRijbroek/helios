import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { HandleNsfwInterceptor } from './handle-nsfw.interceptor';
import * as compression from 'compression';
import { Response } from 'express';
import { gzipSync } from 'zlib';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.disable('etag');
  app.disable('vary');

  app.useGlobalInterceptors(new HandleNsfwInterceptor());
  app.use((req: any, res: any, next: Function) => {
    req.url = req.url.replace('/Engine.svc', '');

    console.log(`Sending ${req.method} to ${req.url}`);

    return next();
  });

  app.use((req: Request, res: Response, next: Function) => {
    let parentSend = res.send.bind(res);

    res.send = function(body): any {
      let encodedBody = gzipSync(body);

      this.header('content-encoding', 'gzip')
        .header('Content-Length', encodedBody.length);

      return parentSend(encodedBody);
    }

    return next();
  });
  
  await app.listen(3000);
}
bootstrap();
