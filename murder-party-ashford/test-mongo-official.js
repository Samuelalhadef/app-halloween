const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const uri = process.env.MONGODB_URI || "mongodb+srv://samuel:SdVBJM5XUBmEfn@cluster0.vzdozua.mongodb.net/murder-party?retryWrites=true&w=majority&appName=Cluster0";

console.log('🧪 Test de connexion MongoDB Atlas (Driver Officiel)\n');
console.log('📍 URI:', uri.replace(/:[^:@]+@/, ':****@')); // Masque le mot de passe

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  serverSelectionTimeoutMS: 15000,
  connectTimeoutMS: 15000,
});

async function run() {
  try {
    console.log('\n🔄 Connexion en cours...');

    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    console.log('✅ Connexion établie!\n');

    // Send a ping to confirm a successful connection
    console.log('📡 Envoi d\'un ping...');
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Pinged your deployment. You successfully connected to MongoDB!\n");

    // Informations supplémentaires
    const db = client.db("murder-party");
    console.log('📊 Base de données:', db.databaseName);

    // Lister les collections
    const collections = await db.listCollections().toArray();
    console.log('📁 Collections:', collections.length > 0 ? collections.map(c => c.name).join(', ') : '(aucune collection)');

    console.log('\n🎉 Tout fonctionne correctement!');

  } catch (error) {
    console.error('\n❌ Erreur de connexion:', error.message);
    console.error('Code:', error.code || 'N/A');

    console.log('\n🔍 Diagnostic:');
    if (error.message.includes('ENOTFOUND') || error.message.includes('EAI_AGAIN')) {
      console.log('   ⚠️  Problème DNS - Le cluster n\'est pas trouvé');
      console.log('   💡 Vérifiez que le cluster existe et est actif dans MongoDB Atlas');
    } else if (error.message.includes('authentication')) {
      console.log('   ⚠️  Problème d\'authentification');
      console.log('   💡 Vérifiez username et password dans .env.local');
    } else if (error.message.includes('IP') || error.message.includes('not allowed')) {
      console.log('   ⚠️  Problème d\'IP whitelist');
      console.log('   💡 Ajoutez votre IP dans Network Access (MongoDB Atlas)');
    }

    process.exit(1);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
    console.log('\n🔌 Connexion fermée');
  }
}

run().catch(console.dir);
