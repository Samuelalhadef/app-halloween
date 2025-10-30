import { NextRequest, NextResponse } from 'next/server';
import { userRepository } from '@/lib/db/user';
import { getCurrentUser } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { murderer, accomplices, motive, causeOfDeath, weapon, reasoning } = body;

    // Validation
    if (!murderer || !motive || !causeOfDeath || !weapon) {
      return NextResponse.json(
        { error: 'Le meurtrier, le mobile, la cause de mort et l\'arme sont requis' },
        { status: 400 }
      );
    }

    if (!Array.isArray(accomplices)) {
      return NextResponse.json(
        { error: 'Les complices doivent être un tableau' },
        { status: 400 }
      );
    }

    // Le raisonnement est optionnel mais limité à 1000 caractères
    if (reasoning && reasoning.length > 1000) {
      return NextResponse.json(
        { error: 'Le raisonnement ne peut pas dépasser 1000 caractères' },
        { status: 400 }
      );
    }

    // Vérifier si l'utilisateur a déjà soumis une accusation
    const user = await userRepository.findById(currentUser.userId);
    if (user?.finalAccusation) {
      return NextResponse.json(
        { error: 'Vous avez déjà soumis votre accusation finale' },
        { status: 400 }
      );
    }

    // Soumettre l'accusation finale
    const updatedUser = await userRepository.submitFinalAccusation(currentUser.userId, {
      murderer,
      accomplices,
      motive,
      causeOfDeath,
      weapon,
      reasoning,
    });

    return NextResponse.json(
      {
        message: 'Accusation finale soumise avec succès',
        accusation: updatedUser.finalAccusation,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Erreur lors de la soumission de l\'accusation:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la soumission de l\'accusation' },
      { status: 500 }
    );
  }
}

// GET - Récupérer l'accusation finale de l'utilisateur
export async function GET(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    const user = await userRepository.findById(currentUser.userId);
    if (!user) {
      return NextResponse.json(
        { error: 'Utilisateur introuvable' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { accusation: user.finalAccusation || null },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Erreur lors de la récupération de l\'accusation:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération de l\'accusation' },
      { status: 500 }
    );
  }
}
