import Express, {Request, Response, static as staticPath} from 'express';

export default class SoapServer {
    server: any;

    constructor() {
        this.server = Express();
    }

    loadControllers(): void {

    }

    loadMiddleware(): void {

    }

    start() {
        let port = process.env.SOAPPORT || 3000;

        this.loadMiddleware();
        this.loadControllers();
        this.server.listen(port, () => {
            global.debug(`Soap server listening on port: ${port}`);
        })
    }
}