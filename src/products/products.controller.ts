import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post, UsePipes, ValidationPipe
} from '@nestjs/common';
import { ProductService } from './product-service';
import { CreateProductDto } from './dtos/create-product.dto';
import { EditProductDto } from './dtos/edit-product.dto';

// localhost:3000/products
@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @Get('')
  getProducts(): any {
    return this.productService.getAll();
  }

  @Get('/:id')
  getProduct(@Param('id') id: string): any {
    return this.productService.getById(parseInt(id));
  }

  @Post()
  @UsePipes(new ValidationPipe(
  ))
  addProduct(@Body() requestBody: CreateProductDto) {
    return this.productService.add(requestBody.title, requestBody.price);
  }

  @Delete('/:id')
  @HttpCode(204)
  removeProduct(@Param('id') id: string) {
    this.productService.remove(+id);
  }

  @Patch('/:id')
  editProduct(@Body() request: EditProductDto, @Param('id') id: string) {
    this.productService.edit(+id, request.price);
  }
}
