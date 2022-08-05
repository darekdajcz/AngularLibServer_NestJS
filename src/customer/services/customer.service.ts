import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from '../../database/entity/customer.entity';
import { Model } from 'mongoose';

@Injectable()
export class CustomerService {

  constructor(@InjectModel('Customer') private readonly customerModel: Model<Customer>) {
  }

  async listOfCustomers() {
    // return await this.customerModel({});
  }

  async createCustomer(customer): Promise<Customer> {
    return await this.customerModel.create(customer);
  }

  async updateCustomer(id: string, body: ReadableStream<Uint8Array>): Promise<Customer[]> {
    const customer = await this.customerModel.findByIdAndUpdate(id);
    if (customer) {
      // customer.propername
    }
    return customer.update();
  }

  async removeCustomer(customerId: number): Promise<Customer[]> {
    return await this.customerModel.findByIdAndRemove(customerId);
  }

  async getCustomer(id: string): Promise<Customer> {
    return await this.customerModel.findById(id);
  }

}