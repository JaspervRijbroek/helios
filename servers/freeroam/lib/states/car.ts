export interface ILocation {
    x: number;
    y: number;
}

export default class CarState {
    data: Buffer = Buffer.alloc(0);
    location: ILocation = {
        x: 0,
        y: 0,
    };

    getLocation(): ILocation {
        return this.location;
    }

    setData(data: Buffer): void {
        this.data = data;

        let xBytes = data.slice(7, 10),
            yBytes = data.slice(3, 6),
            xShift = (xBytes[0] & 32) > 0 ? 5 : 6,
            yShift = yBytes[0] >= 7 ? 2 : 3;

        xBytes[0] &= 0x3f;

        let x =
                Buffer.from([
                    0,
                    xBytes[0],
                    xBytes[1],
                    xBytes[2],
                ]).readUInt32BE() >> xShift,
            y =
                Buffer.from([
                    0,
                    yBytes[0],
                    yBytes[1],
                    yBytes[2],
                ]).readUInt32BE() >> yShift;

        x /= 8.332;

        if (xShift === 5) {
            x -= 3730;
        } else {
            x += 4135;
        }

        this.location.x = x;
        this.location.y = 5000 - y + (yShift === 2 ? 2378.6 : 0);

        return;
    }
}
