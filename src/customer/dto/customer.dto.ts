import { IsDefined, IsEmail, IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateCustomerDTO {
  readonly firstName: string;
  readonly lastName: string;
  @IsEmail()
  @IsDefined()
  readonly email: string;
  readonly phone: string;
  readonly address: string;
  readonly description: string;
  readonly createdAt: Date;
}

export class CustomerParamDTO {
  @IsNotEmpty()
  @IsMongoId()
  readonly customerId: string;
}