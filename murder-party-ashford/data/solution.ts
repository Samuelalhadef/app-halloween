// SOLUTION CORRECTE DU MEURTRE AU MANOIR ASHFORD
// Cette solution est utilisée pour valider les accusations et attribuer les points

export const correctSolution = {
  // L'assassin principal (100 points)
  murderer: 'margaret-walsh', // Margaret Walsh, la cuisinière

  // Les complices (30 points chacun)
  accomplices: [
    'thomas-ashford',      // Thomas Ashford - A versé le produit dans le verre
    'albert-whitmore'      // Albert Whitmore - A acheté le produit chez l'apothicaire
  ],

  // Le mobile du crime (65 points)
  motive: 'vengeance',

  // La cause de mort (50 points)
  causeOfDeath: 'poison', // Empoisonnement

  // L'arme/méthode - Poison spécifique (30 points)
  weapon: 'digitoxine'
};

// Fonction pour calculer le score d'une accusation
export const calculateScore = (accusation: {
  murderer: string;
  accomplices: string[];
  motive: string;
  causeOfDeath: string;
  weapon: string;
}) => {
  let score = 0;
  const details: { category: string; correct: boolean; points: number }[] = [];

  // Vérifier le meurtrier (100 points)
  const murdererCorrect = accusation.murderer === correctSolution.murderer;
  if (murdererCorrect) {
    score += 100;
  }
  details.push({
    category: 'Meurtrier',
    correct: murdererCorrect,
    points: murdererCorrect ? 100 : 0
  });

  // Vérifier les complices (30 points chacun)
  const accomplicesScore = accusation.accomplices.filter(acc =>
    correctSolution.accomplices.includes(acc)
  ).length * 30;
  score += accomplicesScore;
  details.push({
    category: 'Complices',
    correct: accomplicesScore > 0,
    points: accomplicesScore
  });

  // Vérifier le mobile (65 points)
  const motiveCorrect = accusation.motive === correctSolution.motive;
  if (motiveCorrect) {
    score += 65;
  }
  details.push({
    category: 'Mobile',
    correct: motiveCorrect,
    points: motiveCorrect ? 65 : 0
  });

  // Vérifier la cause de mort (50 points)
  const causeCorrect = accusation.causeOfDeath === correctSolution.causeOfDeath;
  if (causeCorrect) {
    score += 50;
  }
  details.push({
    category: 'Cause de mort',
    correct: causeCorrect,
    points: causeCorrect ? 50 : 0
  });

  // Vérifier l'arme (30 points)
  const weaponCorrect = accusation.weapon === correctSolution.weapon;
  if (weaponCorrect) {
    score += 30;
  }
  details.push({
    category: 'Arme/Poison',
    correct: weaponCorrect,
    points: weaponCorrect ? 30 : 0
  });

  return {
    totalScore: score,
    maxScore: 275, // 100 + 60 (2×30) + 65 + 50 + 30
    details,
    isPerfect: score === 275
  };
};

// Informations supplémentaires sur la solution
export const solutionInfo = {
  murdererName: 'Margaret Walsh',
  accompliceNames: ['Thomas Ashford', 'Albert Whitmore'],
  motiveName: 'Vengeance',
  causeOfDeathName: 'Empoisonnement',
  weaponName: 'Digitoxine',

  explanation: `
Margaret Walsh, la cuisinière, est l'assassin principal. Elle a manipulé Thomas Ashford pour qu'il verse
de la digitoxine dans le verre de son père, Lord Edmund. Albert Whitmore, le majordome, a involontairement
acheté le poison chez l'apothicaire Silas Thorne pour Margaret.

Le mobile était la vengeance. Lord Edmund avait fait quelque chose de terrible à Margaret dans le passé,
et elle a orchestré ce meurtre pour se venger.

L'arme du crime était la digitoxine, un poison cardiaque mortel qui peut être extrait de la plante
digitale pourpre ou obtenu sous forme médicamenteuse.
  `.trim()
};
