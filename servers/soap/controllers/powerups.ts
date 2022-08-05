import { Request } from 'express';
import { parse } from 'js2xmlparser';
import { Controller, Post, Route } from '../decorators/routing';
import Game from '../../../lib/game';

@Controller()
export default class PowerupsController {
    @Post('powerups/activated/:powerupId')
    powerupActivated(req: Request) {
        Game.sendEvent('chat', {
            event: 'powerup',
            data: parse(
                'response',
                {
                    '@': {
                        status: '1',
                        ticket: '0',
                    },
                    PowerupActivated: {
                        Count: 1,
                        Id: req.params.powerupId,
                        PersonaId: req.user.currentPersonaId,
                        TargetPersonaId: 0,
                    },
                },
                {
                    declaration: {
                        include: false,
                    },
                    format: {
                        doubleQuotes: true,
                        newline: '',
                        indent: '',
                    },
                    useSelfClosingTagIfEmpty: true,
                }
            ),
        });

        return '';
    }
}
