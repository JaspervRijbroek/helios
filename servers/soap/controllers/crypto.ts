import { Controller, Get } from '../decorators/routing';

@Controller()
export default class CryptoController {
    @Get('crypto/cryptoticket')
    async getCryptoTicket() {
        return {
            ClientServerCryptoTicket: {
                CryptoTicket: 'CgsMDQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
                SessionKey: 'AAAAAAAAAAAAAAAAAAAAAA==',
                TicketIv: 'AAAAAAAAAAAAAAAAAAAAAA==',
            },
        };
    }
}
