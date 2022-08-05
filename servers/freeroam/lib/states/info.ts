export default class InfoState {
    data: Buffer = Buffer.alloc(0);

    setData(data: Buffer): void {
        this.data = data;
        return;
    }
}
