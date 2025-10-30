import { createClient } from '@libsql/client';

const TURSO_URL = 'libsql://halloween-app-samsam.aws-eu-west-1.turso.io';
const TURSO_TOKEN = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NjE3Njg3NTcsImlkIjoiYTQ5MDQwODctZmQyZS00MjdiLWEzMTktM2UyZDQ4OGM2YWU0IiwicmlkIjoiZjEwZjA2MzMtMWVmOS00YTkxLTljYTMtZWIxYTA0MDc4YzE4In0.Lf9xB2XoQJRus5HTNfj7eEzBUY4wFWd8YMI9SOv2ZXh0Q52R4sZ3RLA_DSgpr-xdCqrCxJZUqsYhgnpb8zwTCA';

async function initSchema() {
  const turso = createClient({
    url: TURSO_URL,
    authToken: TURSO_TOKEN,
  });

  console.log('🔄 Creating Turso database schema...');

  try {
    // Character table
    await turso.execute(`
      CREATE TABLE IF NOT EXISTS characters (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        title TEXT NOT NULL,
        age INTEGER NOT NULL,
        description TEXT NOT NULL,
        background TEXT NOT NULL,
        secrets TEXT NOT NULL,
        alibi TEXT NOT NULL,
        relationships TEXT NOT NULL,
        isMurderer INTEGER NOT NULL DEFAULT 0,
        imageUrl TEXT,
        occupation TEXT NOT NULL,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL
      )
    `);
    console.log('✅ Characters table created');

    // Clue table
    await turso.execute(`
      CREATE TABLE IF NOT EXISTS clues (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        location TEXT NOT NULL,
        relatedCharacters TEXT NOT NULL,
        type TEXT NOT NULL,
        discoveredBy TEXT,
        importance TEXT NOT NULL DEFAULT 'medium',
        imageUrl TEXT,
        timeDiscovered TEXT,
        isRedHerring INTEGER NOT NULL DEFAULT 0,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL
      )
    `);
    console.log('✅ Clues table created');

    // Personnage table
    await turso.execute(`
      CREATE TABLE IF NOT EXISTS personnages (
        id TEXT PRIMARY KEY,
        nom TEXT NOT NULL,
        prenom TEXT NOT NULL,
        identifiant TEXT NOT NULL UNIQUE,
        motDePasse TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        role TEXT NOT NULL,
        categorie TEXT NOT NULL,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL
      )
    `);
    console.log('✅ Personnages table created');

    // User table
    await turso.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        username TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'player',
        score INTEGER NOT NULL DEFAULT 0,
        discoveredClues TEXT,
        suspicions TEXT,
        finalAccusation TEXT,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL
      )
    `);
    console.log('✅ Users table created');

    // GameState table
    await turso.execute(`
      CREATE TABLE IF NOT EXISTS game_states (
        id TEXT PRIMARY KEY,
        isRunning INTEGER NOT NULL DEFAULT 0,
        timeRemaining INTEGER NOT NULL DEFAULT 5400,
        startTime TEXT,
        pausedAt TEXT,
        updatedAt TEXT NOT NULL
      )
    `);
    console.log('✅ GameStates table created');

    // Notification table
    await turso.execute(`
      CREATE TABLE IF NOT EXISTS notifications (
        id TEXT PRIMARY KEY,
        message TEXT NOT NULL,
        type TEXT NOT NULL DEFAULT 'info',
        isActive INTEGER NOT NULL DEFAULT 1,
        createdAt TEXT NOT NULL
      )
    `);
    console.log('✅ Notifications table created');

    // Message table
    await turso.execute(`
      CREATE TABLE IF NOT EXISTS messages (
        id TEXT PRIMARY KEY,
        userId TEXT NOT NULL,
        username TEXT NOT NULL,
        content TEXT NOT NULL,
        isValidated INTEGER NOT NULL DEFAULT 0,
        validatedBy TEXT,
        validatedAt TEXT,
        pointsAwarded INTEGER NOT NULL DEFAULT 0,
        createdAt TEXT NOT NULL
      )
    `);
    console.log('✅ Messages table created');

    // Create indexes
    await turso.execute(`CREATE INDEX IF NOT EXISTS idx_notifications_active ON notifications(isActive, createdAt DESC)`);
    await turso.execute(`CREATE INDEX IF NOT EXISTS idx_messages_created ON messages(createdAt DESC)`);
    console.log('✅ Indexes created');

    console.log('🎉 Turso schema initialization complete!');
  } catch (error: any) {
    console.error('❌ Error creating schema:', error.message);
    throw error;
  }
}

initSchema();
