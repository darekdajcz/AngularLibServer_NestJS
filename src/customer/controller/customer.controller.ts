import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { CustomerService } from '../services/customer.service';

// localhost:3000/customers
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {
  }

  @Get()
  getAllCustomers(@Res() res) {
    const data = this.customerService.listOfCustumers();
    res.status(HttpStatus.OK).json(data);
  }

  @Get('/:customer-id')
  getAllCustomerById(@Res() res, @Param('id') customerId: string) {
    const data = this.customerService.getCustomer(customerId);
    res.status(HttpStatus.OK).json(data);

  }

}
