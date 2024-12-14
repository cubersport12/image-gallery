import {
  pgTable,
  text, timestamp,
} from 'drizzle-orm/pg-core';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';

const connectionString = 'postgres://postgres:123@localhost:5432/ImageGallery';
const pool = postgres(connectionString, { max: 1 });

export const db = drizzle(pool);

export const users = pgTable('user', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name'),
  email: text('email').unique(),
  hashedPassword: text('password'),
});

export const files = pgTable('files', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text('userId').references(() => users.id, {
    onDelete: 'cascade'
  }),
  fileName: text('name'),
  mimeType: text('mime'),
  file: text('file'),
  timestamp: timestamp(),
});
