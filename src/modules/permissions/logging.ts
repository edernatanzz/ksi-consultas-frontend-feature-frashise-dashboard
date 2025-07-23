import { Permission } from '@/types/auth';
import { PermissionLog } from './types';

class PermissionLogger {
  private logs: PermissionLog[] = [];
  private readonly MAX_LOGS = 1000;

  public log(
    userId: string,
    permission: Permission,
    success: boolean,
    context?: string,
    metadata?: Record<string, unknown>
  ): void {
    const log: PermissionLog = {
      userId,
      permission,
      success,
      timestamp: new Date(),
      context,
      metadata
    };

    this.logs.push(log);
    this.trimLogs();
  }

  private trimLogs(): void {
    if (this.logs.length > this.MAX_LOGS) {
      this.logs = this.logs.slice(-this.MAX_LOGS);
    }
  }

  public getLogs(): PermissionLog[] {
    return [...this.logs];
  }

  public getLogsByUser(userId: string): PermissionLog[] {
    return this.logs.filter(log => log.userId === userId);
  }

  public getLogsByPermission(permission: Permission): PermissionLog[] {
    return this.logs.filter(log => log.permission === permission);
  }

  public clearLogs(): void {
    this.logs = [];
  }
}

export const permissionLogger = new PermissionLogger(); 