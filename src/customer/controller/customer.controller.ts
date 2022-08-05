import { Controller, Get, HttpStatus, Param, Put, Req, Res } from '@nestjs/common';
import { CustomerService } from '../services/customer.service';

// localhost:3000/customers
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {
  }

  @Get()
  async getAllCustomers(@Res() res) {
    const data = this.customerService.listOfCustomers();
    res.status(HttpStatus.OK).json(data);
  }

  @Get('/:customer-id')
  async getAllCustomerById(@Res() res, @Param('id') customerId: string) {
    const data = this.customerService.getCustomer(customerId);
    res.status(HttpStatus.OK).json(data);
  }

  @Put('/:customer-id')
  async updateCustomerById(@Res() res, @Param('customer-id') customerId: string, @Req() req: Request) {
    const data = this.customerService.updateCustomer(customerId, req.body);
    res.status(HttpStatus.OK).json(data);
  }
}
