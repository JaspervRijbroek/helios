import { validate } from 'uuid';
import Game from '../../../../lib/game';
import { Request } from 'express';
import { Strategy } from 'passport';
import { compareSync } from 'bcrypt';

export default class LoggingInAuthenticator extends Strategy {
    name: string = 'logging-in';

    async authenticate(req: Request): Promise<any> {
        if (
            !req.headers.userid ||
            !req.headers.securitytoken ||
            validate(req.headers.securitytoken as string)
        ) {
            return this.fail();
        }

        let foundUser = await Game.db.user.findFirst({
            where: {
                username: req.headers.userid as string,
            },
        });

        if (!foundUser) {
            return this.fail();
        }

        if (
            !compareSync(
                req.headers.securitytoken as string,
                foundUser.password
            )
        ) {
            return this.fail();
        }

        return this.success(foundUser);
    }
}
