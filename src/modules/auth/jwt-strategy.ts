import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './service/auth.service';
import { LoginAccountModel } from '../account/dto/login-account.dto';
import { ExtractJwt } from 'passport-jwt';
import { env } from '../../config/app.config';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env.JWT_SECRTET
    });
  }

  async validate(payload: any) {
    return {
      userId: payload.sub,
      username: payload.username
    };
  }

}
