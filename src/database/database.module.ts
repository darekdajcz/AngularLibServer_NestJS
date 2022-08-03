import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entity/customer.entity';
import { User } from './entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql',
      port: 3306,
      username: 'darek-user',
      password: 'uzi2115',
      database: 'angular_db',
      entities: [User, Customer],
      synchronize: true
    })]
})
export class AppModule {}
