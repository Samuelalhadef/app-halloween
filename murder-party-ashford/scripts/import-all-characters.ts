import { userRepository } from '../lib/db/user';

const characters = [
  // FAMILLE ASHFORD (5)
  {
    username: 'Catherine Ashford',
    email: 'catherine@ashford.com',
    password: 'ashford1925',
    role: 'player' as const,
  },
  {
    username: 'Thomas Ashford',
    email: 'thomas@ashford.com',
    password: 'ashford1925',
    role: 'player' as const,
  },
  {
    username: 'Sebastian Ashford',
    email: 'sebastian@ashford.com',
    password: 'ashford1925',
    role: 'player' as const,
  },
  {
    username: 'Helena Ashford',
    email: 'helena@ashford.com',
    password: 'ashford1925',
    role: 'player' as const,
  },
  {
    username: 'Penelope Pemberton',
    email: 'penelope@pemberton.com',
    password: 'pemberton25',
    role: 'player' as const,
  },

  // DOMESTIQUES (9 - incluant Margaret et Albert du trio meurtrier)
  {
    username: 'Margaret Walsh',
    email: 'margaret@ashford-staff.com',
    password: 'cuisiniere25',
    role: 'player' as const,
  },
  {
    username: 'Albert Whitmore',
    email: 'albert@ashford-staff.com',
    password: 'majordome25',
    role: 'player' as const,
  },
  {
    username: 'Rose Bennett',
    email: 'rose@ashford-staff.com',
    password: 'bennett1925',
    role: 'player' as const,
  },
  {
    username: 'Emily Clarke',
    email: 'emily@ashford-staff.com',
    password: 'clarke1925',
    role: 'player' as const,
  },
  {
    username: 'Harold Graves',
    email: 'harold@ashford-staff.com',
    password: 'graves1925',
    role: 'player' as const,
  },
  {
    username: 'George Thornton',
    email: 'george@ashford-staff.com',
    password: 'thornton25',
    role: 'player' as const,
  },
  {
    username: 'Beatrice Harlow',
    email: 'beatrice@ashford-staff.com',
    password: 'harlow1925',
    role: 'player' as const,
  },
  {
    username: 'Lucy Morrison',
    email: 'lucy@ashford-staff.com',
    password: 'morrison25',
    role: 'player' as const,
  },
  {
    username: 'James Crawford',
    email: 'james@ashford-staff.com',
    password: 'crawford25',
    role: 'player' as const,
  },

  // INVITÉS - Couple Pemberton (2)
  {
    username: 'Charles Pemberton',
    email: 'charles@pemberton.com',
    password: 'pemberton25',
    role: 'player' as const,
  },
  {
    username: 'Victoria Pemberton',
    email: 'victoria@pemberton.com',
    password: 'pemberton25',
    role: 'player' as const,
  },

  // INVITÉS - Amis/Relations (10)
  {
    username: 'Oliver Blackwood',
    email: 'oliver@blackwood.com',
    password: 'blackwood25',
    role: 'player' as const,
  },
  {
    username: 'Dr. Arthur Finch',
    email: 'arthur@finch.com',
    password: 'finch1925',
    role: 'player' as const,
  },
  {
    username: 'Silas Thorne',
    email: 'silas@thorne.com',
    password: 'thorne1925',
    role: 'player' as const,
  },
  {
    username: 'Lord Reginald Worthington',
    email: 'reginald@worthington.com',
    password: 'worthing25',
    role: 'player' as const,
  },
  {
    username: 'Lady Isabelle Worthington',
    email: 'isabelle@worthington.com',
    password: 'worthing25',
    role: 'player' as const,
  },
  {
    username: 'Jonathan Price',
    email: 'jonathan@price.com',
    password: 'price1925',
    role: 'player' as const,
  },
  {
    username: 'Eleanor Price',
    email: 'eleanor@price.com',
    password: 'price1925',
    role: 'player' as const,
  },
  {
    username: 'Violet Ashcroft',
    email: 'violet@ashcroft.com',
    password: 'ashcroft25',
    role: 'player' as const,
  },
  {
    username: 'Gregory Ashcroft',
    email: 'gregory@ashcroft.com',
    password: 'ashcroft25',
    role: 'player' as const,
  },
  {
    username: 'Lady Constance Fairfax',
    email: 'constance@fairfax.com',
    password: 'fairfax1925',
    role: 'player' as const,
  },
];

async function importAllCharacters() {
  console.log(`🎭 Import de ${characters.length} personnages dans la base de données...\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const character of characters) {
    try {
      // Vérifier si l'utilisateur existe déjà
      const existing = await userRepository.findOne({ email: character.email });

      if (existing) {
        console.log(`⚠️  ${character.username} existe déjà (${character.email})`);
        continue;
      }

      // Créer l'utilisateur
      await userRepository.create(character);
      console.log(`✅ ${character.username} créé avec succès`);
      successCount++;
    } catch (error: any) {
      console.error(`❌ Erreur pour ${character.username}: ${error.message}`);
      errorCount++;
    }
  }

  console.log('\n📊 Résumé de l\'import :');
  console.log(`   ✅ Créés : ${successCount}`);
  console.log(`   ⚠️  Déjà existants : ${characters.length - successCount - errorCount}`);
  console.log(`   ❌ Erreurs : ${errorCount}`);
  console.log(`   📦 Total : ${characters.length}`);

  console.log('\n🔐 Informations importantes :');
  console.log('   - MEURTRIÈRE : Margaret Walsh');
  console.log('   - Complices : Albert Whitmore, Thomas Ashford');
  console.log('   - Mobile : héritage (heritage)');
  console.log('   - Cause : empoisonnement (poison)');
  console.log('   - Arme : arsenic (arsenic)');
}

// Exécuter l'import
importAllCharacters()
  .then(() => {
    console.log('\n✨ Import terminé !');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Erreur fatale:', error);
    process.exit(1);
  });
