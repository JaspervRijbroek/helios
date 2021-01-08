import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { User } from 'src/user/user.entity';

@Injectable()
export class SecurityTokenStrategy extends PassportStrategy(Strategy, 'securitytoken') {
  constructor(private authService: AuthService) {
    super((req: Request, callback: Function) => {
        if(req && req.headers && req.headers['securitytoken']) {
            User.find({
                token: req.headers['securitytoken'] as string
            }).then((users: User[]) => {
                if(!users.length) {
                    throw new Error('No users found!');
                }

                return users.shift();
            }).then(user => {
                return callback(null, user);
            }).catch(err => {
                return callback(err);
            })

            return;
        }

        return callback('No securityToken provided');
    }) ;
  }  
}