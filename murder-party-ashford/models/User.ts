import mongoose, { Schema, model, models } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser {
  email: string;
  password: string;
  username: string;
  role: 'player' | 'gamemaster' | 'admin';
  score: number;
  discoveredClues: string[];
  suspicions: {
    characterId: string;
    notes: string;
    confidence: number;
  }[];
  finalAccusation?: {
    characterId: string;
    reasoning: string;
    submittedAt: Date;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, 'L\'email est requis'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Email invalide'],
    },
    password: {
      type: String,
      required: [true, 'Le mot de passe est requis'],
      minlength: [6, 'Le mot de passe doit contenir au moins 6 caractères'],
      select: false,
    },
    username: {
      type: String,
      required: [true, 'Le nom d\'utilisateur est requis'],
      trim: true,
      minlength: [3, 'Le nom d\'utilisateur doit contenir au moins 3 caractères'],
    },
    role: {
      type: String,
      enum: ['player', 'gamemaster', 'admin'],
      default: 'player',
    },
    score: {
      type: Number,
      default: 0,
      min: 0,
    },
    discoveredClues: [
      {
        type: String,
      },
    ],
    suspicions: [
      {
        characterId: {
          type: String,
          required: true,
        },
        notes: {
          type: String,
        },
        confidence: {
          type: Number,
          min: 0,
          max: 100,
          default: 50,
        },
      },
    ],
    finalAccusation: {
      characterId: {
        type: String,
      },
      reasoning: {
        type: String,
      },
      submittedAt: {
        type: Date,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Hash password avant sauvegarde
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Méthode pour comparer les mots de passe
UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = models.User || model<IUser>('User', UserSchema);

export default User;
