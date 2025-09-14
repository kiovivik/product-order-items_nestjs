-- db-init.sql: create tables and seed sample products

CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price REAL NOT NULL,
  stock INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id),
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER NOT NULL
);

-- sample products
INSERT INTO products (name, price, stock) VALUES
('Keyboard', 49.99, 100),
('Mouse', 29.99, 200),
('Monitor', 199.99, 50)
ON CONFLICT DO NOTHING;