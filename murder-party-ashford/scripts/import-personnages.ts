/**
 * Script pour importer tous les personnages dans la table 'personage'
 * Usage: npm run personnage:import
 */

import dotenv from 'dotenv';
import { resolve } from 'path';
import mongoose from 'mongoose';

// Charger .env.local AVANT tout
dotenv.config({ path: resolve(__dirname, '../.env.local') });

// Vérifier que la variable d'environnement est chargée
if (!process.env.MONGODB_URI) {
  console.error('❌ MONGODB_URI non trouvé dans .env.local');
  process.exit(1);
}

// Définir le schéma Personnage directement ici
interface IPersonnage {
  nom: string;
  prenom: string;
  identifiant: string;
  motDePasse: string;
  email: string;
  role: string;
  categorie: 'victime' | 'famille' | 'meurtrier' | 'domestique' | 'invite';
  createdAt?: Date;
  updatedAt?: Date;
}

const PersonnageSchema = new mongoose.Schema<IPersonnage>(
  {
    nom: {
      type: String,
      required: [true, 'Le nom est requis'],
      trim: true,
    },
    prenom: {
      type: String,
      required: [true, 'Le prénom est requis'],
      trim: true,
    },
    identifiant: {
      type: String,
      required: [true, 'L\'identifiant est requis'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    motDePasse: {
      type: String,
      required: [true, 'Le mot de passe est requis'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'L\'email est requis'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Email invalide'],
    },
    role: {
      type: String,
      required: [true, 'Le rôle est requis'],
      trim: true,
    },
    categorie: {
      type: String,
      enum: ['victime', 'famille', 'meurtrier', 'domestique', 'invite'],
      required: [true, 'La catégorie est requise'],
    },
  },
  {
    timestamps: true,
  }
);

const Personnage = mongoose.models.Personnage || mongoose.model<IPersonnage>('Personnage', PersonnageSchema);

const personnages = [
  // FAMILLE ASHFORD (5)
  {
    nom: 'Ashford',
    prenom: 'Catherine',
    identifiant: 'catherine',
    motDePasse: 'ashford1925',
    email: 'catherine@ashford.com',
    role: 'L\'épouse naïve',
    categorie: 'famille' as const
  },
  {
    nom: 'Ashford',
    prenom: 'Thomas',
    identifiant: 'thomas',
    motDePasse: 'ashford1925',
    email: 'thomas@ashford.com',
    role: 'Le fils amoureux / complice involontaire',
    categorie: 'meurtrier' as const
  },
  {
    nom: 'Ashford',
    prenom: 'Sebastian',
    identifiant: 'sebastian',
    motDePasse: 'ashford1925',
    email: 'sebastian@ashford.com',
    role: 'Le fils flambeur',
    categorie: 'famille' as const
  },
  {
    nom: 'Ashford',
    prenom: 'Helena',
    identifiant: 'helena',
    motDePasse: 'ashford1925',
    email: 'helena@ashford.com',
    role: 'La sœur héritière',
    categorie: 'famille' as const
  },
  {
    nom: 'Pemberton',
    prenom: 'Penelope',
    identifiant: 'penelope',
    motDePasse: 'pemberton25',
    email: 'penelope@pemberton.com',
    role: 'La fiancée prétentieuse',
    categorie: 'famille' as const
  },

  // TRIO MEURTRIER (3)
  {
    nom: 'Walsh',
    prenom: 'Margaret',
    identifiant: 'margaret',
    motDePasse: 'cuisiniere25',
    email: 'margaret@ashford-staff.com',
    role: 'MEURTRIÈRE - Cuisinière',
    categorie: 'meurtrier' as const
  },
  {
    nom: 'Whitmore',
    prenom: 'Albert',
    identifiant: 'albert',
    motDePasse: 'majordome25',
    email: 'albert@ashford-staff.com',
    role: 'Complice - Majordome (a acheté le poison)',
    categorie: 'meurtrier' as const
  },

  // DOMESTIQUES (7)
  {
    nom: 'Bennett',
    prenom: 'Rose',
    identifiant: 'rose',
    motDePasse: 'bennett1925',
    email: 'rose@ashford-staff.com',
    role: 'Aide-cuisinière',
    categorie: 'domestique' as const
  },
  {
    nom: 'Clarke',
    prenom: 'Emily',
    identifiant: 'emily',
    motDePasse: 'clarke1925',
    email: 'emily@ashford-staff.com',
    role: 'Femme de chambre',
    categorie: 'domestique' as const
  },
  {
    nom: 'Graves',
    prenom: 'Harold',
    identifiant: 'harold',
    motDePasse: 'graves1925',
    email: 'harold@ashford-staff.com',
    role: 'Vieux valet (possède LA LETTRE)',
    categorie: 'domestique' as const
  },
  {
    nom: 'Thornton',
    prenom: 'George',
    identifiant: 'george',
    motDePasse: 'thornton25',
    email: 'george@ashford-staff.com',
    role: 'Jardinier',
    categorie: 'domestique' as const
  },
  {
    nom: 'Harlow',
    prenom: 'Beatrice',
    identifiant: 'beatrice',
    motDePasse: 'harlow1925',
    email: 'beatrice@ashford-staff.com',
    role: 'Gouvernante',
    categorie: 'domestique' as const
  },
  {
    nom: 'Morrison',
    prenom: 'Lucy',
    identifiant: 'lucy',
    motDePasse: 'morrison25',
    email: 'lucy@ashford-staff.com',
    role: 'Femme de chambre',
    categorie: 'domestique' as const
  },
  {
    nom: 'Crawford',
    prenom: 'James',
    identifiant: 'james',
    motDePasse: 'crawford25',
    email: 'james@ashford-staff.com',
    role: 'Serveur',
    categorie: 'domestique' as const
  },

  // INVITÉS - Couple Pemberton (2)
  {
    nom: 'Pemberton',
    prenom: 'Charles',
    identifiant: 'charles',
    motDePasse: 'pemberton25',
    email: 'charles@pemberton.com',
    role: 'Ami du golf',
    categorie: 'invite' as const
  },
  {
    nom: 'Pemberton',
    prenom: 'Victoria',
    identifiant: 'victoria',
    motDePasse: 'pemberton25',
    email: 'victoria@pemberton.com',
    role: 'Victime de chantage',
    categorie: 'invite' as const
  },

  // INVITÉS - Amis/Relations (10)
  {
    nom: 'Blackwood',
    prenom: 'Oliver',
    identifiant: 'oliver',
    motDePasse: 'blackwood25',
    email: 'oliver@blackwood.com',
    role: 'Meilleur ami de Thomas',
    categorie: 'invite' as const
  },
  {
    nom: 'Finch',
    prenom: 'Arthur',
    identifiant: 'arthur',
    motDePasse: 'finch1925',
    email: 'arthur@finch.com',
    role: 'Médecin ivre',
    categorie: 'invite' as const
  },
  {
    nom: 'Thorne',
    prenom: 'Silas',
    identifiant: 'silas',
    motDePasse: 'thorne1925',
    email: 'silas@thorne.com',
    role: 'Apothicaire',
    categorie: 'invite' as const
  },
  {
    nom: 'Worthington',
    prenom: 'Reginald',
    identifiant: 'reginald',
    motDePasse: 'worthing25',
    email: 'reginald@worthington.com',
    role: 'Rival en affaires',
    categorie: 'invite' as const
  },
  {
    nom: 'Worthington',
    prenom: 'Isabelle',
    identifiant: 'isabelle',
    motDePasse: 'worthing25',
    email: 'isabelle@worthington.com',
    role: 'Commère',
    categorie: 'invite' as const
  },
  {
    nom: 'Price',
    prenom: 'Jonathan',
    identifiant: 'jonathan',
    motDePasse: 'price1925',
    email: 'jonathan@price.com',
    role: 'Associé d\'affaires',
    categorie: 'invite' as const
  },
  {
    nom: 'Price',
    prenom: 'Eleanor',
    identifiant: 'eleanor',
    motDePasse: 'price1925',
    email: 'eleanor@price.com',
    role: 'Amie de Catherine',
    categorie: 'invite' as const
  },
  {
    nom: 'Ashcroft',
    prenom: 'Violet',
    identifiant: 'violet',
    motDePasse: 'ashcroft25',
    email: 'violet@ashcroft.com',
    role: 'Ex-fiancée de Sebastian',
    categorie: 'invite' as const
  },
  {
    nom: 'Ashcroft',
    prenom: 'Gregory',
    identifiant: 'gregory',
    motDePasse: 'ashcroft25',
    email: 'gregory@ashcroft.com',
    role: 'Père de Violet',
    categorie: 'invite' as const
  },
  {
    nom: 'Fairfax',
    prenom: 'Constance',
    identifiant: 'constance',
    motDePasse: 'fairfax1925',
    email: 'constance@fairfax.com',
    role: 'Amie d\'enfance de Catherine',
    categorie: 'invite' as const
  }
];

async function importPersonnages() {
  try {
    console.log('\n🎭 Murder Party Ashford - Importation des personnages\n');

    // Connexion à MongoDB
    console.log('📡 Connexion à MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('✅ Connecté à MongoDB (Cluster0)\n');

    let created = 0;
    let skipped = 0;
    let errors = 0;

    console.log(`📝 Importation de ${personnages.length} personnages dans la table 'personage'...\n`);

    for (const personnageData of personnages) {
      try {
        // Vérifier si le personnage existe déjà
        const existing = await Personnage.findOne({
          $or: [
            { email: personnageData.email.toLowerCase() },
            { identifiant: personnageData.identifiant }
          ]
        });

        if (existing) {
          console.log(`⏭️  ${personnageData.prenom} ${personnageData.nom} - Déjà existant (ignoré)`);
          skipped++;
          continue;
        }

        // Créer le personnage
        await Personnage.create(personnageData);

        console.log(`✅ ${personnageData.prenom} ${personnageData.nom} - ${personnageData.role}`);
        created++;

      } catch (error: any) {
        console.error(`❌ ${personnageData.prenom} ${personnageData.nom} - Erreur: ${error.message}`);
        errors++;
      }
    }

    console.log('\n📊 RÉSUMÉ DE L\'IMPORTATION:');
    console.log(`   ✅ Créés: ${created}`);
    console.log(`   ⏭️  Ignorés (déjà existants): ${skipped}`);
    console.log(`   ❌ Erreurs: ${errors}`);
    console.log(`   📋 Total: ${personnages.length}`);

    if (created > 0) {
      console.log('\n🎉 Importation terminée avec succès!');
      console.log('\n💡 La table "personnages" a été créée dans Cluster0 avec les données suivantes:');
      console.log('   - Nom, Prénom, Identifiant, Mot de passe, Email, Rôle, Catégorie');
      console.log('\n📝 Pour créer les comptes utilisateurs correspondants:');
      console.log('   npm run user:import');
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

importPersonnages();
