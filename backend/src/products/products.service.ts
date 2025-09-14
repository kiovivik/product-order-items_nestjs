import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductsService {
  constructor(private repo: ProductRepository) {}

  findAll() {
    return this.repo.findAll();
  }
}