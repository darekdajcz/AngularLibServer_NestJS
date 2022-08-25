import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from '../../app.service';
import { AccountService } from './services/account.service';
import { AccountController } from './controller/account.controller';
import { AccountSchema } from './schema/account.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Account', schema: AccountSchema }])
  ],
  controllers: [AccountController],
  providers: [AccountService, AppService]
})
export class AccountModule {
}
