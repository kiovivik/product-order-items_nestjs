import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { ValidateProductsPipe } from '../pipes/validate-products.pipe';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  findAll() {
    return this.ordersService.getOrderSummaries();
  }

  @Post()
  async create(@Body(ValidateProductsPipe) dto: CreateOrderDto) {
    return this.ordersService.create(dto);
  }

  @Get('grouped')
  getGrouped() {
    return this.ordersService.getGroupedByUser();
  }

  @Get('summary')
  getSummary() {
    return this.ordersService.getOrderSummaries();
  }

  @Get(':id/total')
  getOrderTotal(@Param('id', ParseIntPipe) id: number) {
    // todo: shouldn't fetch all orders, better findOrderWithItemsById instead
    return this.ordersService.getOrderSummaries().then((summaries) => {
      const order = summaries.find((s: any) => s.orderId === id);
      if (!order) return { total: 0 };
      return { total: Number(order.total) };
    });
  }
}
