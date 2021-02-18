declare const debug: Debugger;

declare namespace NodeJS {
    export interface Global {
        debug: Debugger;
    }
}

// declare namespace NodeJS {
//     interface Global {
//         debug: Debugger;
//     }
// }

// declare var version: string;
