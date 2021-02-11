import { writeFileSync } from "fs";

export class Config {
    static config: any = {};
    static configPath: string = `${process.cwd()}/config.json`;

    static getConfig(): any {
        if (!Object.keys(this.config).length) {
            try {
                this.config = require(this.configPath);
            } catch (err) { /* NOOP */ }
        }

        return this.config;
    }

    static get(key: string): any {
        return key.split('.').reduce((carry: any, key: string) => {
            if (!carry || !carry[key]) {
                return false;
            }

            return carry[key];
        }, this.getConfig());
    }

    static set(key: string, value: any): Config {
        let parts = key.split('.'),
            last = parts.pop() as string,
            base = parts.reduce((carry: any, key: string) => {
                if(!carry[key]) {
                    carry[key] = {};
                }

                return carry[key];
            }, this.getConfig());

        console.log(base, last);

        base[last] = value;

        console.log(this.config);

        return this;
    }

    static save(): Config {
        writeFileSync(this.configPath, JSON.stringify(this.config));

        return this;
    }

    /**
     * This method will check if the config holds all the data to start correctly.
     */
    static check(): boolean {
        return true;
    }
}