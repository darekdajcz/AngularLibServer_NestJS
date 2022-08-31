import { Injectable, InternalServerErrorException, NotFoundException, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccountInterface } from '../interface/account.interface';
import { RegisterAccountModel } from '../dto/register-account.dto';
import { LoginAccountModel } from '../dto/login-account.dto';
import { Response } from 'express';
import bcrypt from 'bcrypt';
import { MovieInterface } from '../../movie/interface/movie.interface';


@Injectable()
export class AccountService {

  constructor(@InjectModel('Account') private readonly accountModel: Model<AccountInterface>) {
  }

  async listOfAccounts(@Res() res: Response): Promise<AccountInterface[]> {
    return await this.accountModel.find();
  }


  async registerAccount(accountModel: RegisterAccountModel): Promise<AccountInterface> {
    const newAccount = await new this.accountModel(accountModel);
    // this.accountModel
    return newAccount.save();
  }

  async updateAccount(id: string, body: Partial<RegisterAccountModel>): Promise<AccountInterface> {
    try {
      return await this.accountModel.findByIdAndUpdate(id, body, { new: true });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async removeAccount(accountId: string): Promise<AccountInterface> {
    try {
      return await this.accountModel.findByIdAndRemove(accountId);
    } catch (error) {
      throw new InternalServerErrorException('error');
    }
  }

  async getAccountInfo(accountId: string): Promise<AccountInterface> {
    const account = await this.accountModel.findById(accountId);
    if (!account) {
      throw new NotFoundException('Can\'t find account');
    }
    return account;
  }

  async loginAccountInfo(loginAccount: LoginAccountModel): Promise<AccountInterface> {
    let emailFound;
    let loginAccountFound;
    await this.accountModel.collection.find().forEach((res) => {
      if (res.email === loginAccount.email) {
        console.log(res);
        emailFound = true;
      }

     emailFound ? loginAccountFound = res : null;
    });

    if (!emailFound) {
      throw new NotFoundException('Account with this email doesn\'t exists');
    }
    // if (emailFound && !passwordFound) {
    //   throw new NotFoundException('Wrong password');
    // }

    return loginAccountFound;
  }

}
