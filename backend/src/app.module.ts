import { Module } from '@nestjs/common';
import { DrizzleModule } from './drizzle/drizzle.module';

import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { ProductRepository } from './products/product.repository';

import { OrdersController } from './orders/orders.controller';
import { OrdersService } from './orders/orders.service';
import { OrderRepository } from './orders/order.repository';

import { ValidateProductsPipe } from './pipes/validate-products.pipe';

@Module({
  imports: [DrizzleModule],
  controllers: [ProductsController, OrdersController],
  providers: [
    ProductsService,
    ProductRepository,
    OrdersService,
    OrderRepository,
    ValidateProductsPipe,
  ],
})
export class AppModule {}