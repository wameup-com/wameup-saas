import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.POSTGRES_URL) {
  throw new Error('POSTGRES_URL environment variable is not set');
}

declare global {
  // eslint-disable-next-line no-var
  var _pgClient: ReturnType<typeof postgres> | undefined;
}

const client = global._pgClient ?? postgres(process.env.POSTGRES_URL, { max: 1, prepare: false });
if (process.env.NODE_ENV !== 'production') global._pgClient = client;

export { client };
export const db = drizzle(client, { schema });
