import React from 'react';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Box,
} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { useFieldArray, useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateOrder, useProducts } from './useOrders';
import { CreateOrderDto } from './types';

const schema = z.object({
  userId: z.number().int().positive(),
  items: z.array(
    z.object({
      productId: z.number().int().positive(),
      quantity: z.number().int().positive(),
    }),
  ).min(1),
});

type FormData = z.infer<typeof schema>;

export function OrderForm() {
  const { data: products } = useProducts();
  const create = useCreateOrder();

  const { control, handleSubmit, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { userId: 0, items: [{ productId: 0, quantity: 1 }] },
    mode: 'onBlur',
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'items' });

  const onSubmit = (data: FormData) => {
    const payload: CreateOrderDto = {
      userId: data.userId,
      items: data.items.map(it => ({ productId: it.productId, quantity: it.quantity })),
    };

    create.mutate(payload, {
      onSuccess: () => {
        reset({ userId: 0, items: [{ productId: 0, quantity: 1 }] });
      },
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>Create Order</Typography>

      <Controller
        name="userId"
        control={control}
        render={({ field }) => (
          <TextField
            label="User ID"
            type="number"
            {...field}
            value={field.value ?? ''}
            onChange={(e) => field.onChange(Number(e.target.value))}
            fullWidth
            sx={{ mb: 2 }}
          />
        )}
      />

      {fields.map((f, idx) => (
        <Grid container spacing={1} key={f.id} alignItems="center" sx={{ mb: 1 }}>
          <Grid item xs={6}>
            <Controller
              name={`items.${idx}.productId` as const}
              control={control}
              render={({ field }) => (
                  <Controller
                    name={`items.${idx}.productId` as const}
                    control={control}
                    render={({ field }) => (
                      <TextField
                         select
                         label="Product"
                         {...field}
                         value={field.value ?? ''}
                         onChange={(e) => field.onChange(Number(e.target.value))}
                         fullWidth
                      >
                        <MenuItem value="">
                          <em>Select…</em>
                        </MenuItem>
                        {products?.map(p => (
                           <MenuItem key={p.id} value={p.id}>
                             {p.name} (${Number(p.price).toFixed(2)}, stock: {p.stock})
                           </MenuItem>
                        ))}
                     </TextField>
                   )}
                />
              )}
            />
          </Grid>

          <Grid item xs={4}>
            <Controller
              name={`items.${idx}.quantity` as const}
              control={control}
              render={({ field }) => (
                <TextField
                  label="Qty"
                  type="number"
                  {...field}
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  fullWidth
                />
              )}
            />
          </Grid>

          <Grid item xs={2}>
            <Button variant="outlined" color="error" onClick={() => remove(idx)}>×</Button>
          </Grid>
        </Grid>
      ))}

      <Button variant="text" onClick={() => append({ productId: 0, quantity: 1 })}>Add Item</Button>

      <Box sx={{ mt: 2 }}>
        <Button type="submit" variant="contained" disabled={create.isLoading}>Submit Order</Button>
      </Box>

      {create.error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {(create.error as any).response?.data || String(create.error)}
        </Typography>
      )}
    </Box>
  );
}
