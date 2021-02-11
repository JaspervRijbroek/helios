import { blue } from "chalk";
import { Gauge } from "clui";
import { EOL } from "os";
import { WriteStream } from "tty";

export default class LoadGauge
{
    terminal: WriteStream = process.stdout;

    getTotal() {
        return 50;
    }

    getUsed() {
        return 10;
    }

    render() {
        let used = this.getUsed(),
            total = this.getTotal(),
            human = used  + ' Connections',
            gauge = Gauge(used, total, 30, total * 0.8, human);

        return `${blue('System load')}: ${gauge}`;
    }
}