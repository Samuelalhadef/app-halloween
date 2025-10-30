import { createClient, Client, ResultSet } from '@libsql/client';
import { config } from 'dotenv';
import { resolve } from 'path';

// Charger .env.local si on est en mode script (pas dans Next.js)
if (typeof window === 'undefined' && !process.env.NEXT_RUNTIME) {
  config({ path: resolve(process.cwd(), '.env.local') });
}

let tursoClient: Client | null = null;

export function getTursoClient(): Client {
  if (!tursoClient) {
    if (!process.env.TURSO_DATABASE_URL) {
      throw new Error('TURSO_DATABASE_URL is not set');
    }
    if (!process.env.TURSO_AUTH_TOKEN) {
      throw new Error('TURSO_AUTH_TOKEN is not set');
    }

    tursoClient = createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
  }

  return tursoClient;
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
