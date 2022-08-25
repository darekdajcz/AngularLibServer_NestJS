import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { AccountService } from '../services/account.service';
import { RegisterAccountModel } from '../dto/account.dto';

// localhost:3000/customers
@Controller('/account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {
  }


  @Get('/:account-id')
  async getAllAccountById(@Res() res, @Param('account-id') accountId: string) {
    return await this.accountService.getAccountInfo(accountId);
  }

  @Post('/')
  async createAccount(@Res() res: Response, @Body() account: RegisterAccountModel) {
    try {
      const data = await this.accountService.createAccount(account);
      res.status(HttpStatus.OK).json(data);
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  @Put('')
  async updateAccountById(@Res() res: Response, @Body() accountParam: Partial<RegisterAccountModel>, @Query('accountId') accountId: string) {
    const data = this.accountService.updateAccount(accountId, accountParam);
    res.status(HttpStatus.OK).json(data);
  }

  @Delete('/')
  async deleteAccountById(@Query('accountId') accountId: string) {
    return await this.accountService.removeAccount(accountId);
  }
}
