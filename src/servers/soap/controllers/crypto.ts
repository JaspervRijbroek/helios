import { Controller, Route } from "../decorators/routing";

@Controller()
export default class CryptoController {
    @Route('get', 'crypto/cryptoticket')
    async getCryptoTicket() {
        return {
            ClientServerCryptoTicket: {
                CryptoTicket: 'CgsMDQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
                SessionKey: 'AAAAAAAAAAAAAAAAAAAAAA==',
                TicketIv: 'AAAAAAAAAAAAAAAAAAAAAA=='
            }
        }
    }
}