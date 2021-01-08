import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserIDStrategy } from './userid.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule],
  providers: [AuthService, UserIDStrategy]
})
export class AuthModule {}
