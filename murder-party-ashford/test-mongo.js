const mongoose = require('mongoose');
const dns = require('dns').promises;

// Forcer l'utilisation de Google DNS
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://kikidesurgeres_db_user:kgHNPebMlyuYuy9S@cluster0.vzdozua.mongodb.net/murder-party?retryWrites=true&w=majority&appName=Cluster0';

async function testConnection() {
  console.log('🧪 Test de connexion MongoDB Atlas\n');

  // Vérifier les DNS configurés
  console.log('🔧 Serveurs DNS utilisés:', dns.getServers());

  // Test 1: DNS Resolution
  console.log('\n1️⃣ Test de résolution DNS...');
  try {
    const addresses = await dns.resolve4('cluster0.vzdozua.mongodb.net');
    console.log('   ✅ DNS OK - Adresses IP:', addresses.join(', '));
  } catch (error) {
    console.log('   ❌ Échec DNS:', error.message);
    console.log('   💡 Votre FAI ou pare-feu bloque les requêtes DNS vers mongodb.net');

    // Tester avec Google DNS directement
    console.log('\n   🔄 Tentative avec Google DNS...');
    const { Resolver } = require('dns').promises;
    const resolver = new Resolver();
    resolver.setServers(['8.8.8.8']);
    try {
      const addresses = await resolver.resolve4('cluster0.vzdozua.mongodb.net');
      console.log('   ✅ Google DNS fonctionne! Adresses:', addresses.join(', '));
    } catch (err) {
      console.log('   ❌ Même avec Google DNS:', err.message);
      return;
    }
  }

  // Test 2: MongoDB Connection
  console.log('\n2️⃣ Test de connexion MongoDB...');
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 15000,
      connectTimeoutMS: 15000,
    });
    console.log('   ✅ Connexion réussie!');
    console.log('   📊 Base de données:', mongoose.connection.name);
    console.log('   🏠 Host:', mongoose.connection.host);
    await mongoose.disconnect();
    console.log('   ✅ Déconnexion propre\n');
    console.log('🎉 Tout fonctionne correctement!');
  } catch (error) {
    console.log('   ❌ Échec:', error.message);
    console.log('\n🔍 Diagnostic:');
    if (error.message.includes('IP') || error.message.includes('whitelist')) {
      console.log('   - Problème d\'IP whitelist dans MongoDB Atlas');
    } else if (error.message.includes('authentication')) {
      console.log('   - Problème d\'authentification (username/password)');
    } else if (error.message.includes('ENOTFOUND') || error.message.includes('Could not connect')) {
      console.log('   - Problème réseau/pare-feu/DNS');
      console.log('   - Votre connexion internet bloque probablement MongoDB Atlas');
    }
  }
}

testConnection();
