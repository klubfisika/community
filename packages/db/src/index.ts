import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

export function createDb(databaseUrl: string) {
  const client = neon(databaseUrl);
  return drizzle(client);
}

export type DbClient = ReturnType<typeof createDb>;
