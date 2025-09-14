import { Container, Typography } from '@mui/material';
import { useOrders } from './useOrders';
import { OrderSummary } from './OrderSummary';
import { CreateOrderPage } from './CreateOrderPage';

function App() {
  const orders = useOrders();

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ my: 4 }}>Order System</Typography>
      <CreateOrderPage />
      <Typography variant="h5" sx={{ mt: 4 }}>Orders</Typography>
      {orders.map((o, i) => <OrderSummary key={i} order={o} />)}
    </Container>
  );
}

export default App;