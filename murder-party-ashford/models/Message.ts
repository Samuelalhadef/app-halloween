import mongoose, { Schema, model, models } from 'mongoose';

export interface IMessage {
  userId: string;
  username: string;
  content: string;
  isValidated: boolean;
  validatedBy?: string;
  validatedAt?: Date;
  pointsAwarded: number;
  createdAt?: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    userId: {
      type: String,
      required: [true, 'L\'ID utilisateur est requis'],
    },
    username: {
      type: String,
      required: [true, 'Le nom d\'utilisateur est requis'],
    },
    content: {
      type: String,
      required: [true, 'Le contenu du message est requis'],
      maxlength: [500, 'Le message ne peut pas dépasser 500 caractères'],
    },
    isValidated: {
      type: Boolean,
      default: false,
    },
    validatedBy: {
      type: String,
    },
    validatedAt: {
      type: Date,
    },
    pointsAwarded: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index pour optimiser les requêtes par date
MessageSchema.index({ createdAt: -1 });

const Message = models.Message || model<IMessage>('Message', MessageSchema);

export default Message;
