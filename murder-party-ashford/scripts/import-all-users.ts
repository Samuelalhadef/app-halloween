/**
 * Script pour importer tous les personnages de la murder party
 * Usage: npm run user:import
 */

import dotenv from 'dotenv';
import { resolve } from 'path';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Charger .env.local AVANT tout
dotenv.config({ path: resolve(__dirname, '../.env.local') });

// Vérifier que la variable d'environnement est chargée
if (!process.env.MONGODB_URI) {
  console.error('❌ MONGODB_URI non trouvé dans .env.local');
  process.exit(1);
}

// Import des modèles après avoir chargé les variables d'environnement
import User from '../models/User';

const users = [
  // FAMILLE ASHFORD (5)
  {
    username: 'catherine',
    email: 'catherine@ashford.com',
    password: 'ashford1925',
    role: 'player',
    description: 'Lady Catherine Ashford - L\'épouse naïve'
  },
  {
    username: 'thomas',
    email: 'thomas@ashford.com',
    password: 'ashford1925',
    role: 'player',
    description: 'Thomas Ashford - Le fils amoureux / complice involontaire'
  },
  {
    username: 'sebastian',
    email: 'sebastian@ashford.com',
    password: 'ashford1925',
    role: 'player',
    description: 'Sebastian Ashford - Le fils flambeur (fausse piste héritage)'
  },
  {
    username: 'helena',
    email: 'helena@ashford.com',
    password: 'ashford1925',
    role: 'player',
    description: 'Helena Ashford - La sœur héritière (fausse piste héritage)'
  },
  {
    username: 'penelope',
    email: 'penelope@pemberton.com',
    password: 'pemberton25',
    role: 'player',
    description: 'Penelope Pemberton - La fiancée prétentieuse de Thomas'
  },

  // TRIO MEURTRIER (2 nouveaux - Thomas déjà créé)
  {
    username: 'margaret',
    email: 'margaret@ashford-staff.com',
    password: 'cuisiniere25',
    role: 'player',
    description: 'Margaret Walsh - La cuisinière / MEURTRIÈRE 🔪'
  },
  {
    username: 'albert',
    email: 'albert@ashford-staff.com',
    password: 'majordome25',
    role: 'player',
    description: 'Albert Whitmore - Le majordome / complice (a acheté le poison)'
  },

  // DOMESTIQUES (7)
  {
    username: 'rose',
    email: 'rose@ashford-staff.com',
    password: 'bennett1925',
    role: 'player',
    description: 'Rose Bennett - Aide-cuisinière, a vu Thomas et Margaret ensemble'
  },
  {
    username: 'emily',
    email: 'emily@ashford-staff.com',
    password: 'clarke1925',
    role: 'player',
    description: 'Emily Clarke - Femme de chambre de Penelope, sabote le mariage'
  },
  {
    username: 'harold',
    email: 'harold@ashford-staff.com',
    password: 'graves1925',
    role: 'player',
    description: 'Harold Graves - Vieux valet, possède LA LETTRE 📜'
  },
  {
    username: 'george',
    email: 'george@ashford-staff.com',
    password: 'thornton25',
    role: 'player',
    description: 'George Thornton - Jardinier, a vu Margaret rôder'
  },
  {
    username: 'beatrice',
    email: 'beatrice@ashford-staff.com',
    password: 'harlow1925',
    role: 'player',
    description: 'Mrs. Beatrice Harlow - Gouvernante, a trouvé Ashford bizarre'
  },
  {
    username: 'lucy',
    email: 'lucy@ashford-staff.com',
    password: 'morrison25',
    role: 'player',
    description: 'Lucy Morrison - Femme de chambre, bavarde'
  },
  {
    username: 'james',
    email: 'james@ashford-staff.com',
    password: 'crawford25',
    role: 'player',
    description: 'James Crawford - Serveur engagé pour la soirée'
  },

  // INVITÉS - Couple Pemberton (2)
  {
    username: 'charles',
    email: 'charles@pemberton.com',
    password: 'pemberton25',
    role: 'player',
    description: 'Charles Pemberton - Ami du golf, mari de Victoria'
  },
  {
    username: 'victoria',
    email: 'victoria@pemberton.com',
    password: 'pemberton25',
    role: 'player',
    description: 'Victoria Pemberton - Victime de chantage sexuel (FAUSSE PISTE)'
  },

  // INVITÉS - Amis/Relations (10)
  {
    username: 'oliver',
    email: 'oliver@blackwood.com',
    password: 'blackwood25',
    role: 'player',
    description: 'Oliver Blackwood - Meilleur ami de Thomas'
  },
  {
    username: 'arthur',
    email: 'arthur@finch.com',
    password: 'finch1925',
    role: 'player',
    description: 'Dr. Arthur Finch - Médecin ivre, faux diagnostic'
  },
  {
    username: 'silas',
    email: 'silas@thorne.com',
    password: 'thorne1925',
    role: 'player',
    description: 'Silas Thorne - Apothicaire, a vendu le produit à Albert'
  },
  {
    username: 'reginald',
    email: 'reginald@worthington.com',
    password: 'worthing25',
    role: 'player',
    description: 'Lord Reginald Worthington - Rival en affaires (FAUSSE PISTE)'
  },
  {
    username: 'isabelle',
    email: 'isabelle@worthington.com',
    password: 'worthing25',
    role: 'player',
    description: 'Lady Isabelle Worthington - Son épouse, commère'
  },
  {
    username: 'jonathan',
    email: 'jonathan@price.com',
    password: 'price1925',
    role: 'player',
    description: 'Mr. Jonathan Price - Associé d\'affaires, entreprise endettée'
  },
  {
    username: 'eleanor',
    email: 'eleanor@price.com',
    password: 'price1925',
    role: 'player',
    description: 'Mrs. Eleanor Price - Son épouse, amie de Catherine'
  },
  {
    username: 'violet',
    email: 'violet@ashcroft.com',
    password: 'ashcroft25',
    role: 'player',
    description: 'Miss Violet Ashcroft - Ex-fiancée de Sebastian, amère'
  },
  {
    username: 'gregory',
    email: 'gregory@ashcroft.com',
    password: 'ashcroft25',
    role: 'player',
    description: 'Mr. Gregory Ashcroft - Père de Violet, ruiné par Sebastian'
  },
  {
    username: 'constance',
    email: 'constance@fairfax.com',
    password: 'fairfax1925',
    role: 'player',
    description: 'Lady Constance Fairfax - Amie d\'enfance de Catherine'
  }
];

async function importAllUsers() {
  try {
    console.log('\n🎭 Murder Party Ashford - Importation de tous les personnages\n');

    // Connexion à MongoDB
    console.log('📡 Connexion à MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('✅ Connecté à MongoDB\n');

    let created = 0;
    let skipped = 0;
    let errors = 0;

    console.log(`📝 Importation de ${users.length} personnages...\n`);

    for (const userData of users) {
      try {
        // Vérifier si l'utilisateur existe déjà
        const existing = await User.findOne({
          $or: [
            { email: userData.email.toLowerCase() },
            { username: userData.username }
          ]
        });

        if (existing) {
          console.log(`⏭️  ${userData.username} - Déjà existant (ignoré)`);
          skipped++;
          continue;
        }

        // Créer l'utilisateur
        await User.create({
          username: userData.username,
          email: userData.email.toLowerCase(),
          password: userData.password,
          role: userData.role as 'player' | 'gamemaster',
        });

        console.log(`✅ ${userData.username} - ${userData.description}`);
        created++;

      } catch (error: any) {
        console.error(`❌ ${userData.username} - Erreur: ${error.message}`);
        errors++;
      }
    }

    console.log('\n📊 RÉSUMÉ:');
    console.log(`   ✅ Créés: ${created}`);
    console.log(`   ⏭️  Ignorés (déjà existants): ${skipped}`);
    console.log(`   ❌ Erreurs: ${errors}`);
    console.log(`   📋 Total: ${users.length}`);

    if (created > 0) {
      console.log('\n🎉 Importation terminée avec succès!');
      console.log('\n💡 Prochaines étapes:');
      console.log('   1. Lancez l\'application: npm run dev');
      console.log('   2. Testez la connexion avec un personnage');
      console.log('   3. Consultez IDENTIFIANTS-PERSONNAGES.md pour tous les identifiants');
    }

    await mongoose.disconnect();
    console.log('');
    process.exit(0);

  } catch (error: any) {
    console.error('\n❌ Erreur fatale:', error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
}

importAllUsers();
