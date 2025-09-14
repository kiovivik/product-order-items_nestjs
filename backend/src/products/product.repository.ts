import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../drizzle/drizzle.service';
import { products } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class ProductRepository {
  constructor(private drizzle: DrizzleService) {}

  async findAll() {
    return await this.drizzle.db.select().from(products);
  }

  async findById(id: number) {
    const result = await this.drizzle.db
      .select()
      .from(products)
      .where(eq(products.id, id));
    return result[0];
  }
}