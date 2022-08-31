import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './service/auth.service';
import { LoginAccountModel } from '../account/dto/login-account.dto';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(loginAccount: LoginAccountModel): Promise<any> {
    const user = await this.authService.validateAccount(loginAccount);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

}
