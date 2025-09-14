import { Controller, Get, Post, Body, UsePipes } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { ValidateProductsPipe } from '../pipes/validate-products.pipe';

@Controller('orders')
export class OrdersController {
  constructor(private service: OrdersService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Post()
  @UsePipes(ValidateProductsPipe)
  create(@Body() body: CreateOrderDto) {
    return this.service.create(body.userId, body.items);
  }
}