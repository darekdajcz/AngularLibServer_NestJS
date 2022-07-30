import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product-service';
import { CreateProductDto } from './dtos/create-product.dto';


// localhost:3000/products
@Controller('products')
export class ProductsController {

  constructor(private readonly productService: ProductService) {
  }

  @Get('/all')
  getProducts(): any {
    return this.productService.getAll();
  }

  @Get('/:id')
  getProduct(@Param('id') id: string): any {
    return this.productService.getById(parseInt(id));
  }

  @Post()
  addProduct(@Body() requestBody: CreateProductDto) {
    return this.productService.add(requestBody.title, requestBody.price);
  }

}