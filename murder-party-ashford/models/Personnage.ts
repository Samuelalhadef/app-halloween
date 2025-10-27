import mongoose, { Schema, model, models } from 'mongoose';

export interface IPersonnage {
  nom: string;
  prenom: string;
  identifiant: string;
  motDePasse: string;
  email: string;
  role: string;
  categorie: 'victime' | 'famille' | 'meurtrier' | 'domestique' | 'invite';
  createdAt?: Date;
  updatedAt?: Date;
}

const PersonnageSchema = new Schema<IPersonnage>(
  {
    nom: {
      type: String,
      required: [true, 'Le nom est requis'],
      trim: true,
    },
    prenom: {
      type: String,
      required: [true, 'Le prénom est requis'],
      trim: true,
    },
    identifiant: {
      type: String,
      required: [true, 'L\'identifiant est requis'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    motDePasse: {
      type: String,
      required: [true, 'Le mot de passe est requis'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'L\'email est requis'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Email invalide'],
    },
    role: {
      type: String,
      required: [true, 'Le rôle est requis'],
      trim: true,
    },
    categorie: {
      type: String,
      enum: ['victime', 'famille', 'meurtrier', 'domestique', 'invite'],
      required: [true, 'La catégorie est requise'],
    },
  },
  {
    timestamps: true,
  }
);

const Personnage = models.Personnage || model<IPersonnage>('Personnage', PersonnageSchema);

export default Personnage;
