import { Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrdersService {
  constructor(private repo: OrderRepository) {}

  create(userId: string, items: { productId: number; quantity: number }[]) {
    return this.repo.createOrder(userId, items);
  }

  findAll() {
    return this.repo.findAllWithItems();
  }
}