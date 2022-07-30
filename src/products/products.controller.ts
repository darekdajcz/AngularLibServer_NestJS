import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product-service';


// localhost:3000/products
@Controller('products')
export class ProductsController {

  constructor(private readonly productService: ProductService) {
  }

  @Get('/all')
  getProducts(): any {
    return this.productService.getAll();
  }
}