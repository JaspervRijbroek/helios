import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { User } from 'src/user/user.entity';
import { v4 } from 'uuid';

@Injectable()
export class UserIDStrategy extends PassportStrategy(Strategy, 'userid') {
  constructor(private authService: AuthService) {
    super((req: Request, callback: Function) => {
        if(req && req.headers && req.headers['userid']) {
            User.find({
                id: parseInt(req.headers['userid'] as string)
            })
            .then((users: User[]) => {
                if(!users.length) {
                    throw new Error('No users found!');
                }

                let user = users.shift();

                // Create a token, that will be used later on.
                user.token = v4();

                console.log(user);
                return user.save();
            }).then(user => {
                return callback(null, user);
            }).catch(err => {
                return callback(err);
            })

            return;
        }

        return callback('No userID provided');
    }) ;
  }  
}