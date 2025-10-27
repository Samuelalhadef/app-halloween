/**
 * Script pour supprimer un utilisateur
 * Usage: npx tsx scripts/delete-user.ts
 */

import 'dotenv/config';
import connectDB from '../lib/mongoose';
import User from '../models/User';
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function deleteUser() {
  try {
    console.log('\n🎭 Murder Party Ashford - Suppression d\'utilisateur\n');

    // Connexion à MongoDB
    console.log('📡 Connexion à MongoDB...');
    await connectDB();
    console.log('✅ Connecté à MongoDB\n');

    // Lister les utilisateurs
    const users = await User.find({}).select('username email');

    if (users.length === 0) {
      console.log('⚠️  Aucun utilisateur trouvé\n');
      rl.close();
      process.exit(0);
    }

    console.log('📋 Utilisateurs existants:\n');
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.username} (${user.email})`);
    });

    console.log('');
    const identifier = await question('Identifiant ou email de l\'utilisateur à supprimer: ');

    // Chercher l'utilisateur
    const user = await User.findOne({
      $or: [
        { email: identifier.toLowerCase() },
        { username: identifier }
      ]
    });

    if (!user) {
      console.error('❌ Utilisateur non trouvé');
      rl.close();
      process.exit(1);
    }

    // Confirmation
    const confirm = await question(`⚠️  Êtes-vous sûr de vouloir supprimer "${user.username}" ? (oui/non): `);

    if (confirm.toLowerCase() !== 'oui') {
      console.log('❌ Suppression annulée');
      rl.close();
      process.exit(0);
    }

    // Supprimer l'utilisateur
    await User.deleteOne({ _id: user._id });

    console.log(`✅ Utilisateur "${user.username}" supprimé avec succès!\n`);

    rl.close();
    process.exit(0);
  } catch (error: any) {
    console.error('❌ Erreur:', error.message);
    rl.close();
    process.exit(1);
  }
}

deleteUser();
