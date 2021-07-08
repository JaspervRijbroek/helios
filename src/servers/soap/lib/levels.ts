export default class Levels {
    static levelCap: number = parseInt(process.env.LEVEL_CAP as string) || 60;
    static start: number = parseInt(process.env.LEVEL_CALULATION_START as string) || 100;
    static increment: number = parseInt(process.env.LEVEL_INCREMENT_FACTOR as string) || 2;
    static levels: number[] = new Array(this.levelCap).fill(null);

    static getLevels(): number[] {
        if(!this.levels.filter(value => value).length) {
            let prev = this.start;

            this.levels = this.levels.map((ignore: number, index: number) => {
                if(!index) {
                    return prev;
                }

                return prev *= this.increment;
            });
        }

        return this.levels;
    }

    static getLevel(exp: number): number {
        let experience = this.getLevels().find((experience: number) => {
            return experience >= exp;
        });

        if(!experience) {
            return 1;
        }

        return this.getLevels().indexOf(experience) + 1;

    }

    /**
     * This method will return the percentage of progress to the next level
     * @param exp
     */
    static getProgress(exp: number): number {
        let level = this.getLevel(exp),
            nextExperience = this.levels[level];

        return exp / nextExperience * 100;
    }
}