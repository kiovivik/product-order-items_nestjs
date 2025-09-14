export type Product = {
  id: number;
  name: string;
  price: number | string; // numeric from pg may come as string
  stock: number;
};

export type OrderItemDto = {
  productId: number;
  quantity: number;
};

export type CreateOrderDto = {
  userId: number;
  items: OrderItemDto[];
};

export type OrderSummaryRow = {
  orderId: number;
  userId: number;
  productName: string;
  quantity: number;
  price: number | string;
  total: number | string;
};