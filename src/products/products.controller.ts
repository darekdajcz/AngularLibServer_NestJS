import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post, UseFilters, UsePipes, ValidationPipe
} from '@nestjs/common';
import { ProductService } from './product-service';
import { CreateProductDto } from './dtos/create-product.dto';
import { EditProductDto } from './dtos/edit-product.dto';
import { HttpExceptionFilter } from './filter/http-exception-filter';

// localhost:3000/products
@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {
  }

  @Get('')
  getProducts(): any {
    return this.productService.getAll();
  }

  @Get('/:id')
  @UseFilters(new HttpExceptionFilter())
  async getProduct(@Param('id') id: string): Promise<any> {
    try {
      return this.productService.getById(parseInt(id));
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Post()
  @UsePipes(new ValidationPipe())
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
