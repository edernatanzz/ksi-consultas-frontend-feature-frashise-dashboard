import { Permission } from '@/types/auth';
import { PermissionCache } from './types';

class PermissionCacheManager {
  private cache: PermissionCache = {};
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutos

  private generateCacheKey(permission: Permission, userPermissions: Permission[]): string {
    return `${permission}-${userPermissions.sort().join(',')}`;
  }

  private isCacheValid(timestamp: Date): boolean {
    return Date.now() - timestamp.getTime() < this.CACHE_TTL;
  }

  public get(permission: Permission, userPermissions: Permission[]): boolean | null {
    const cacheKey = this.generateCacheKey(permission, userPermissions);
    const cachedResult = this.cache[cacheKey];

    if (cachedResult && this.isCacheValid(cachedResult.timestamp)) {
      return cachedResult.result;
    }

    return null;
  }

  public set(permission: Permission, userPermissions: Permission[], result: boolean): void {
    const cacheKey = this.generateCacheKey(permission, userPermissions);
    this.cache[cacheKey] = {
      result,
      timestamp: new Date()
    };
  }

  public clear(): void {
    this.cache = {};
  }

  public clearExpired(): void {
    const now = Date.now();
    Object.entries(this.cache).forEach(([key, value]) => {
      if (now - value.timestamp.getTime() >= this.CACHE_TTL) {
        delete this.cache[key];
      }
    });
  }
}

export const permissionCache = new PermissionCacheManager(); 