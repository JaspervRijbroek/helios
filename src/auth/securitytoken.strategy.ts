import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { User } from 'src/user/user.entity';

@Injectable()
export class UserIDStrategy extends PassportStrategy(Strategy, 'securitytoken') {
  constructor(private authService: AuthService) {
    super((req: Request, callback: Function) => {
        if(req && req.headers && req.headers['securitytoken']) {
            User.find({
                id: parseInt(req.headers['userid'] as string)
            }).then(user => {
                return callback(null, user[0]);
            }).catch(err => {
                return callback(err);
            })

            return;
        }

        return callback('No securityToken provided');
    }) ;
  }  
}