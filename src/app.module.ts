import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CustomerModule } from './customer/customer.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ProductsModule, CustomerModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
