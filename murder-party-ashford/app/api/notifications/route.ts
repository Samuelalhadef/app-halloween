import { NextRequest, NextResponse } from 'next/server';
import { notificationRepository } from '@/lib/db/notification';
import { getCurrentUser } from '@/lib/auth';

// GET - Récupérer les notifications actives
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

    // Récupérer les notifications actives des 10 dernières secondes
    const tenSecondsAgo = new Date(Date.now() - 10000);
    const notifications = await notificationRepository.find({
      isActive: true,
      createdAt: { $gte: tenSecondsAgo },
    });

    return NextResponse.json(
      { notifications },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Erreur lors de la récupération des notifications:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des notifications' },
      { status: 500 }
    );
  }
}

// POST - Créer une notification (admin uniquement)
export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification et le rôle admin
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Non autorisé - Accès admin requis' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { message, type = 'info' } = body;

    // Validation
    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Le message ne peut pas être vide' },
        { status: 400 }
      );
    }

    if (message.length > 200) {
      return NextResponse.json(
        { error: 'Le message ne peut pas dépasser 200 caractères' },
        { status: 400 }
      );
    }

    // Créer la notification
    const notification = await notificationRepository.create({
      message: message.trim(),
      type,
    });

    return NextResponse.json(
      { notification },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Erreur lors de la création de la notification:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création de la notification' },
      { status: 500 }
    );
  }
}
