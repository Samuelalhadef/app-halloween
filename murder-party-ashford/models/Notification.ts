import mongoose, { Schema, model, models } from 'mongoose';

export interface INotification {
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isActive: boolean;
  createdAt?: Date;
}

const NotificationSchema = new Schema<INotification>(
  {
    message: {
      type: String,
      required: [true, 'Le message est requis'],
      maxlength: [200, 'Le message ne peut pas dépasser 200 caractères'],
    },
    type: {
      type: String,
      enum: ['info', 'success', 'warning', 'error'],
      default: 'info',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index pour optimiser les requêtes des notifications actives
NotificationSchema.index({ isActive: 1, createdAt: -1 });

const Notification = models.Notification || model<INotification>('Notification', NotificationSchema);

export default Notification;
