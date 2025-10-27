/**
 * Script pour lister tous les utilisateurs
 * Usage: npx tsx scripts/list-users.ts
 */

import 'dotenv/config';
import connectDB from '../lib/mongoose';
import User from '../models/User';

async function listUsers() {
  try {
    console.log('\n🎭 Murder Party Ashford - Liste des utilisateurs\n');

    // Connexion à MongoDB
    console.log('📡 Connexion à MongoDB...');
    await connectDB();
    console.log('✅ Connecté à MongoDB\n');

    // Récupérer tous les utilisateurs
    const users = await User.find({}).select('-password');

    if (users.length === 0) {
      console.log('⚠️  Aucun utilisateur trouvé\n');
      process.exit(0);
    }

    console.log(`📋 ${users.length} utilisateur(s) trouvé(s):\n`);

    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.username}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Rôle: ${user.role}`);
      console.log(`   Indices découverts: ${user.discoveredClues.length}`);
      console.log(`   Créé le: ${user.createdAt?.toLocaleDateString('fr-FR')}`);
      console.log('');
    });

    process.exit(0);
  } catch (error: any) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
}

listUsers();
