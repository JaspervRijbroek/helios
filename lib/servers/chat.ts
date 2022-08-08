import {Server} from "net";
import Game from "../game";

export default class ChatServer extends Server {
    constructor(protected game: typeof Game) {
        super();
    }

    send()
}