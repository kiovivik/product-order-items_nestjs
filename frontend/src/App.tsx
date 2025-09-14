import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Container, AppBar, Toolbar, Button, Box } from '@mui/material';
import { OrderForm } from './OrderForm';
import { OrderSummary } from './OrderSummary';
import { ProductsPage } from './ProductsPage';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" component={Link} to="/">
              Create Order
            </Button>
            <Button color="inherit" component={Link} to="/products">
              Products
            </Button>
            <Button color="inherit" component={Link} to="/summary">
              Summaries
            </Button>
          </Toolbar>
        </AppBar>

        <Container maxWidth="md" sx={{ mt: 4 }}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <OrderForm />
                </>
              }
            />
            <Route path="/products" element={<ProductsPage />} />
            <Route
              path="/summary"
              element={
                <>
                  <OrderSummary />
                </>
              }
            />
          </Routes>
        </Container>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
