import { Client } from "knex";
import FreeroamServer from "../server";

export function canHandle() {
    return true;
}

export function handle(server: FreeroamServer, client: Client) {
    // We will broadcast a remove, and then remove the client from the server.
}