import { createClient } from '@libsql/client';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Import all models
import Character from '../models/Character';
import Clue from '../models/Clue';
import Personnage from '../models/Personnage';
import User from '../models/User';
import GameState from '../models/GameState';
import Notification from '../models/Notification';
import Message from '../models/Message';

dotenv.config({ path: '.env.local' });

const TURSO_URL = 'libsql://halloween-app-samsam.aws-eu-west-1.turso.io';
const TURSO_TOKEN = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NjE3Njg3NTcsImlkIjoiYTQ5MDQwODctZmQyZS00MjdiLWEzMTktM2UyZDQ4OGM2YWU0IiwicmlkIjoiZjEwZjA2MzMtMWVmOS00YTkxLTljYTMtZWIxYTA0MDc4YzE4In0.Lf9xB2XoQJRus5HTNfj7eEzBUY4wFWd8YMI9SOv2ZXh0Q52R4sZ3RLA_DSgpr-xdCqrCxJZUqsYhgnpb8zwTCA';

async function migrate() {
  const turso = createClient({
    url: TURSO_URL,
    authToken: TURSO_TOKEN,
  });

  console.log('🔄 Starting migration from MongoDB to Turso...\n');

  try {
    // Connect to MongoDB
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI not found in environment variables');
    }

    console.log('📡 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Migrate Characters
    console.log('🔄 Migrating Characters...');
    const characters = await Character.find({}).lean();
    console.log(`   Found ${characters.length} characters`);
    for (const char of characters) {
      await turso.execute({
        sql: `INSERT INTO characters (id, name, title, age, description, background, secrets, alibi, relationships, isMurderer, imageUrl, occupation, createdAt, updatedAt)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          String((char as any)._id),
          char.name,
          char.title,
          char.age,
          char.description,
          char.background,
          JSON.stringify(char.secrets || []),
          char.alibi,
          JSON.stringify(char.relationships || []),
          char.isMurderer ? 1 : 0,
          char.imageUrl || null,
          char.occupation,
          (char as any).createdAt?.toISOString() || new Date().toISOString(),
          (char as any).updatedAt?.toISOString() || new Date().toISOString(),
        ],
      });
    }
    console.log(`✅ Migrated ${characters.length} characters\n`);

    // Migrate Clues
    console.log('🔄 Migrating Clues...');
    const clues = await Clue.find({}).lean();
    console.log(`   Found ${clues.length} clues`);
    for (const clue of clues) {
      await turso.execute({
        sql: `INSERT INTO clues (id, title, description, location, relatedCharacters, type, discoveredBy, importance, imageUrl, timeDiscovered, isRedHerring, createdAt, updatedAt)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          String((clue as any)._id),
          clue.title,
          clue.description,
          clue.location,
          JSON.stringify(clue.relatedCharacters || []),
          clue.type,
          JSON.stringify(clue.discoveredBy || []),
          clue.importance,
          clue.imageUrl || null,
          clue.timeDiscovered || null,
          clue.isRedHerring ? 1 : 0,
          (clue as any).createdAt?.toISOString() || new Date().toISOString(),
          (clue as any).updatedAt?.toISOString() || new Date().toISOString(),
        ],
      });
    }
    console.log(`✅ Migrated ${clues.length} clues\n`);

    // Migrate Personnages
    console.log('🔄 Migrating Personnages...');
    const personnages = await Personnage.find({}).lean();
    console.log(`   Found ${personnages.length} personnages`);
    for (const perso of personnages) {
      await turso.execute({
        sql: `INSERT INTO personnages (id, nom, prenom, identifiant, motDePasse, email, role, categorie, createdAt, updatedAt)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          String((perso as any)._id),
          perso.nom,
          perso.prenom,
          perso.identifiant,
          perso.motDePasse,
          perso.email,
          perso.role,
          perso.categorie,
          (perso as any).createdAt?.toISOString() || new Date().toISOString(),
          (perso as any).updatedAt?.toISOString() || new Date().toISOString(),
        ],
      });
    }
    console.log(`✅ Migrated ${personnages.length} personnages\n`);

    // Migrate Users
    console.log('🔄 Migrating Users...');
    const users = await User.find({}).select('+password').lean();
    console.log(`   Found ${users.length} users`);
    for (const user of users) {
      await turso.execute({
        sql: `INSERT INTO users (id, email, password, username, role, score, discoveredClues, suspicions, finalAccusation, createdAt, updatedAt)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          String((user as any)._id),
          user.email,
          user.password,
          user.username,
          user.role,
          user.score,
          JSON.stringify(user.discoveredClues || []),
          JSON.stringify(user.suspicions || []),
          user.finalAccusation ? JSON.stringify(user.finalAccusation) : null,
          (user as any).createdAt?.toISOString() || new Date().toISOString(),
          (user as any).updatedAt?.toISOString() || new Date().toISOString(),
        ],
      });
    }
    console.log(`✅ Migrated ${users.length} users\n`);

    // Migrate GameStates
    console.log('🔄 Migrating GameStates...');
    const gameStates = await GameState.find({}).lean();
    console.log(`   Found ${gameStates.length} game states`);
    for (const gs of gameStates) {
      await turso.execute({
        sql: `INSERT INTO game_states (id, isRunning, timeRemaining, startTime, pausedAt, updatedAt)
              VALUES (?, ?, ?, ?, ?, ?)`,
        args: [
          String((gs as any)._id),
          gs.isRunning ? 1 : 0,
          gs.timeRemaining,
          (gs as any).startTime?.toISOString() || null,
          (gs as any).pausedAt?.toISOString() || null,
          (gs as any).updatedAt?.toISOString() || new Date().toISOString(),
        ],
      });
    }
    console.log(`✅ Migrated ${gameStates.length} game states\n`);

    // Migrate Notifications
    console.log('🔄 Migrating Notifications...');
    const notifications = await Notification.find({}).lean();
    console.log(`   Found ${notifications.length} notifications`);
    for (const notif of notifications) {
      await turso.execute({
        sql: `INSERT INTO notifications (id, message, type, isActive, createdAt)
              VALUES (?, ?, ?, ?, ?)`,
        args: [
          String((notif as any)._id),
          notif.message,
          notif.type,
          notif.isActive ? 1 : 0,
          (notif as any).createdAt?.toISOString() || new Date().toISOString(),
        ],
      });
    }
    console.log(`✅ Migrated ${notifications.length} notifications\n`);

    // Migrate Messages
    console.log('🔄 Migrating Messages...');
    const messages = await Message.find({}).lean();
    console.log(`   Found ${messages.length} messages`);
    for (const msg of messages) {
      await turso.execute({
        sql: `INSERT INTO messages (id, userId, username, content, isValidated, validatedBy, validatedAt, pointsAwarded, createdAt)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          String((msg as any)._id),
          msg.userId,
          msg.username,
          msg.content,
          msg.isValidated ? 1 : 0,
          msg.validatedBy || null,
          (msg as any).validatedAt?.toISOString() || null,
          msg.pointsAwarded,
          (msg as any).createdAt?.toISOString() || new Date().toISOString(),
        ],
      });
    }
    console.log(`✅ Migrated ${messages.length} messages\n`);

    console.log('🎉 Migration completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - Characters: ${characters.length}`);
    console.log(`   - Clues: ${clues.length}`);
    console.log(`   - Personnages: ${personnages.length}`);
    console.log(`   - Users: ${users.length}`);
    console.log(`   - Game States: ${gameStates.length}`);
    console.log(`   - Notifications: ${notifications.length}`);
    console.log(`   - Messages: ${messages.length}`);

    await mongoose.disconnect();
    console.log('\n✅ Disconnected from MongoDB');
  } catch (error: any) {
    console.error('❌ Migration error:', error.message);
    console.error(error);
    throw error;
  }
}

migrate();
