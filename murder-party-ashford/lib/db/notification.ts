import { getTursoClient, generateId } from './base';

export interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isActive: boolean;
  createdAt: string;
}

export class NotificationRepository {
  private client = getTursoClient();

  async find(filter?: { isActive?: boolean; createdAt?: { $gte?: Date } }): Promise<Notification[]> {
    try {
      let sql = 'SELECT * FROM notifications';
      const args: any[] = [];
      const conditions: string[] = [];

      if (filter?.isActive !== undefined) {
        conditions.push('isActive = ?');
        args.push(filter.isActive ? 1 : 0);
      }

      if (filter?.createdAt?.$gte) {
        conditions.push('createdAt >= ?');
        args.push(filter.createdAt.$gte.toISOString());
      }

      if (conditions.length > 0) {
        sql += ' WHERE ' + conditions.join(' AND ');
      }

      sql += ' ORDER BY createdAt DESC';

      const result = await this.client.execute({ sql, args });
      return result.rows.map(row => this.rowToNotification(row));
    } catch (error) {
      console.error('Error finding notifications:', error);
      throw error;
    }
  }

  async create(notificationData: {
    message: string;
    type?: 'info' | 'success' | 'warning' | 'error';
  }): Promise<Notification> {
    try {
      const id = generateId();
      const now = new Date().toISOString();

      await this.client.execute({
        sql: `INSERT INTO notifications (id, message, type, isActive, createdAt)
              VALUES (?, ?, ?, ?, ?)`,
        args: [
          id,
          notificationData.message,
          notificationData.type || 'info',
          1,
          now,
        ],
      });

      const result = await this.client.execute({
        sql: 'SELECT * FROM notifications WHERE id = ?',
        args: [id],
      });

      if (result.rows.length === 0) {
        throw new Error('Failed to create notification');
      }

      return this.rowToNotification(result.rows[0]);
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  }

  private rowToNotification(row: any): Notification {
    return {
      id: row.id as string,
      message: row.message as string,
      type: row.type as 'info' | 'success' | 'warning' | 'error',
      isActive: Boolean(row.isActive),
      createdAt: row.createdAt as string,
    };
  }
}

export const notificationRepository = new NotificationRepository();
