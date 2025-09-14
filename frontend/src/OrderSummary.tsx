import React from 'react';
import { useOrderSummaries } from './useOrders';
import {
  Table, TableHead, TableBody, TableCell, TableRow, Typography, Paper, TableContainer,
} from '@mui/material';
import { OrderSummaryRow } from './types';

export function OrderSummary() {
  const { data, isLoading, isError } = useOrderSummaries();

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography color="error">Error loading summaries</Typography>;

  const rows = data ?? [];

  return (
    <>
      <Typography variant="h6" sx={{ mt: 3 }}>Order Summaries</Typography>

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Qty</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row: OrderSummaryRow) => (
              <TableRow key={`${row.orderId}-${row.productName}`}>
                <TableCell>{row.orderId}</TableCell>
                <TableCell>{row.userId}</TableCell>
                <TableCell>{row.productName}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{Number(row.price).toFixed(2)}</TableCell>
                <TableCell>{Number(row.total).toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
