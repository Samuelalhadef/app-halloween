import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import Message from '@/models/Message';
import User from '@/models/User';
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

    // Connexion à la base de données
    await connectDB();

    // Trouver le message
    const message = await Message.findById(messageId);
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
    message.isValidated = true;
    message.validatedBy = currentUser.username;
    message.validatedAt = new Date();
    message.pointsAwarded = points;
    await message.save();

    // Attribuer les points à l'utilisateur
    const user = await User.findById(message.userId);
    if (user) {
      user.score = (user.score || 0) + points;
      await user.save();
    }

    return NextResponse.json(
      {
        message: 'Indice validé avec succès',
        validatedMessage: message,
        newScore: user?.score || 0,
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
