import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserIDStrategy } from './userid.strategy';
import { PassportModule } from '@nestjs/passport';
import { SecurityTokenStrategy } from './securitytoken.strategy';

@Module({
  imports: [PassportModule],
  providers: [AuthService, UserIDStrategy, SecurityTokenStrategy]
})
export class AuthModule {}
