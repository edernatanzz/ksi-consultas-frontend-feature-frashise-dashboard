import { Permission } from '@/types/auth';
import { permissionCache } from './cache';
import { validatePermissions, validatePermissionHierarchy, validateCategoryAccess } from './validation';
import { permissionLogger } from './logging';

export class PermissionManager {
  public hasPermission(permission: Permission, userPermissions: Permission[]): boolean {
    // Verificar cache primeiro
    const cachedResult = permissionCache.get(permission, userPermissions);
    if (cachedResult !== null) {
      return cachedResult;
    }

    // Validar permissão
    const validationResult = validatePermissions([permission]);
    if (!validationResult.isValid) {
      permissionLogger.log('system', permission, false, 'validation_error', { errors: validationResult.errors });
      return false;
    }

    // Verificar hierarquia
    const hasAccess = validatePermissionHierarchy(permission, userPermissions);
    
    // Registrar resultado
    permissionLogger.log('system', permission, hasAccess);
    
    // Atualizar cache
    permissionCache.set(permission, userPermissions, hasAccess);
    
    return hasAccess;
  }

  public canAccessCategory(categoryId: string, userPermissions: Permission[]): boolean {
    const hasAccess = validateCategoryAccess(categoryId, userPermissions);
    permissionLogger.log('system', Permission.READ_DASHBOARD, hasAccess, 'category_access', { categoryId });
    return hasAccess;
  }

  public getRequiredPermissionsForAction(action: string): Permission[] {
    switch (action) {
      case 'new_consultation':
        return [
          Permission.WRITE_BANCARIO,
          Permission.WRITE_VEICULAR,
          Permission.WRITE_LOCALIZACAO,
          Permission.WRITE_JURIDICO,
          Permission.WRITE_COMERCIAL
        ];
      case 'view_history':
        return [Permission.READ_REPORTS];
      case 'export_data':
        return [Permission.EXPORT_DATA];
      case 'advanced_search':
        return [Permission.ADVANCED_SEARCH];
      case 'view_analytics':
        return [Permission.VIEW_ANALYTICS];
      default:
        return [];
    }
  }

  public hasAnyWritePermission(userPermissions: Permission[]): boolean {
    const writePermissions = [
      Permission.WRITE_BANCARIO,
      Permission.WRITE_VEICULAR,
      Permission.WRITE_LOCALIZACAO,
      Permission.WRITE_JURIDICO,
      Permission.WRITE_COMERCIAL
    ];
    return writePermissions.some(permission => this.hasPermission(permission, userPermissions));
  }

  public getAccessibleCategories(userPermissions: Permission[]): string[] {
    const categories = ['bancario', 'veicular', 'localizacao', 'juridico', 'comercial'];
    return categories.filter(category => this.canAccessCategory(category, userPermissions));
  }
}

export const permissionManager = new PermissionManager();

// Re-export types
export * from './types';