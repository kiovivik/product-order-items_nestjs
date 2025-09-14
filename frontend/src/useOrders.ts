import { useEffect, useState } from 'react';
import { api } from './api';

export function useOrders() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    api.get('/orders').then(res => setOrders(res.data));
  }, []);

  return orders;
}