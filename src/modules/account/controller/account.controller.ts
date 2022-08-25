import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { AccountService } from '../services/account.service';
import { RegisterAccountModel } from '../dto/account.dto';

// localhost:3000/account
@Controller('/account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {
  }

  @Get('/:account-id')
  async getAccountById(@Res() res, @Param('account-id') accountId: string) {
    return await this.accountService.getAccountInfo(accountId);
  }

  @Post('/')
  async registerAccount(@Res() res: Response, @Body() account: RegisterAccountModel) {
    try {
      const data = await this.accountService.registerAccount(account);
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
