import { getTursoClient, generateId } from './base';

export interface Message {
  id: string;
  userId: string;
  username: string;
  content: string;
  isValidated: boolean;
  validatedBy?: string;
  validatedAt?: string;
  pointsAwarded: number;
  createdAt: string;
}

export class MessageRepository {
  private client = getTursoClient();

  async find(options?: { limit?: number; sort?: { createdAt?: -1 | 1 } }): Promise<Message[]> {
    try {
      let sql = 'SELECT * FROM messages';

      if (options?.sort?.createdAt) {
        sql += ` ORDER BY createdAt ${options.sort.createdAt === -1 ? 'DESC' : 'ASC'}`;
      }

      if (options?.limit) {
        sql += ` LIMIT ${options.limit}`;
      }

      const result = await this.client.execute(sql);
      return result.rows.map(row => this.rowToMessage(row));
    } catch (error) {
      console.error('Error finding messages:', error);
      throw error;
    }
  }

  async findById(id: string): Promise<Message | null> {
    try {
      const result = await this.client.execute({
        sql: 'SELECT * FROM messages WHERE id = ?',
        args: [id],
      });

      if (result.rows.length === 0) {
        return null;
      }

      return this.rowToMessage(result.rows[0]);
    } catch (error) {
      console.error('Error finding message:', error);
      throw error;
    }
  }

  async create(messageData: {
    userId: string;
    username: string;
    content: string;
  }): Promise<Message> {
    try {
      const id = generateId();
      const now = new Date().toISOString();

      await this.client.execute({
        sql: `INSERT INTO messages (id, userId, username, content, isValidated, validatedBy, validatedAt, pointsAwarded, createdAt)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          id,
          messageData.userId,
          messageData.username,
          messageData.content,
          0,
          null,
          null,
          0,
          now,
        ],
      });

      const message = await this.findById(id);
      if (!message) {
        throw new Error('Failed to create message');
      }

      return message;
    } catch (error) {
      console.error('Error creating message:', error);
      throw error;
    }
  }

  async validate(messageId: string, validatedBy: string, points: number): Promise<Message> {
    try {
      const now = new Date().toISOString();

      await this.client.execute({
        sql: `UPDATE messages
              SET isValidated = 1, validatedBy = ?, validatedAt = ?, pointsAwarded = ?
              WHERE id = ?`,
        args: [validatedBy, now, points, messageId],
      });

      const message = await this.findById(messageId);
      if (!message) {
        throw new Error('Failed to validate message');
      }

      return message;
    } catch (error) {
      console.error('Error validating message:', error);
      throw error;
    }
  }

  private rowToMessage(row: any): Message {
    return {
      id: row.id as string,
      userId: row.userId as string,
      username: row.username as string,
      content: row.content as string,
      isValidated: Boolean(row.isValidated),
      validatedBy: row.validatedBy as string | undefined,
      validatedAt: row.validatedAt as string | undefined,
      pointsAwarded: row.pointsAwarded as number,
      createdAt: row.createdAt as string,
    };
  }
}

export const messageRepository = new MessageRepository();
