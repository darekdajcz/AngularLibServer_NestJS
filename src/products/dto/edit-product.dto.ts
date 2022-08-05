import { IsNumber } from 'class-validator';

export class EditProductDto {
  @IsNumber({}, { message: 'Price must be number' })
  price: number;
}
