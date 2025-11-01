/**
 * Script pour mettre à jour tous les mots de passe des utilisateurs
 * Usage: npx tsx scripts/update-all-passwords.ts
 */

import { getTursoClient } from '../lib/db/base';
import bcrypt from 'bcryptjs';

const NEW_PASSWORD = 'ashford1925';

async function updateAllPasswords() {
  try {
    console.log('\n🔐 Mise à jour de tous les mots de passe\n');

    const client = getTursoClient();

    // Hasher le nouveau mot de passe
    console.log('🔒 Hashage du mot de passe...');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(NEW_PASSWORD, salt);
    console.log('✅ Mot de passe hashé\n');

    // Récupérer tous les utilisateurs
    console.log('📡 Récupération de tous les utilisateurs...');
    const result = await client.execute('SELECT id, username, email FROM users');
    console.log(`✅ ${result.rows.length} utilisateurs trouvés\n`);

    if (result.rows.length === 0) {
      console.log('⚠️  Aucun utilisateur trouvé dans la base de données');
      process.exit(0);
    }

    // Mettre à jour tous les mots de passe
    console.log('🔄 Mise à jour des mots de passe...\n');

    let updated = 0;
    let errors = 0;

    for (const row of result.rows) {
      try {
        await client.execute({
          sql: 'UPDATE users SET password = ?, updatedAt = ? WHERE id = ?',
          args: [hashedPassword, new Date().toISOString(), row.id as string],
        });

        console.log(`✅ ${row.username} (${row.email})`);
        updated++;
      } catch (error: any) {
        console.error(`❌ ${row.username} - Erreur: ${error.message}`);
        errors++;
      }
    }

    console.log('\n📊 RÉSUMÉ:');
    console.log(`   ✅ Mis à jour: ${updated}`);
    console.log(`   ❌ Erreurs: ${errors}`);
    console.log(`   📋 Total: ${result.rows.length}`);
    console.log(`\n🔑 Nouveau mot de passe pour tous: ${NEW_PASSWORD}`);

    if (updated > 0) {
      console.log('\n🎉 Mise à jour terminée avec succès!');
    }

    console.log('');
    process.exit(0);

  } catch (error: any) {
    console.error('\n❌ Erreur fatale:', error.message);
    console.error(error);
    process.exit(1);
  }
}

updateAllPasswords();
