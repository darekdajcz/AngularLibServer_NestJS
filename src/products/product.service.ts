import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';

let products = [
  { id: 1, title: 'Milk', price: 3.5 },
  { id: 2, title: 'Fries', price: 5.5 }
];

@Injectable()
export class ProductService {
  getAll(): any {
    return products;
  }

  async getById(id: number): Promise<ProductDto> {
    const product = products.find((product) => product.id === id);
    if (product) {
      return Promise.resolve(product);
    }
    throw new NotFoundException('XX');
  }

  add(title: string, price: number) {
    const id = Math.round(Math.random() * 10000);
    const newProduct = { id, title, price };
    products.push(newProduct);
    return newProduct;
  }

  remove(id: number) {
    products = products.filter((x) => x.id !== id);
  }

  edit(id: number, price: number) {
    const product = products.find((x) => (x.id = id));
    product.price = price;
  }
}
