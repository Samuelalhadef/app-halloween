import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

const MONGODB_URI: string = process.env.MONGODB_URI;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000, // Timeout de 10 secondes
      connectTimeoutMS: 10000,
      socketTimeoutMS: 10000,
    };

    console.log('🔄 Tentative de connexion à MongoDB...');

    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('✅ Connexion MongoDB/Mongoose réussie');
        return mongoose;
      })
      .catch((error) => {
        console.error('❌ Erreur de connexion MongoDB/Mongoose:', error.message);
        console.error('Code d\'erreur:', error.code || 'N/A');
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e: any) {
    cached.promise = null;
    console.error('❌ Échec de connexion à MongoDB:', e.message);
    throw e;
  }

  return cached.conn;
}

export default connectDB;
