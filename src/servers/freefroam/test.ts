import { createSocket } from "dgram";

let socket = createSocket('udp4'),
    buff = Buffer.from('0000060a0b0c0d0000000000000000000000000000000000000000000000000000000061f204ebf24a4e49bceecfc640479a2a00802dbe8825bd', 'hex'),
    packet = Buffer.from('00240702ea562388ffffffff5bfe54bb121a0dcd980afae543a23fa9c42589c4201233fffd966969a28003ffff5a4da63', 'hex');

socket.send(buff, 9999, 'localhost', () => {
    socket.send(packet, 9999, 'localhost', () => {
        socket.close();
    });
});
