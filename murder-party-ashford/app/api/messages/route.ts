import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import Message from '@/models/Message';
import { getCurrentUser } from '@/lib/auth';

// GET - Récupérer les messages
export async function GET(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    // Connexion à la base de données
    await connectDB();

    // Récupérer les 100 derniers messages
    const messages = await Message.find()
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();

    // Inverser l'ordre pour avoir les plus anciens en premier
    messages.reverse();

    return NextResponse.json(
      { messages },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Erreur lors de la récupération des messages:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des messages' },
      { status: 500 }
    );
  }
}

// POST - Envoyer un message
export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { content } = body;

    // Validation
    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { error: 'Le message ne peut pas être vide' },
        { status: 400 }
      );
    }

    if (content.length > 500) {
      return NextResponse.json(
        { error: 'Le message ne peut pas dépasser 500 caractères' },
        { status: 400 }
      );
    }

    // Connexion à la base de données
    await connectDB();

    // Créer le message
    const message = await Message.create({
      userId: user.userId,
      username: user.username,
      content: content.trim(),
    });

    return NextResponse.json(
      { message },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Erreur lors de l\'envoi du message:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi du message' },
      { status: 500 }
    );
  }
}
