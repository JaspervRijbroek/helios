import { Debugger } from "debug";
import { User } from "./servers/soap/app/models/user";

declare namespace NodeJS {
    interface Global {
        debug: Debugger;
    }
}

declare global {
    namespace Express {
        interface Request {
            user: User;
        }
    }
}