import { validate } from 'uuid';
import Game from '../../../../lib/game';
import { Request } from 'express';
import { Strategy } from 'passport';

export default class ExistingAuthenticator extends Strategy {
    name: string = 'existing';

    async authenticate(req: Request): Promise<any> {
        if (
            !req.headers.userid ||
            !req.headers.securitytoken ||
            !validate(req.headers.securitytoken as string)
        ) {
            return this.fail();
        }

        let user = await Game.db.user.findFirst({
            where: {
                id: parseInt(req.headers.userid as string, 10),
                token: req.headers.securitytoken as string,
            },
        });

        if (!user) {
            return this.fail();
        }

        return this.success(user);
    }
}
