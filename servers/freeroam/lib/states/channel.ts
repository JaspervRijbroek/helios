import Client from '../client';

export default class ChannelState {
    data: Buffer = Buffer.alloc(0);

    setData(data: Buffer): void {
        this.data = data;
        return;
    }
}
