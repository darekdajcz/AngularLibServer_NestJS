import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AccountService } from '../services/account.service';
import { RegisterAccountModel } from '../dto/register-account.dto';
import { LoginAccountModel } from '../dto/login-account.dto';
import { LocalAuthGuard } from '../../auth/local-auth.guard';

// localhost:3000/account
@Controller('/account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {
  }

  @Get('/')
  async getAllAccount(@Res() res) {
    try {
      const data = await this.accountService.listOfAccounts(res);
      res.status(HttpStatus.OK).json(data);
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  @Get('/:account-id')
  async getAccountById(@Res() res, @Param('account-id') accountId: string) {
    return await this.accountService.getAccountInfo(accountId);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Res() res, @Body() loginAccount: LoginAccountModel) {
    try {
      const data = await this.accountService.loginAccountInfo(loginAccount);
      res.status(HttpStatus.OK).json(data);
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  @Post('/')
  async registerAccount(@Res() res: Response, @Body() account: RegisterAccountModel) {
    try {
      const data = await this.accountService.registerAccount(account);
      res.status(HttpStatus.OK).json(data);
    } catch (err) {
      res.status(err.response.statusCode).send(err.response.message);
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
