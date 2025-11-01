/**
 * Script pour ajouter Frau Greta Muller
 * Usage: npx tsx scripts/add-greta-muller.ts
 */

import dotenv from 'dotenv';
import { resolve } from 'path';

// Charger .env.local
dotenv.config({ path: resolve(__dirname, '../.env.local') });

// Import du repository après avoir chargé les variables d'environnement
import { userRepository } from '../lib/db/user';

async function addGretaMuller() {
  try {
    console.log('\n🎭 Murder Party Ashford - Ajout de Frau Greta Muller\n');

    const userData = {
      username: 'greta',
      email: 'greta@muller.com',
      password: 'ashford1925',
      role: 'player' as const,
    };

    // Vérifier si l'utilisateur existe déjà
    const existingByEmail = await userRepository.findOne({ email: userData.email });
    if (existingByEmail) {
      console.log('⏭️  Utilisateur déjà existant (email)');
      process.exit(0);
    }

    const existingByUsername = await userRepository.findOne({ username: userData.username });
    if (existingByUsername) {
      console.log('⏭️  Utilisateur déjà existant (username)');
      process.exit(0);
    }

    // Créer l'utilisateur
    console.log('📝 Création de l\'utilisateur...');
    const user = await userRepository.create(userData);

    console.log('✅ Utilisateur créé avec succès!\n');
    console.log('📋 Détails:');
    console.log(`   ID: ${user.id}`);
    console.log(`   Identifiant: ${user.username}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Mot de passe: ${userData.password}`);
    console.log(`   Rôle: ${user.role}`);
    console.log('\n🎉 Frau Greta Muller peut maintenant se connecter!\n');

    process.exit(0);
  } catch (error: any) {
    console.error('❌ Erreur:', error.message);
    console.error(error);
    process.exit(1);
  }
}

addGretaMuller();
