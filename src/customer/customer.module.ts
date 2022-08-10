import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerSchema } from './schema/customer.schema';
import { CustomerController } from './controller/customer.controller';
import { CustomerService } from './services/customer.service';
import { AppService } from '../app.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Customer', schema: CustomerSchema }])
  ],
  controllers: [CustomerController],
  providers: [CustomerService, AppService]
})
export class CustomerModule {
}