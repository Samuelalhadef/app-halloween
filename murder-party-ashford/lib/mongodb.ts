import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

const uri = process.env.MONGODB_URI;
const options = {
  serverSelectionTimeoutMS: 10000, // Timeout de 10 secondes au lieu de 53s
  connectTimeoutMS: 10000,
  socketTimeoutMS: 10000,
  maxPoolSize: 10,
  minPoolSize: 2,
  retryWrites: true,
  retryReads: true,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === 'development') {
  // En développement, utiliser une variable globale pour conserver la connexion
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect()
      .then((client) => {
        console.log('✅ Connexion MongoDB réussie');
        return client;
      })
      .catch((error) => {
        console.error('❌ Erreur de connexion MongoDB:', error.message);
        console.error('Détails:', {
          code: error.code,
          name: error.name,
        });
        throw error;
      });
  }
  clientPromise = global._mongoClientPromise;
} else {
  // En production, créer une nouvelle connexion
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
