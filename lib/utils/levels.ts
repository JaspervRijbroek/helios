export default class Levels {
    static levelCap: number =
        parseInt(process.env.LEVEL_CAP as string, 10) || 60;
    static start: number =
        parseInt(process.env.LEVEL_CALULATION_START as string, 10) || 100;
    static increment: number =
        parseInt(process.env.LEVEL_INCREMENT_FACTOR as string, 10) || 2;
    static levels: number[] = [];

    static getLevels(): number[] {
        if (!this.levels.filter((value) => value).length) {
            let prev = this.start;

            this.levels = new Array(this.levelCap)
                .fill(null)
                .map((ignore: number, index: number) => {
                    if (!index) {
                        return prev;
                    }

                    return (prev *= this.increment);
                });
        }

        return this.levels;
    }

    static getLevel(exp: number): number {
        let experience = this.getLevels().find((searchExp: number) => {
            return searchExp >= exp;
        });

        if (!experience) {
            return 1;
        }

        return this.getLevels().indexOf(experience) + 1;
    }

    static getNextLevelExperience(exp: number): number {
        let level = this.getLevel(exp);

        return this.levels[level - 1];
    }

    static getCurrentLevelExperience(exp: number): number {
        let level = this.getLevel(exp);

        return this.levels[level - 2] ?? 0;
    }

    /**
     * This method will return the percentage of progress to the next level
     * @param exp
     */
    static getProgress(exp: number): number {
        let nextExperience = this.getNextLevelExperience(exp);

        return (exp / nextExperience) * 100;
    }
}
