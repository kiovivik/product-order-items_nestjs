import { Injectable, BadRequestException } from '@nestjs/common';
import { ProductRepository } from '../products/product.repository';
import { OrderRepository } from './order.repository';
import { CreateOrderDto } from '../dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    private readonly productRepo: ProductRepository,
    private readonly orderRepo: OrderRepository,
  ) {}

  async create(dto: CreateOrderDto) {
    const items = dto.items;
    const productIds = items.map((i) => i.productId);
    const products = await this.productRepo.findByIds(productIds);

    const unavailable = items.filter((it) => {
      const p = products.find((p) => p.id === it.productId);
      return !p || p.stock < it.quantity;
    });
    if (unavailable.length) {
      throw new BadRequestException('Some products are out of stock');
    }

    const itemsWithPrice = items.map((it) => {
      const p = products.find((p) => p.id === it.productId);
      return { productId: it.productId, quantity: it.quantity, price: p.price };
    });

    const newStocks = products.map((p) => {
      const ordered = items.find((it) => it.productId === p.id)?.quantity || 0;
      return { id: p.id, newStock: p.stock - ordered };
    });

    //await this.productRepo.updateStocks(newStocks);

    const order = await this.orderRepo.createOrderWithItems(dto.userId, itemsWithPrice, newStocks);
    return order;
  }

  async getGroupedByUser() {
    const withItems = await this.orderRepo.findAllWithItems();
    return withItems.reduce((acc, o) => {
      (acc[o.userId] ??= []).push(o);
      return acc;
    }, {} as Record<number, typeof withItems>);
  }

  async getOrderSummaries() {
    const withItems = await this.orderRepo.findAllWithItems();
    return withItems.flatMap((order) =>
      order.items.map((item) => ({
        orderId: order.id,
        userId: order.userId,
        productName: item.product?.name,
        quantity: item.quantity,
        price: item.price,
        total: Number(item.price) * item.quantity,
      })),
    );
  }

}
