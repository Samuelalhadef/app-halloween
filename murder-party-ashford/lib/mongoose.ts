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
      serverSelectionTimeoutMS: 30000, // Timeout de 30 secondes
      connectTimeoutMS: 30000,
      socketTimeoutMS: 30000,
      maxPoolSize: 10,
      minPoolSize: 1,
      retryWrites: true,
      retryReads: true,
    };

    console.log('🔄 Tentative de connexion à MongoDB...');
    console.log('📍 URI:', MONGODB_URI.replace(/:[^:@]+@/, ':****@')); // Masque le mot de passe

    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('✅ Connexion MongoDB/Mongoose réussie');
        console.log('📊 Base de données:', mongoose.connection.name);
        return mongoose;
      })
      .catch((error) => {
        console.error('❌ Erreur de connexion MongoDB/Mongoose:', error.message);
        console.error('Code d\'erreur:', error.code || 'N/A');
        console.error('💡 Vérifiez:');
        console.error('  1. Network Access dans MongoDB Atlas (IP whitelist)');
        console.error('  2. Identifiants de connexion (username/password)');
        console.error('  3. Nom du cluster et de la base de données');
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
