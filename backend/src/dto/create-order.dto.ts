import { OrderItemDto } from './order-item.dto';

export class CreateOrderDto {
  userId: string;
  items: OrderItemDto[];
}