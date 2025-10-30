import { NextRequest, NextResponse } from 'next/server';
import { userRepository } from '@/lib/db/user';
import { getCurrentUser } from '@/lib/auth';

// Définition des bonnes réponses (à modifier selon votre scénario)
const CORRECT_ANSWERS = {
  murderer: 'thomas',        // ID du vrai meurtrier
  accomplices: ['sebastian'], // IDs des vrais complices
  motive: 'heritage',        // ID du vrai mobile
  causeOfDeath: 'poison',    // ID de la vraie cause
  weapon: 'arsenic',         // ID de la vraie arme
};

// Système de points
const POINTS = {
  murderer: 100,      // Meurtrier correct : +100 pts
  accomplice: 30,     // Complice correct : +30 pts (chacun)
  motive: 65,         // Mobile correct : +65 pts
  causeOfDeath: 50,   // Cause de mort : +50 pts
  weapon: 30,         // Arme/méthode : +30 pts
};

function calculatePoints(accusation: {
  murderer: string;
  accomplices: string[];
  motive: string;
  causeOfDeath: string;
  weapon: string;
}): { total: number; details: any } {
  let total = 0;
  const details: any = {
    murderer: { correct: false, points: 0 },
    accomplices: { correct: [], points: 0 },
    motive: { correct: false, points: 0 },
    causeOfDeath: { correct: false, points: 0 },
    weapon: { correct: false, points: 0 },
  };

  // Vérifier le meurtrier
  if (accusation.murderer === CORRECT_ANSWERS.murderer) {
    details.murderer.correct = true;
    details.murderer.points = POINTS.murderer;
    total += POINTS.murderer;
  }

  // Vérifier les complices
  accusation.accomplices.forEach(acc => {
    if (CORRECT_ANSWERS.accomplices.includes(acc)) {
      details.accomplices.correct.push(acc);
      details.accomplices.points += POINTS.accomplice;
      total += POINTS.accomplice;
    }
  });

  // Vérifier le mobile
  if (accusation.motive === CORRECT_ANSWERS.motive) {
    details.motive.correct = true;
    details.motive.points = POINTS.motive;
    total += POINTS.motive;
  }

  // Vérifier la cause de mort
  if (accusation.causeOfDeath === CORRECT_ANSWERS.causeOfDeath) {
    details.causeOfDeath.correct = true;
    details.causeOfDeath.points = POINTS.causeOfDeath;
    total += POINTS.causeOfDeath;
  }

  // Vérifier l'arme
  if (accusation.weapon === CORRECT_ANSWERS.weapon) {
    details.weapon.correct = true;
    details.weapon.points = POINTS.weapon;
    total += POINTS.weapon;
  }

  return { total, details };
}

export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification et le rôle admin
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== 'admin') {
      return NextResponse.json(
        { error: 'Non autorisé - Accès admin requis' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'userId requis' },
        { status: 400 }
      );
    }

    // Récupérer l'utilisateur
    const user = await userRepository.findById(userId);
    if (!user) {
      return NextResponse.json(
        { error: 'Utilisateur introuvable' },
        { status: 404 }
      );
    }

    if (!user.finalAccusation) {
      return NextResponse.json(
        { error: 'Aucune accusation finale pour cet utilisateur' },
        { status: 400 }
      );
    }

    if (user.finalAccusation.isValidated) {
      return NextResponse.json(
        { error: 'Cette accusation a déjà été validée' },
        { status: 400 }
      );
    }

    // Calculer les points
    const { total, details } = calculatePoints(user.finalAccusation);

    // Valider l'accusation et attribuer les points
    const updatedUser = await userRepository.validateFinalAccusation(userId, total);

    return NextResponse.json(
      {
        message: 'Accusation validée avec succès',
        user: {
          id: updatedUser.id,
          username: updatedUser.username,
          score: updatedUser.score,
        },
        points: {
          total,
          details,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Erreur lors de la validation de l\'accusation:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la validation de l\'accusation' },
      { status: 500 }
    );
  }
}

// GET - Récupérer toutes les accusations pour validation (admin)
export async function GET(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== 'admin') {
      return NextResponse.json(
        { error: 'Non autorisé - Accès admin requis' },
        { status: 403 }
      );
    }

    const users = await userRepository.findUsersWithAccusations();

    const accusations = users.map(user => ({
      userId: user.id,
      username: user.username,
      score: user.score,
      cluesFound: user.discoveredClues.length,
      accusation: user.finalAccusation,
    }));

    return NextResponse.json(
      { accusations },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Erreur lors de la récupération des accusations:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des accusations' },
      { status: 500 }
    );
  }
}
