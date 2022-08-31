import { Injectable } from '@nestjs/common';
import { AccountService } from '../../account/services/account.service';
import { LoginAccountModel } from '../../account/dto/login-account.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AccountInterface } from '../../account/interface/account.interface';

@Injectable()
export class AuthService {
  constructor(private readonly accountService: AccountService, private readonly jwtService: JwtService) {
  }

  async validateAccount(loginAccount: LoginAccountModel): Promise<any> {
    const user = await this.accountService.loginAccountInfo(loginAccount);
    const isPasswordCorrect = await bcrypt.compare(loginAccount.password, user.password);
    if (user && isPasswordCorrect) {
      const { password, ...result } = user;

      return result;
    }
    return null;
  }

  login(account: AccountInterface) {
    const payload = { username: account.email, sub: account._id };

    return {
      acces_token: this.jwtService.sign(payload)
    };
  }
}
