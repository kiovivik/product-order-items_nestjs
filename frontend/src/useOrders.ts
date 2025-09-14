import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from './api';
import { Product, OrderSummaryRow, CreateOrderDto } from './types';

export const useProducts = () =>
  useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await api.get('/products');
      return res.data as Product[];
    },
  });

export const useOrderSummaries = () =>
  useQuery<OrderSummaryRow[], Error>({
    queryKey: ['orderSummaries'],
    queryFn: async () => {
      const res = await api.get('/orders/summary');
      return res.data as OrderSummaryRow[];
    },
  });

export const useCreateOrder = () => {
  const qc = useQueryClient();

  return useMutation<any, Error, CreateOrderDto>({
    mutationFn: async (dto: CreateOrderDto) => {
      const r = await api.post('/orders', dto);
      return r.data;
    },
    onSuccess: () => {
      qc.invalidateQueries(['orderSummaries']);
      qc.invalidateQueries(['products']);
    },
  });
};