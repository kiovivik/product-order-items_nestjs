import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../drizzle/drizzle.service';
import { products } from '../drizzle/schema';
import { inArray, eq } from 'drizzle-orm';

@Injectable()
export class ProductRepository {
  constructor(private readonly drizzle: DrizzleService) {}

  async findAll() {
    return await this.drizzle.db.select().from(products);
  }

  async findByIds(ids: number[]) {
    return await this.drizzle.db.query.products.findMany({
      where: (p, { inArray }) => inArray(p.id, ids),
    });
  }

  async findById(id: number) {
    const rows = await this.drizzle.db
      .select()
      .from(products)
      .where(eq(products.id, id));
    return rows[0];
  }

  async updateStocks(updates: { id: number; newStock: number }[]) {
    await this.drizzle.db.transaction(async (tx) => {
      for (const u of updates) {
        await tx
          .update(products)
          .set({ stock: u.newStock })
          .where(eq(products.id, u.id));
      }
    });
  }
}
