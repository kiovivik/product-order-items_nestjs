import { Button, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { api } from './api';

export function OrderForm({ products }: { products: { id: number; name: string; price: number; stock: number }[] }) {
  const [userId, setUserId] = useState('');
  const [items, setItems] = useState<{ productId?: number; quantity?: number }[]>([]);

  const submit = async () => {
    await api.post('/orders', { userId, items });
    setUserId('');
    setItems([]);
  };

  return (
    <>
      <Typography variant="h6">Create Order</Typography>
      <TextField label="User ID" value={userId} onChange={e => setUserId(e.target.value)} fullWidth sx={{ mb: 2 }} />
      {items.map((itm, idx) => (
        <Grid container spacing={1} key={idx}>
          <Grid item xs={6}>
            <TextField
              select
              label="Product"
              SelectProps={{ native: true }}
              value={itm.productId ?? ''}
              onChange={e => {
                const pid = parseInt(e.target.value, 10);
                setItems(items.map((it, j) => j === idx ? { ...it, productId: pid } : it));
              }}
              fullWidth
            >
              <option value="">Select…</option>
              {products.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} (${p.price}, stock: {p.stock})
                </option>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Qty"
              type="number"
              value={itm.quantity ?? ''}
              onChange={e => {
                const qty = parseInt(e.target.value, 10);
                setItems(items.map((it, j) => j === idx ? { ...it, quantity: qty } : it));
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <Button onClick={() => setItems(items.filter((_, j) => j !== idx))}>×</Button>
          </Grid>
        </Grid>
      ))}
      <Button onClick={() => setItems([...items, {}])}>Add Item</Button>
      <Button onClick={submit} variant="contained" sx={{ mt: 2 }}>Submit</Button>
    </>
  );
}