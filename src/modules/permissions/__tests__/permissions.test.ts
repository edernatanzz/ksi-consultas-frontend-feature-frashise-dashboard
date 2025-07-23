import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Permission } from '@/types/auth';
import { permissionManager } from '../index';
import { permissionCache } from '../cache';
import { permissionLogger } from '../logging';
import { validatePermissions, validatePermissionHierarchy, validateCategoryAccess } from '../validation';

describe('PermissionManager', () => {
  beforeEach(() => {
    permissionCache.clear();
    permissionLogger.clearLogs();
    vi.clearAllMocks();
  });

  describe('hasPermission', () => {
    it('should return true for valid permission', () => {
      const userPermissions = [Permission.READ_DASHBOARD];
      expect(permissionManager.hasPermission(Permission.READ_DASHBOARD, userPermissions)).toBe(true);
    });

    it('should return false for invalid permission', () => {
      const userPermissions = [Permission.READ_DASHBOARD];
      expect(permissionManager.hasPermission(Permission.MANAGE_SYSTEM, userPermissions)).toBe(false);
    });

    it('should use cache for repeated checks', () => {
      const userPermissions = [Permission.READ_DASHBOARD];
      permissionManager.hasPermission(Permission.READ_DASHBOARD, userPermissions);
      const cachedResult = permissionCache.get(Permission.READ_DASHBOARD, userPermissions);
      expect(cachedResult).not.toBeNull();
    });

    it('should log permission checks', () => {
      const userPermissions = [Permission.READ_DASHBOARD];
      permissionManager.hasPermission(Permission.READ_DASHBOARD, userPermissions);
      const logs = permissionLogger.getLogs();
      expect(logs.length).toBeGreaterThan(0);
      expect(logs[0].permission).toBe(Permission.READ_DASHBOARD);
    });
  });

  describe('canAccessCategory', () => {
    it('should return true for accessible category', () => {
      const userPermissions = [Permission.READ_BANCARIO];
      expect(permissionManager.canAccessCategory('bancario', userPermissions)).toBe(true);
    });

    it('should return false for inaccessible category', () => {
      const userPermissions = [Permission.READ_BANCARIO];
      expect(permissionManager.canAccessCategory('veicular', userPermissions)).toBe(false);
    });

    it('should log category access attempts', () => {
      const userPermissions = [Permission.READ_BANCARIO];
      permissionManager.canAccessCategory('bancario', userPermissions);
      const logs = permissionLogger.getLogs();
      expect(logs.length).toBeGreaterThan(0);
      expect(logs[0].context).toBe('category_access');
    });
  });

  describe('getRequiredPermissionsForAction', () => {
    it('should return correct permissions for new_consultation', () => {
      const permissions = permissionManager.getRequiredPermissionsForAction('new_consultation');
      expect(permissions).toContain(Permission.WRITE_BANCARIO);
      expect(permissions).toContain(Permission.WRITE_VEICULAR);
    });

    it('should return correct permissions for view_history', () => {
      const permissions = permissionManager.getRequiredPermissionsForAction('view_history');
      expect(permissions).toEqual([Permission.READ_REPORTS]);
    });

    it('should return empty array for unknown action', () => {
      const permissions = permissionManager.getRequiredPermissionsForAction('unknown_action');
      expect(permissions).toEqual([]);
    });
  });

  describe('hasAnyWritePermission', () => {
    it('should return true if user has any write permission', () => {
      const userPermissions = [Permission.WRITE_BANCARIO];
      expect(permissionManager.hasAnyWritePermission(userPermissions)).toBe(true);
    });

    it('should return false if user has no write permissions', () => {
      const userPermissions = [Permission.READ_BANCARIO];
      expect(permissionManager.hasAnyWritePermission(userPermissions)).toBe(false);
    });
  });

  describe('getAccessibleCategories', () => {
    it('should return only accessible categories', () => {
      const userPermissions = [Permission.READ_BANCARIO, Permission.READ_VEICULAR];
      const categories = permissionManager.getAccessibleCategories(userPermissions);
      expect(categories).toContain('bancario');
      expect(categories).toContain('veicular');
      expect(categories).not.toContain('juridico');
    });

    it('should return empty array if user has no category permissions', () => {
      const userPermissions = [Permission.READ_DASHBOARD];
      const categories = permissionManager.getAccessibleCategories(userPermissions);
      expect(categories).toEqual([]);
    });
  });
});

describe('Permission Validation', () => {
  describe('validatePermissions', () => {
    it('should validate valid permissions', () => {
      const result = validatePermissions([Permission.READ_DASHBOARD]);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should detect invalid permissions', () => {
      const result = validatePermissions(['invalid_permission' as Permission]);
      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveLength(1);
    });
  });

  describe('validatePermissionHierarchy', () => {
    it('should grant access if user has MANAGE_SYSTEM permission', () => {
      const userPermissions = [Permission.MANAGE_SYSTEM];
      expect(validatePermissionHierarchy(Permission.READ_DASHBOARD, userPermissions)).toBe(true);
    });

    it('should check specific permission if user does not have MANAGE_SYSTEM', () => {
      const userPermissions = [Permission.READ_DASHBOARD];
      expect(validatePermissionHierarchy(Permission.READ_DASHBOARD, userPermissions)).toBe(true);
      expect(validatePermissionHierarchy(Permission.MANAGE_SYSTEM, userPermissions)).toBe(false);
    });
  });

  describe('validateCategoryAccess', () => {
    it('should validate category access correctly', () => {
      const userPermissions = [Permission.READ_BANCARIO];
      expect(validateCategoryAccess('bancario', userPermissions)).toBe(true);
      expect(validateCategoryAccess('veicular', userPermissions)).toBe(false);
    });

    it('should handle invalid category IDs', () => {
      const userPermissions = [Permission.READ_BANCARIO];
      expect(validateCategoryAccess('invalid_category', userPermissions)).toBe(false);
    });
  });
});

describe('Permission Cache', () => {
  it('should cache permission checks', () => {
    const userPermissions = [Permission.READ_DASHBOARD];
    permissionManager.hasPermission(Permission.READ_DASHBOARD, userPermissions);
    const cachedResult = permissionCache.get(Permission.READ_DASHBOARD, userPermissions);
    expect(cachedResult).toBe(true);
  });

  it('should clear cache', () => {
    const userPermissions = [Permission.READ_DASHBOARD];
    permissionManager.hasPermission(Permission.READ_DASHBOARD, userPermissions);
    permissionCache.clear();
    const cachedResult = permissionCache.get(Permission.READ_DASHBOARD, userPermissions);
    expect(cachedResult).toBeNull();
  });
});

describe('Permission Logger', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    permissionCache.clear();
    permissionLogger.clearLogs();
  });

  it('should log permission checks', async () => {
    // Arrange
    const userPermissions = [Permission.READ_DASHBOARD];
    
    // Act
    permissionManager.hasPermission(Permission.READ_DASHBOARD, userPermissions);
    const logs = permissionLogger.getLogs();
    
    // Assert
    expect(logs.length).toBeGreaterThan(0);
    expect(logs[0].permission).toBe(Permission.READ_DASHBOARD);
  });

  it('should filter logs by user', async () => {
    // Arrange
    await permissionLogger.log('user1', Permission.READ_DASHBOARD, true);
    await permissionLogger.log('user2', Permission.READ_DASHBOARD, true);
    
    // Act
    const userLogs = permissionLogger.getLogsByUser('user1');
    
    // Assert
    expect(userLogs.length).toBe(1);
    expect(userLogs[0].userId).toBe('user1');
  });

  it('should filter logs by permission', async () => {
    // Arrange
    await permissionLogger.log('user1', Permission.READ_DASHBOARD, true);
    await permissionLogger.log('user1', Permission.MANAGE_SYSTEM, true);
    
    // Act
    const permissionLogs = permissionLogger.getLogsByPermission(Permission.READ_DASHBOARD);
    
    // Assert
    expect(permissionLogs.length).toBe(1);
    expect(permissionLogs[0].permission).toBe(Permission.READ_DASHBOARD);
  });
}); 