import { existsSync, writeFileSync } from "fs";

export class Config {
    static config: any = {};
    static filePath = `${process.cwd()}/config.json`;

    static getConfig(): any {
        if(!Object.keys(this.config).length) {
            try {
                this.config = require(this.filePath);
            } catch(err) { /* NOOP */ }
        }

        return this.config;
    }

    static get(key: string): any {
        return key.split('.').reduce((carry: any, key: string) => {
            if(!carry || !carry[key]) {
                return false;
            }

            return carry[key];
        }, this.getConfig());
    }

    static set(key: string, value: any): Config {
        let config = this.getConfig(),
            parts = key.split('.'),
            name = parts.pop() as string,
            base = parts.reduce((carry: any, key: string) => {
                if(!carry[key]) {
                    carry[key] = {};
                }

                return carry[key];
            }, config);

        base[name] = value;

        return this;
    }

    static save(): Config {
        writeFileSync(this.filePath, JSON.stringify(this.config));

        return this;
    }

    static check(): boolean {
        return existsSync(this.filePath);
    }
}