import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
import { CustomerService } from '../services/customer.service';
import { Response } from 'express';
import { CreateCustomerDTO } from '../dto/customer.dto';
import { AppService } from '../../../app.service';

// localhost:3000/customers
@Controller('/customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService, private readonly appService: AppService) {
  }

  @Get('/home')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/')
  async getAllCustomers(@Res() res) {
    console.log('Response...')
    try {
      const data = await this.customerService.listOfCustomers(res);
      res.status(HttpStatus.OK).json(data);
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  @Get('/:customer-id')
  async getAllCustomerById(@Res() res, @Param('id') customerId: string) {
    return await this.customerService.getCustomer(customerId);
  }

  @Post('/')
  async createCustomers(@Res() res: Response, @Body() customer: CreateCustomerDTO) {
    console.log(customer)
    try {
      const data = await this.customerService.createCustomer(customer);
      res.status(HttpStatus.OK).json(data);
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  @Put('')
  async updateCustomerById(@Res() res: Response, @Body() customerParam: Partial<CreateCustomerDTO>, @Query('customerId') customerId: string) {
    const data = this.customerService.updateCustomer(customerId, customerParam);
    res.status(HttpStatus.OK).json(data);
  }

  @Delete('/')
  async deleteCustomerById(@Query('customerId') customerId: string) {
    return await this.customerService.removeCustomer(customerId);
  }

}
