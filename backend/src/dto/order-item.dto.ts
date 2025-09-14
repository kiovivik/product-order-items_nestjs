import { IsInt, IsPositive } from 'class-validator';

export class OrderItemDto {
  @IsInt()
  productId: number;

  @IsInt()
  @IsPositive()
  quantity: number;
}
