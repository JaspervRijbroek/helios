import Game from '../../../../lib/game';
import { hashSync } from 'bcrypt';
import { Request } from 'express';
import { Strategy } from 'passport';

export default class NewAuthenticator extends Strategy {
    name: string = 'new';
    prefix?: string = process.env.REGISTRATION_PREFIX;

    async authenticate(req: Request): Promise<any> {
        if (
            !this.prefix ||
            !req.headers.userid ||
            !req.headers.userid.includes(this.prefix)
        ) {
            return this.fail();
        }

        let foundUsers = await Game.db.user.count({
            where: {
                username: (req.headers.userid as string).replace(
                    this.prefix as string,
                    ''
                ),
            },
        });

        if (foundUsers) {
            throw new Error('User already exists');
        }

        return Game.db.user.create({
            data: {
                username: (req.headers.userid as string).replace(
                    this.prefix as string,
                    ''
                ),
                password: hashSync(req.headers.securitytoken as string, 10),
            },
        });
    }
}
