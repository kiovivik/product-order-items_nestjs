import { Card, CardContent, Typography } from '@mui/material';

export function OrderSummary({ order }: { order: any }) {
  return (
    <Card sx={{ my: 2 }}>
      <CardContent>
        <Typography>User ID: {order.userId}</Typography>
        <ul>
          {order.items.map((it: any, i: number) => (
            <li key={i}>
              {it.quantity} × {it.product.name} (${it.product.price})
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}