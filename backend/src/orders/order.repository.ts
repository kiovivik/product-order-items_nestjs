import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../drizzle/drizzle.service';
import { orders, orderItems, products } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class OrderRepository {
  constructor(private drizzle: DrizzleService) {}

  async createOrder(userId: string, items: { productId: number; quantity: number }[]) {
    const [order] = await this.drizzle.db
      .insert(orders)
      .values({ userId })
      .returning({ id: orders.id });

    for (const item of items) {
      await this.drizzle.db.insert(orderItems).values({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
      });
    }
    return order;
  }

  async findAllWithItems() {
    const allOrders = await this.drizzle.db.select().from(orders);
    const allItems = await this.drizzle.db.select().from(orderItems);
    const allProducts = await this.drizzle.db.select().from(products);

    return allOrders.map(order => ({
      ...order,
      items: allItems
        .filter(i => i.orderId === order.id)
        .map(i => ({
          ...i,
          product: allProducts.find(p => p.id === i.productId),
        })),
    }));
  }
}