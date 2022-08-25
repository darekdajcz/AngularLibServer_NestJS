import { Injectable, InternalServerErrorException, NotFoundException, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Response } from 'express';
import { AccountInterface } from '../interface/account.interface';
import { RegisterAccountModel } from '../dto/account.dto';


@Injectable()
export class AccountService {

  constructor(@InjectModel('Account') private readonly accountModel: Model<AccountInterface>) {
  }

  async createAccount(accountModel: RegisterAccountModel): Promise<AccountInterface> {
    const newAccount = await new this.accountModel(accountModel);
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
      throw new InternalServerErrorException("error");
    }
  }

  async getAccountInfo(accountId: string): Promise<AccountInterface> {
    const account = await this.accountModel.findById(accountId);
    if (!account) {
      throw new NotFoundException('cant find account');
    }
    return account;
  }

}
