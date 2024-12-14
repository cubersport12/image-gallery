import {defineConfig} from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './schema.ts',
  out: './drizzle',
  dbCredentials: {
    host: 'localhost',
    database: 'ImageGallery',
    user: 'postgres',
    port: 5432,
    password: '123'
  }
});
