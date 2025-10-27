import mongoose, { Schema, model, models } from 'mongoose';

export interface IGameState {
  isRunning: boolean;
  timeRemaining: number; // En secondes
  startTime?: Date;
  pausedAt?: Date;
  updatedAt?: Date;
}

const GameStateSchema = new Schema<IGameState>(
  {
    isRunning: {
      type: Boolean,
      default: false,
    },
    timeRemaining: {
      type: Number,
      default: 90 * 60, // 90 minutes par défaut
      min: 0,
    },
    startTime: {
      type: Date,
    },
    pausedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const GameState = models.GameState || model<IGameState>('GameState', GameStateSchema);

export default GameState;
