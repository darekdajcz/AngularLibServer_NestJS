import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from '../../database/entity/customer.entity';
import { Model } from 'mongoose';

@Injectable()
export class CustomerService {

  constructor(@InjectModel('Customer') private readonly customerModel: Model<Customer>) {
  }

  async listOfCustumers(): Promise<Customer[]> {
    return await this.customerModel.find({});
  }

  async getCustomer(id: string): Promise<Customer> {
    return await this.customerModel.findById(id);
  }

}