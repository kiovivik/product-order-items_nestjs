DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC(12,2) NOT NULL,
  stock INTEGER DEFAULT 0 NOT NULL
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  total NUMERIC(12,2) NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now() NOT NULL
);

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES orders(id),
  product_id INTEGER NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price NUMERIC(12,2) NOT NULL
);


INSERT INTO products (name, price, stock) VALUES
('Keyboard', 49.99, 100),
('Mouse', 29.99, 200),
('Monitor', 199.99, 50);
