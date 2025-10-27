import mongoose from 'mongoose';
import User from '../models/User';
import dotenv from 'dotenv';
import path from 'path';

// Charger les variables d'environnement
dotenv.config({ path: path.join(__dirname, '../.env.local') });

async function createAdmin() {
  try {
    // Connexion à MongoDB
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI non défini dans .env.local');
    }

    console.log('Connexion à MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connecté à MongoDB');

    // Vérifier si l'admin existe déjà
    const existingAdmin = await User.findOne({ username: 'admin' });
    if (existingAdmin) {
      console.log('⚠️  Un utilisateur admin existe déjà');
      console.log('Username:', existingAdmin.username);
      console.log('Email:', existingAdmin.email);
      console.log('Role:', existingAdmin.role);

      // Mettre à jour le rôle si nécessaire
      if (existingAdmin.role !== 'admin') {
        existingAdmin.role = 'admin';
        await existingAdmin.save();
        console.log('✅ Rôle mis à jour en admin');
      }

      await mongoose.disconnect();
      return;
    }

    // Créer l'utilisateur admin
    console.log('\nCréation du compte admin...');
    const admin = await User.create({
      email: 'admin@admin.com',
      username: 'admin',
      password: 'adminadmin', // Sera hashé automatiquement par le pre-save hook (min 6 caractères requis)
      role: 'admin',
      score: 0,
      discoveredClues: [],
      suspicions: [],
    });

    console.log('✅ Compte admin créé avec succès !');
    console.log('\n📋 Informations de connexion:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Email:    admin@admin.com');
    console.log('Username: admin');
    console.log('Password: adminadmin');
    console.log('Role:     admin');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Déconnexion
    await mongoose.disconnect();
    console.log('✅ Déconnecté de MongoDB');

  } catch (error: any) {
    console.error('❌ Erreur lors de la création du compte admin:', error.message);
    process.exit(1);
  }
}

createAdmin();
