import BaseController from "../../../lib/controller";
import { Controller, Route } from "../decorators/routing";

@Controller()
export default class CryptoController extends BaseController {
    @Route('get', 'crypto/cryptoticket')
    getCryptoTicket(req: any) {
        let array = Uint8Array.from([10, 11, 12, 13]),
            buffer = Buffer.from(array, 0, 32);

        return {
            ClientServerCryptoTicket: {
                CryptoTicket: 'CgsMDQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
                SessionKey: 'AAAAAAAAAAAAAAAAAAAAAA==',
                TicketIv: 'AAAAAAAAAAAAAAAAAAAAAA=='
            }
        }
    }
}