import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  getAll(): any {
    return [
      { id: 1, title: 'Milk', price: 3.5 },
      { id: 2, title: 'Fries', price: 5.5 }
    ];
  }
}