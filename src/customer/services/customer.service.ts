import { Injectable, InternalServerErrorException, NotFoundException, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from '../../database/entity/customer.entity';
import { Model } from 'mongoose';
import { Response } from 'express';
import { CreateCustomerDTO } from '../dto/customer.dto';


@Injectable()
export class CustomerService {

  constructor(@InjectModel('Customer') private readonly customerModel: Model<Customer>) {
  }

  async listOfCustomers(@Res() res: Response): Promise<Customer[]> {
    return await this.customerModel.find();
  }

  async createCustomer(customer: CreateCustomerDTO): Promise<Customer> {
    const newCustomer = await new this.customerModel(customer);
    return newCustomer.save();
  }

  async updateCustomer(id: string, body: Partial<CreateCustomerDTO>): Promise<Customer> {
    try {
      return await this.customerModel.findByIdAndUpdate(id, body, { new: true });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async removeCustomer(customerId: string): Promise<Customer[]> {
    try {
      return await this.customerModel.findByIdAndRemove(customerId);
    } catch (error) {
      throw new InternalServerErrorException("error");
    }
  }

  async getCustomer(id: string): Promise<Customer> {
    const customer = await this.customerModel.findById(id);
    if (!customer) {
      throw new NotFoundException('cant find customer');
    }
    return customer;
  }

}