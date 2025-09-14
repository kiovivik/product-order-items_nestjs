import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ProductRepository } from '../products/product.repository';

@Injectable()
export class ValidateProductsPipe implements PipeTransform {
  constructor(private productRepo: ProductRepository) {}

  async transform(value: any) {
    if (!value.items || !Array.isArray(value.items)) {
      throw new BadRequestException('Items must be an array');
    }
    for (const item of value.items) {
      const product = await this.productRepo.findById(item.productId);
      if (!product) throw new BadRequestException(`Product ${item.productId} not found`);
      if (product.stock < item.quantity)
        throw new BadRequestException(`Insufficient stock for product ${product.id}`);
    }
    return value;
  }
}