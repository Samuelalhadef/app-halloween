import mongoose, { Schema, model, models } from 'mongoose';

export interface ICharacter {
  name: string;
  title: string;
  age: number;
  description: string;
  background: string;
  secrets: string[];
  alibi: string;
  relationships: {
    characterId: string;
    relationship: string;
  }[];
  isMurderer: boolean;
  imageUrl?: string;
  occupation: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const CharacterSchema = new Schema<ICharacter>(
  {
    name: {
      type: String,
      required: [true, 'Le nom est requis'],
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Le titre est requis'],
      trim: true,
    },
    age: {
      type: Number,
      required: [true, 'L\'âge est requis'],
      min: 18,
      max: 100,
    },
    description: {
      type: String,
      required: [true, 'La description est requise'],
    },
    background: {
      type: String,
      required: [true, 'Le background est requis'],
    },
    secrets: [
      {
        type: String,
      },
    ],
    alibi: {
      type: String,
      required: [true, 'L\'alibi est requis'],
    },
    relationships: [
      {
        characterId: {
          type: String,
          required: true,
        },
        relationship: {
          type: String,
          required: true,
        },
      },
    ],
    isMurderer: {
      type: Boolean,
      default: false,
    },
    imageUrl: {
      type: String,
    },
    occupation: {
      type: String,
      required: [true, 'La profession est requise'],
    },
  },
  {
    timestamps: true,
  }
);

const Character = models.Character || model<ICharacter>('Character', CharacterSchema);

export default Character;
