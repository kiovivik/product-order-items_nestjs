import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../drizzle/drizzle.service';
import { orders, orderItems, products } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class OrderRepository {
  constructor(private readonly drizzle: DrizzleService) {}

  async createOrderWithItems(
    userId: number,
    items: { productId: number; quantity: number; price: string }[],
    updates: { id: number; newStock: number }[]
  ) {
    try {
      return await this.drizzle.db.transaction(async (tx) => {
        const total = items.reduce(
          (sum, i) => sum + Number(i.price) * i.quantity,
          0,
        );
        const [order] = await tx.insert(orders).values({ userId, total }).returning();
        const itemsToInsert = items.map((i) => ({
          orderId: order.id,
          productId: i.productId,
          quantity: i.quantity,
          price: i.price,
        }));
        await tx.insert(orderItems).values(itemsToInsert);
            
        for (const u of updates) {
          const updated = await tx
            .update(products)
            .set({ stock: u.newStock })
            .where(eq(products.id, u.id)).returning();;

            console.log('updated rows', updated);
        }

        return order;
      });
    } catch (err) {      
      console.error('createOrderWithItems failed:', err?.message ?? err);      
      throw err;
    } finally {
      // any cleanup...
      console.log('createOrderWithItems finished attempt for user', userId);
    }
  }

  async findAllWithItems() {
    const db = this.drizzle.db;

     const ordersList = await db.select().from(orders);

    if (ordersList.length === 0) {
      return [];
    }

    const orderIds = ordersList.map(o => o.id);

    const items = await db.query.orderItems.findMany({
      where: (oi, { inArray }) => inArray(oi.orderId, orderIds),
    });

    const productIds = Array.from(new Set(items.map(i => i.productId)));
    const productsList = productIds.length
      ? await db.query.products.findMany({
          where: (p, { inArray }) => inArray(p.id, productIds),
        })
      : [];

    const itemsByOrder = items.reduce((acc, it) => {
      const key = it.orderId;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push({
        ...it,
        product: productsList.find(p => p.id === it.productId) || null,
      });
      return acc;
    }, {} as Record<number, Array<typeof items[number] & { product: any }>>);

    return ordersList.map(o => ({
      ...o,
      items: itemsByOrder[o.id] || [],
    }));
  }
}
