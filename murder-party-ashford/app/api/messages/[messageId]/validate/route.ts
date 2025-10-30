import { NextRequest, NextResponse } from 'next/server';
import { messageRepository } from '@/lib/db/message';
import { userRepository } from '@/lib/db/user';
import { getCurrentUser } from '@/lib/auth';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ messageId: string }> }
) {
  try {
    // Vérifier l'authentification et le rôle admin
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== 'admin') {
      return NextResponse.json(
        { error: 'Non autorisé - Accès admin requis' },
        { status: 403 }
      );
    }

    const { messageId } = await params;
    const body = await request.json();
    const { points = 20 } = body; // 20 points par défaut

    // Trouver le message
    const message = await messageRepository.findById(messageId);
    if (!message) {
      return NextResponse.json(
        { error: 'Message introuvable' },
        { status: 404 }
      );
    }

    // Vérifier si déjà validé
    if (message.isValidated) {
      return NextResponse.json(
        { error: 'Ce message a déjà été validé' },
        { status: 400 }
      );
    }

    // Mettre à jour le message
    const validatedMessage = await messageRepository.validate(messageId, currentUser.username, points);

    // Attribuer les points à l'utilisateur
    const user = await userRepository.findById(message.userId);
    if (user) {
      const newScore = (user.score || 0) + points;
      await userRepository.updateScore(message.userId, newScore);

      return NextResponse.json(
        {
          message: 'Indice validé avec succès',
          validatedMessage,
          newScore,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        message: 'Indice validé avec succès',
        validatedMessage,
        newScore: 0,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Erreur lors de la validation du message:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la validation du message' },
      { status: 500 }
    );
  }
}
