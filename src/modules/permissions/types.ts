import { Permission, UserRole } from '@/types/auth';

export interface PermissionCheck {
  permission: Permission;
  granted: boolean;
  timestamp: Date;
}

export interface PermissionCache {
  [key: string]: {
    result: boolean;
    timestamp: Date;
  };
}

export interface CategoryPermission {
  categoryId: string;
  readPermission: Permission;
  writePermission: Permission;
}

export interface RolePermissionConfig {
  role: UserRole;
  permissions: Permission[];
  inheritsFrom?: UserRole[];
}

export interface PermissionValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface PermissionLog {
  userId: string;
  permission: Permission;
  success: boolean;
  timestamp: Date;
  context?: string;
  metadata?: Record<string, unknown>;
} 