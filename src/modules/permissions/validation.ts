import { Permission } from '@/types/auth';
import { PermissionValidationResult } from './types';

export const validatePermissions = (permissions: Permission[]): PermissionValidationResult => {
  const validPermissions = Object.values(Permission);
  const errors: string[] = [];

  permissions.forEach(permission => {
    if (!validPermissions.includes(permission)) {
      errors.push(`Permissão inválida: ${permission}`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validatePermissionHierarchy = (
  permission: Permission,
  userPermissions: Permission[]
): boolean => {
  // Implementar lógica de hierarquia de permissões
  // Por exemplo, se o usuário tem MANAGE_SYSTEM, ele tem acesso a todas as permissões
  if (userPermissions.includes(Permission.MANAGE_SYSTEM)) {
    return true;
  }

  // Verificar outras regras de hierarquia
  return userPermissions.includes(permission);
};

export const validateCategoryAccess = (
  categoryId: string,
  userPermissions: Permission[]
): boolean => {
  const categoryPermissions = {
    'bancario': [Permission.READ_BANCARIO, Permission.WRITE_BANCARIO],
    'veicular': [Permission.READ_VEICULAR, Permission.WRITE_VEICULAR],
    'localizacao': [Permission.READ_LOCALIZACAO, Permission.WRITE_LOCALIZACAO],
    'juridico': [Permission.READ_JURIDICO, Permission.WRITE_JURIDICO],
    'comercial': [Permission.READ_COMERCIAL, Permission.WRITE_COMERCIAL]
  };

  const permissions = categoryPermissions[categoryId as keyof typeof categoryPermissions];
  if (!permissions) {
    return false;
  }

  return permissions.some(permission => userPermissions.includes(permission));
}; 