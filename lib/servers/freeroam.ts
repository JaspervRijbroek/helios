import {Socket} from "dgram";
import Game from "../game";

export default class FreeroamServer extends Socket {
    constructor(protected game: typeof Game) {
        // @ts-ignore
        super('udp4');
    }
}