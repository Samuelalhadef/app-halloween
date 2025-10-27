import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import GameState from '@/models/GameState';
import { getCurrentUser } from '@/lib/auth';

// GET - Récupérer l'état du chronomètre
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

    // Récupérer ou créer l'état du jeu
    let gameState = await GameState.findOne();
    if (!gameState) {
      gameState = await GameState.create({
        isRunning: false,
        timeRemaining: 90 * 60, // 90 minutes
      });
    }

    // Si le chrono est en cours, calculer le temps restant
    if (gameState.isRunning && gameState.startTime) {
      const elapsed = Math.floor((Date.now() - gameState.startTime.getTime()) / 1000);
      const timeRemaining = Math.max(0, gameState.timeRemaining - elapsed);

      return NextResponse.json(
        {
          isRunning: timeRemaining > 0,
          timeRemaining,
          startTime: gameState.startTime,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        isRunning: gameState.isRunning,
        timeRemaining: gameState.timeRemaining,
        pausedAt: gameState.pausedAt,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Erreur lors de la récupération du chronomètre:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du chronomètre' },
      { status: 500 }
    );
  }
}

// POST - Gérer le chronomètre (start/pause/reset) - Admin uniquement
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
    const { action } = body; // 'start', 'pause', 'reset'

    // Connexion à la base de données
    await connectDB();

    // Récupérer ou créer l'état du jeu
    let gameState = await GameState.findOne();
    if (!gameState) {
      gameState = await GameState.create({
        isRunning: false,
        timeRemaining: 90 * 60,
      });
    }

    switch (action) {
      case 'start':
        if (!gameState.isRunning) {
          gameState.isRunning = true;
          gameState.startTime = new Date();
          gameState.pausedAt = undefined;
        }
        break;

      case 'pause':
        if (gameState.isRunning && gameState.startTime) {
          const elapsed = Math.floor((Date.now() - gameState.startTime.getTime()) / 1000);
          gameState.timeRemaining = Math.max(0, gameState.timeRemaining - elapsed);
          gameState.isRunning = false;
          gameState.pausedAt = new Date();
          gameState.startTime = undefined;
        }
        break;

      case 'reset':
        gameState.isRunning = false;
        gameState.timeRemaining = 90 * 60;
        gameState.startTime = undefined;
        gameState.pausedAt = undefined;
        break;

      default:
        return NextResponse.json(
          { error: 'Action invalide. Utilisez start, pause ou reset' },
          { status: 400 }
        );
    }

    await gameState.save();

    return NextResponse.json(
      {
        message: `Chronomètre ${action === 'start' ? 'démarré' : action === 'pause' ? 'mis en pause' : 'réinitialisé'}`,
        gameState: {
          isRunning: gameState.isRunning,
          timeRemaining: gameState.timeRemaining,
          startTime: gameState.startTime,
          pausedAt: gameState.pausedAt,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Erreur lors de la gestion du chronomètre:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la gestion du chronomètre' },
      { status: 500 }
    );
  }
}
