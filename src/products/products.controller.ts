import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post, UseFilters, UseGuards, UseInterceptors, UsePipes, ValidationPipe
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { EditProductDto } from './dto/edit-product.dto';
import { HttpExceptionFilter } from './filter/http-exception-filter';
import { ProductDto } from './dto/product.dto';
import { JoiValidationPipe } from './pipe/joi-validation.pipe';
import { AuthGuard } from './guard/auth.guard';
import { LoggingInterceptor } from './interceptor/logging.interceptor';

// localhost:3000/products
@UseGuards(new AuthGuard())
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
  @UseGuards(new AuthGuard())
  @UseInterceptors(new LoggingInterceptor())
  async getProduct(@Param('id') id: string): Promise<ProductDto> {
    try {
      return this.productService.getById(parseInt(id));
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Post()
  addProduct(@Body() requestBody: CreateProductDto) {
    return this.productService.add(requestBody.title, requestBody.price);
  }

  @UsePipes(new JoiValidationPipe({}))
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
