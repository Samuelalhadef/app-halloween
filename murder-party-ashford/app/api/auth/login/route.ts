import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import User from '@/models/User';
import { generateToken, setAuthCookie } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { identifier, password } = body;

    // Validation des champs
    if (!identifier || !password) {
      return NextResponse.json(
        { error: 'Identifiant et mot de passe requis' },
        { status: 400 }
      );
    }

    // Connexion à la base de données
    await connectDB();

    // Chercher l'utilisateur par email OU username
    const user = await User.findOne({
      $or: [
        { email: identifier.toLowerCase() },
        { username: identifier }
      ]
    }).select('+password'); // Inclure le mot de passe (normalement exclu)

    if (!user) {
      return NextResponse.json(
        { error: 'Identifiant ou mot de passe incorrect' },
        { status: 401 }
      );
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Identifiant ou mot de passe incorrect' },
        { status: 401 }
      );
    }

    // Générer un token JWT
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      username: user.username,
      role: user.role,
    });

    // Définir le cookie
    await setAuthCookie(token);

    // Retourner les informations de l'utilisateur
    return NextResponse.json(
      {
        message: 'Connexion réussie',
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          role: user.role,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Erreur lors de la connexion:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la connexion' },
      { status: 500 }
    );
  }
}
