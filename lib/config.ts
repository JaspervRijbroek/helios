export class Config {
    static config: any = null;

    static getConfig(): any {
        if(!this.config) {
            this.config = require(`${process.cwd()}/config.json`);
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
}