/**
 * Script pour créer des utilisateurs manuellement
 * Usage: npx tsx scripts/create-user.ts
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

async function createUser() {
  try {
    console.log('\n🎭 Murder Party Ashford - Création d\'utilisateur\n');

    // Connexion à MongoDB
    console.log('📡 Connexion à MongoDB...');
    await connectDB();
    console.log('✅ Connecté à MongoDB\n');

    // Récupérer les informations
    const username = await question('Identifiant: ');
    const email = await question('Email: ');
    const password = await question('Mot de passe: ');
    const roleInput = await question('Rôle (player/gamemaster) [player]: ');
    const role = roleInput.trim() || 'player';

    // Validation
    if (!username || username.length < 3) {
      console.error('❌ L\'identifiant doit contenir au moins 3 caractères');
      rl.close();
      process.exit(1);
    }

    if (!email || !email.match(/^\S+@\S+\.\S+$/)) {
      console.error('❌ Email invalide');
      rl.close();
      process.exit(1);
    }

    if (!password || password.length < 6) {
      console.error('❌ Le mot de passe doit contenir au moins 6 caractères');
      rl.close();
      process.exit(1);
    }

    if (!['player', 'gamemaster'].includes(role)) {
      console.error('❌ Le rôle doit être "player" ou "gamemaster"');
      rl.close();
      process.exit(1);
    }

    // Vérifier si l'utilisateur existe déjà
    const existingEmail = await User.findOne({ email: email.toLowerCase() });
    if (existingEmail) {
      console.error('❌ Cet email est déjà utilisé');
      rl.close();
      process.exit(1);
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      console.error('❌ Cet identifiant est déjà utilisé');
      rl.close();
      process.exit(1);
    }

    // Créer l'utilisateur
    console.log('\n📝 Création de l\'utilisateur...');
    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password,
      role,
    });

    console.log('✅ Utilisateur créé avec succès!\n');
    console.log('📋 Détails:');
    console.log(`   ID: ${user._id}`);
    console.log(`   Identifiant: ${user.username}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Rôle: ${user.role}`);
    console.log('\n🎉 L\'utilisateur peut maintenant se connecter!\n');

    rl.close();
    process.exit(0);
  } catch (error: any) {
    console.error('❌ Erreur:', error.message);
    rl.close();
    process.exit(1);
  }
}

createUser();
