import React from 'react';
import { useProducts } from './useOrders';
import {
  Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer, Typography,
} from '@mui/material';
import { Product } from './types';

export function ProductsPage() {
  const { data, isLoading, isError } = useProducts();

  if (isLoading) return <Typography>Loading products…</Typography>;
  if (isError) return <Typography color="error">Error loading products</Typography>;

  const rows: Product[] = data ?? [];

  return (
    <>
      <Typography variant="h6">Products</Typography>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell><TableCell>Name</TableCell>
              <TableCell>Price</TableCell><TableCell>Stock</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.id}</TableCell>
                <TableCell>{p.name}</TableCell>
                <TableCell>{Number(p.price).toFixed(2)}</TableCell>
                <TableCell>{p.stock}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
