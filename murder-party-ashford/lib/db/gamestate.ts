import { getTursoClient, generateId } from './base';

export interface GameState {
  id: string;
  isRunning: boolean;
  timeRemaining: number;
  startTime?: string;
  pausedAt?: string;
  updatedAt: string;
}

export class GameStateRepository {
  private client = getTursoClient();

  async findOne(): Promise<GameState | null> {
    try {
      const result = await this.client.execute('SELECT * FROM game_states LIMIT 1');

      if (result.rows.length === 0) {
        return null;
      }

      return this.rowToGameState(result.rows[0]);
    } catch (error) {
      console.error('Error finding game state:', error);
      throw error;
    }
  }

  async create(data?: { isRunning?: boolean; timeRemaining?: number }): Promise<GameState> {
    try {
      const id = generateId();
      const now = new Date().toISOString();

      await this.client.execute({
        sql: `INSERT INTO game_states (id, isRunning, timeRemaining, startTime, pausedAt, updatedAt)
              VALUES (?, ?, ?, ?, ?, ?)`,
        args: [
          id,
          data?.isRunning ? 1 : 0,
          data?.timeRemaining || 5400, // 90 minutes
          null,
          null,
          now,
        ],
      });

      const gameState = await this.findOne();
      if (!gameState) {
        throw new Error('Failed to create game state');
      }

      return gameState;
    } catch (error) {
      console.error('Error creating game state:', error);
      throw error;
    }
  }

  async update(id: string, updates: Partial<Omit<GameState, 'id'>>): Promise<GameState> {
    try {
      const fields: string[] = [];
      const args: any[] = [];

      if (updates.isRunning !== undefined) {
        fields.push('isRunning = ?');
        args.push(updates.isRunning ? 1 : 0);
      }

      if (updates.timeRemaining !== undefined) {
        fields.push('timeRemaining = ?');
        args.push(updates.timeRemaining);
      }

      if (updates.startTime !== undefined) {
        fields.push('startTime = ?');
        args.push(updates.startTime || null);
      }

      if (updates.pausedAt !== undefined) {
        fields.push('pausedAt = ?');
        args.push(updates.pausedAt || null);
      }

      fields.push('updatedAt = ?');
      args.push(new Date().toISOString());

      args.push(id);

      await this.client.execute({
        sql: `UPDATE game_states SET ${fields.join(', ')} WHERE id = ?`,
        args,
      });

      const gameState = await this.findOne();
      if (!gameState) {
        throw new Error('Failed to update game state');
      }

      return gameState;
    } catch (error) {
      console.error('Error updating game state:', error);
      throw error;
    }
  }

  private rowToGameState(row: any): GameState {
    return {
      id: row.id as string,
      isRunning: Boolean(row.isRunning),
      timeRemaining: row.timeRemaining as number,
      startTime: row.startTime as string | undefined,
      pausedAt: row.pausedAt as string | undefined,
      updatedAt: row.updatedAt as string,
    };
  }
}

export const gameStateRepository = new GameStateRepository();
