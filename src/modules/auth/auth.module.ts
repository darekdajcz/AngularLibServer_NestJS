import { Module } from '@nestjs/common';
import { AccountModule } from '../account/account.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local-strategy';
import { AuthService } from './service/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { env } from '../../config/app.config';
import { JwtStrategy } from './jwt-strategy';

@Module({
  imports: [
    AccountModule,
    PassportModule,
    JwtModule.register({
      secret: env.JWT_SECRTET,
      signOptions: { expiresIn: '60s' }
    })
  ],
  controllers: [],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {
}
