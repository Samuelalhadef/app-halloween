import { getTursoClient, generateId } from './base';
import bcrypt from 'bcryptjs';

export interface User {
  id: string;
  email: string;
  password: string;
  username: string;
  role: 'player' | 'gamemaster' | 'admin';
  score: number;
  discoveredClues: string[];
  suspicions: Array<{
    characterId: string;
    notes: string;
    confidence: number;
  }>;
  finalAccusation?: {
    characterId: string;
    reasoning: string;
    submittedAt: string;
  };
  createdAt: string;
  updatedAt: string;
}

export class UserRepository {
  private client = getTursoClient();

  async findOne(filter: { email?: string; username?: string; id?: string }, options?: { includePassword?: boolean }): Promise<User | null> {
    try {
      let sql = 'SELECT * FROM users WHERE ';
      const args: any[] = [];

      if (filter.id) {
        sql += 'id = ?';
        args.push(filter.id);
      } else if (filter.email) {
        sql += 'email = ?';
        args.push(filter.email.toLowerCase());
      } else if (filter.username) {
        sql += 'username = ?';
        args.push(filter.username);
      } else {
        return null;
      }

      const result = await this.client.execute({ sql, args });

      if (result.rows.length === 0) {
        return null;
      }

      const row = result.rows[0];
      return this.rowToUser(row);
    } catch (error) {
      console.error('Error finding user:', error);
      throw error;
    }
  }

  async findOneByIdentifier(identifier: string, includePassword = false): Promise<User | null> {
    try {
      const sql = 'SELECT * FROM users WHERE email = ? OR username = ? LIMIT 1';
      const args = [identifier.toLowerCase(), identifier];

      const result = await this.client.execute({ sql, args });

      if (result.rows.length === 0) {
        return null;
      }

      return this.rowToUser(result.rows[0]);
    } catch (error) {
      console.error('Error finding user by identifier:', error);
      throw error;
    }
  }

  async findById(id: string): Promise<User | null> {
    return this.findOne({ id });
  }

  async findAllSortedByScore(): Promise<User[]> {
    try {
      const sql = 'SELECT * FROM users WHERE role = ? ORDER BY score DESC, username ASC';
      const args = ['player'];

      const result = await this.client.execute({ sql, args });

      return result.rows.map(row => this.rowToUser(row));
    } catch (error) {
      console.error('Error finding users sorted by score:', error);
      throw error;
    }
  }

  async updateScore(userId: string, newScore: number): Promise<void> {
    try {
      await this.client.execute({
        sql: 'UPDATE users SET score = ?, updatedAt = ? WHERE id = ?',
        args: [newScore, new Date().toISOString(), userId],
      });
    } catch (error) {
      console.error('Error updating user score:', error);
      throw error;
    }
  }

  async create(userData: {
    email: string;
    password: string;
    username: string;
    role?: 'player' | 'gamemaster' | 'admin';
  }): Promise<User> {
    try {
      const id = generateId();
      const now = new Date().toISOString();

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);

      await this.client.execute({
        sql: `INSERT INTO users (id, email, password, username, role, score, discoveredClues, suspicions, finalAccusation, createdAt, updatedAt)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          id,
          userData.email.toLowerCase(),
          hashedPassword,
          userData.username,
          userData.role || 'player',
          0,
          JSON.stringify([]),
          JSON.stringify([]),
          null,
          now,
          now,
        ],
      });

      const user = await this.findById(id);
      if (!user) {
        throw new Error('Failed to create user');
      }

      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  private rowToUser(row: any): User {
    return {
      id: row.id as string,
      email: row.email as string,
      password: row.password as string,
      username: row.username as string,
      role: row.role as 'player' | 'gamemaster' | 'admin',
      score: row.score as number,
      discoveredClues: row.discoveredClues ? JSON.parse(row.discoveredClues as string) : [],
      suspicions: row.suspicions ? JSON.parse(row.suspicions as string) : [],
      finalAccusation: row.finalAccusation ? JSON.parse(row.finalAccusation as string) : undefined,
      createdAt: row.createdAt as string,
      updatedAt: row.updatedAt as string,
    };
  }
}

export const userRepository = new UserRepository();
