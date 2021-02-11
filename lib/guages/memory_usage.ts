import { blue } from "chalk";
import { Gauge } from "clui";
import { freemem, totalmem } from "os";
import { WriteStream } from "tty";

export default class MemoryUsageGauge
{
    terminal: WriteStream = process.stdout;

    getTotal() {
        return totalmem();
    }

    getUsed() {
        return this.getTotal() - freemem();
    }

    render() {
        let used = this.getUsed(),
            total = this.getTotal(),
            human = Math.ceil(used / 1000000) + ' MB',
            gauge = Gauge(used, total, 30, total * 0.8, human);

        return `${blue('Memory usage')} ${gauge}`;
    }
}