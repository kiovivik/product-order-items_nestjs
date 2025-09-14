import {
  pgTable,
  serial,
  text,
  integer,
  numeric,
  timestamp,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  price: numeric('price', { precision: 12, scale: 2 }).notNull(),
  stock: integer('stock').default(0).notNull(),
});

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull(),
  total: numeric('total', { precision: 12, scale: 2 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const orderItems = pgTable('order_items', {
  id: serial('id').primaryKey(),
  orderId: integer('order_id').references(() => orders.id).notNull(),
  productId: integer('product_id').references(() => products.id).notNull(),
  quantity: integer('quantity').notNull(),
  // todo: orderItems table should not contain price, database should be normalized insted
  price: numeric('price', { precision: 12, scale: 2 }).notNull(),
});

// simpler approach for relation declarations — Drizzle will infer FK columns from the tables above:
export const ordersRelations = relations(orders, ({ many }) => ({
  items: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  product: one(products),
  order: one(orders),
}));

// convenience types
export type Product = typeof products.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type OrderItem = typeof orderItems.$inferSelect;
