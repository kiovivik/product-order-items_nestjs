import { IsInt, ValidateNested, ArrayNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderItemDto } from './order-item.dto';

export class CreateOrderDto {
  @IsInt()
  userId: number;

  @ArrayNotEmpty()
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}
