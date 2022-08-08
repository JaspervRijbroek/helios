import Client from "./client";
import SoapServer from "./servers/soap";
import ChatServer from "./servers/chat";
import FreeroamServer from "./servers/freeroam";

export default class Response {
    protected data: any = {};

    constructor(protected server: SoapServer|ChatServer|FreeroamServer, public reference?: any) {
    }

    setData(data: any): Response {
        this.data = data;

        return this;
    }

    getData(): any {
        return this.data;
    }

    fail(client: Client): void {
        // There is no handler for the response, so we will return a failed.
        this.setData(false)

        this.server.reply(client, this);
    }

    send(client: Client): void {
        // Get the server to parse the data and send it to the client.
        this.server.reply(client, this);
    }
}