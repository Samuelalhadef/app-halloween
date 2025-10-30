import { createClient } from '@libsql/client';

if (!process.env.TURSO_DATABASE_URL) {
  throw new Error('Please add your Turso database URL to .env.local');
}

if (!process.env.TURSO_AUTH_TOKEN) {
  throw new Error('Please add your Turso auth token to .env.local');
}

const turso = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export default turso;
