import BaseController from "../../../lib/controller";
import { Controller, Route } from "../decorators/routing";

@Controller()
export default class CryptoController extends BaseController {
    @Route('get', 'crypto/cryptoticket')
    getCryptoTicket(req: any) {
        return {
            ClientServerCryptoTicket: {
                CryptoTicket: 'CgsMDQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
                SessionKey: 'AAAAAAAAAAAAAAAAAAAAAA==',
                TicketIv: 'AAAAAAAAAAAAAAAAAAAAAA=='
            }
        }
    }
}