import {IncomingMessage} from "http";

declare module 'http' {
    export interface IncomingMessage {
        user: any;
        body: any;
        params: any;
        query: any;
    }
}
