import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

// Force dotenv to load absolute root context 
const dbUrl = process.env.DB_SQLITE;

if (!dbUrl) {
  throw new Error("DB_SQLITE environment variable is missing!");
}

export const client = createClient({ url: process.env.DB_SQLITE! });
export const db = drizzle({client});
