import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto';
import { ProductRepository } from '../products/product.repository';

@Injectable()
export class ValidateProductsPipe implements PipeTransform {
  constructor(private productRepo: ProductRepository) {}

  async transform(value: any) {
    const dto: CreateOrderDto = value;
    if (!dto.items || !Array.isArray(dto.items)) {
      throw new BadRequestException('Items must be an array');
    }
    for (const it of dto.items) {
      const prod = await this.productRepo.findById(it.productId);
      if (!prod) throw new BadRequestException(`Product ${it.productId} not found`);
      if (prod.stock < it.quantity) throw new BadRequestException(`Insufficient stock`);
    }
    return dto;
  }
}
