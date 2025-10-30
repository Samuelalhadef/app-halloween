import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function testConnection() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('❌ MONGODB_URI not found in .env.local');
    return;
  }

  console.log('🔄 Testing MongoDB connection...');
  console.log('📍 URI:', uri.replace(/:[^:@]+@/, ':****@'));

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const admin = client.db().admin();
    const dbs = await admin.listDatabases();

    console.log('\n📦 Available databases:');
    dbs.databases.forEach((db: any) => {
      console.log(`   - ${db.name} (${(db.sizeOnDisk / 1024 / 1024).toFixed(2)} MB)`);
    });

    // Check the default database
    const db = client.db();
    console.log(`\n📊 Using database: ${db.databaseName}`);

    const collections = await db.listCollections().toArray();
    console.log(`\n📚 Collections in ${db.databaseName}:`);
    for (const coll of collections) {
      const count = await db.collection(coll.name).countDocuments();
      console.log(`   - ${coll.name}: ${count} documents`);
    }

    await client.close();
    console.log('\n✅ Connection closed');
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    console.error('\n💡 Check:');
    console.error('  1. Network Access in MongoDB Atlas (IP whitelist)');
    console.error('  2. Database User credentials');
    console.error('  3. Database name in connection string');
  }
}

testConnection();
