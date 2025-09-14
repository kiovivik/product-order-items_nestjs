import { useEffect, useState } from 'react';
import { OrderForm } from './OrderForm';
import { api } from './api';

export function CreateOrderPage() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    api.get('/products').then(res => setProducts(res.data));
  }, []);

  return (
    <div>
      <OrderForm products={products} />
    </div>
  );
}