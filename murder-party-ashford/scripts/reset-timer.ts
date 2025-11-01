/**
 * Script pour réinitialiser le chronomètre à 75 minutes
 * Usage: npx tsx scripts/reset-timer.ts
 */

import { getTursoClient } from '../lib/db/base';

const NEW_TIME = 75 * 60; // 75 minutes en secondes

async function resetTimer() {
  try {
    console.log('\n⏱️  Réinitialisation du chronomètre à 75 minutes\n');

    const client = getTursoClient();

    // Vérifier s'il existe un état de jeu
    console.log('🔍 Vérification de l\'état du jeu...');
    const result = await client.execute('SELECT * FROM game_states LIMIT 1');

    if (result.rows.length === 0) {
      console.log('⚠️  Aucun état de jeu trouvé. Création d\'un nouvel état...');

      // Créer un nouvel état
      await client.execute({
        sql: `INSERT INTO game_states (id, isRunning, timeRemaining, startTime, pausedAt, updatedAt)
              VALUES (?, ?, ?, ?, ?, ?)`,
        args: [
          `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          0,
          NEW_TIME,
          null,
          null,
          new Date().toISOString(),
        ],
      });

      console.log('✅ Nouvel état de jeu créé avec 75 minutes');
    } else {
      const gameState = result.rows[0];
      console.log(`📊 État actuel: ${Math.floor((gameState.timeRemaining as number) / 60)} minutes`);

      // Mettre à jour l'état existant
      console.log('🔄 Mise à jour du chronomètre...');
      await client.execute({
        sql: 'UPDATE game_states SET timeRemaining = ?, isRunning = ?, startTime = ?, pausedAt = ?, updatedAt = ? WHERE id = ?',
        args: [NEW_TIME, 0, null, null, new Date().toISOString(), gameState.id as string],
      });

      console.log('✅ Chronomètre réinitialisé à 75 minutes');
    }

    // Vérifier le résultat
    const finalResult = await client.execute('SELECT * FROM game_states LIMIT 1');
    const finalState = finalResult.rows[0];

    console.log('\n📊 ÉTAT FINAL:');
    console.log(`   ⏱️  Temps: ${Math.floor((finalState.timeRemaining as number) / 60)} minutes (${finalState.timeRemaining} secondes)`);
    console.log(`   ▶️  En cours: ${finalState.isRunning ? 'Oui' : 'Non'}`);
    console.log('\n🎉 Réinitialisation terminée avec succès!');
    console.log('');

    process.exit(0);

  } catch (error: any) {
    console.error('\n❌ Erreur fatale:', error.message);
    console.error(error);
    process.exit(1);
  }
}

resetTimer();
