import mongoose, { Schema, model, models } from 'mongoose';

export interface IClue {
  title: string;
  description: string;
  location: string;
  relatedCharacters: string[];
  type: 'physical' | 'testimony' | 'document' | 'observation';
  discoveredBy?: string[];
  importance: 'low' | 'medium' | 'high' | 'critical';
  imageUrl?: string;
  timeDiscovered?: string;
  isRedHerring: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const ClueSchema = new Schema<IClue>(
  {
    title: {
      type: String,
      required: [true, 'Le titre est requis'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'La description est requise'],
    },
    location: {
      type: String,
      required: [true, 'Le lieu est requis'],
    },
    relatedCharacters: [
      {
        type: String,
      },
    ],
    type: {
      type: String,
      enum: ['physical', 'testimony', 'document', 'observation'],
      required: [true, 'Le type est requis'],
    },
    discoveredBy: [
      {
        type: String,
      },
    ],
    importance: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium',
    },
    imageUrl: {
      type: String,
    },
    timeDiscovered: {
      type: String,
    },
    isRedHerring: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Clue = models.Clue || model<IClue>('Clue', ClueSchema);

export default Clue;
