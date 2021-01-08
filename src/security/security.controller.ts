import { Controller, Get } from '@nestjs/common';

@Controller()
export class SecurityController {
    @Get('security/fraudConfig')
    getConfig() {
        return {
            FraudConfig: {
                enabledBitField: 12,
                gameFileFreq: 1000000,
                moduleFreq: 360000,
                startUpFreq: 1000000,
                userID: 11111111
            }
        };
    }
}
