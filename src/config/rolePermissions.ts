import { UserRole, Permission, RolePermissions } from '@/types/auth';

//  hierárquia
export const ROLE_PERMISSIONS: RolePermissions = {
  [UserRole.ADMIN]: [
    Permission.READ_DASHBOARD,
    Permission.READ_REPORTS,
    Permission.WRITE_REPORTS,
    Permission.DELETE_REPORTS,
    Permission.READ_BANCARIO,
    Permission.WRITE_BANCARIO,
    Permission.READ_VEICULAR,
    Permission.WRITE_VEICULAR,
    Permission.READ_LOCALIZACAO,
    Permission.WRITE_LOCALIZACAO,
    Permission.READ_JURIDICO,
    Permission.WRITE_JURIDICO,
    Permission.READ_COMERCIAL,
    Permission.WRITE_COMERCIAL,
    Permission.MANAGE_USERS,
    Permission.MANAGE_PERMISSIONS,
    Permission.MANAGE_SYSTEM,
    Permission.EXPORT_DATA,
    Permission.VIEW_ANALYTICS,
    Permission.ADVANCED_SEARCH
  ],

  [UserRole.FINANCEIRO]: [
    Permission.READ_DASHBOARD,
    Permission.READ_REPORTS,
    Permission.WRITE_REPORTS,
    Permission.READ_BANCARIO,
    Permission.WRITE_BANCARIO,
    Permission.READ_COMERCIAL,
    Permission.WRITE_COMERCIAL,
    Permission.EXPORT_DATA,
    Permission.VIEW_ANALYTICS,
    Permission.ADVANCED_SEARCH
  ],

  [UserRole.SUPORTE]: [
    Permission.READ_DASHBOARD,
    Permission.READ_REPORTS,
    Permission.READ_BANCARIO,
    Permission.READ_VEICULAR,
    Permission.READ_LOCALIZACAO,
    Permission.READ_JURIDICO,
    Permission.READ_COMERCIAL,
    Permission.EXPORT_DATA
  ],

  [UserRole.DEVS]: [
    Permission.READ_DASHBOARD,
    Permission.READ_REPORTS,
    Permission.WRITE_REPORTS,
    Permission.READ_BANCARIO,
    Permission.WRITE_BANCARIO,
    Permission.READ_VEICULAR,
    Permission.WRITE_VEICULAR,
    Permission.READ_LOCALIZACAO,
    Permission.WRITE_LOCALIZACAO,
    Permission.READ_JURIDICO,
    Permission.WRITE_JURIDICO,
    Permission.READ_COMERCIAL,
    Permission.WRITE_COMERCIAL,
    Permission.MANAGE_SYSTEM,
    Permission.EXPORT_DATA,
    Permission.VIEW_ANALYTICS,
    Permission.ADVANCED_SEARCH
  ],

  [UserRole.MARKETING]: [
    Permission.READ_DASHBOARD,
    Permission.READ_REPORTS,
    Permission.READ_COMERCIAL,
    Permission.WRITE_COMERCIAL,
    Permission.VIEW_ANALYTICS,
    Permission.EXPORT_DATA
  ]
};

// Hierarquia de roles 
export const ROLE_HIERARCHY = {
  [UserRole.ADMIN]: 5,
  [UserRole.DEVS]: 4,
  [UserRole.FINANCEIRO]: 3,
  [UserRole.SUPORTE]: 2,
  [UserRole.MARKETING]: 1
};

// permissões por role
export const getPermissionsByRole = (role: UserRole): Permission[] => {
  return ROLE_PERMISSIONS[role as keyof typeof ROLE_PERMISSIONS] || [];
};

// permissão específica
export const roleHasPermission = (role: UserRole, permission: Permission): boolean => {
  return ROLE_PERMISSIONS[role as keyof typeof ROLE_PERMISSIONS]?.includes(permission) || false;
};

// Categorias acessíveis por role
export const ACCESSIBLE_CATEGORIES = {
  [UserRole.ADMIN]: ['bancario', 'veicular', 'localizacao', 'juridico', 'comercial'],
  [UserRole.FINANCEIRO]: ['bancario', 'comercial'],
  [UserRole.SUPORTE]: ['bancario', 'veicular', 'localizacao', 'juridico', 'comercial'],
  [UserRole.DEVS]: ['bancario', 'veicular', 'localizacao', 'juridico', 'comercial'],
  [UserRole.MARKETING]: ['comercial']
};

// Rotas protegidas por permissão
export const PROTECTED_ROUTES = {
  '/dashboard': [Permission.READ_DASHBOARD],
  '/bancario': [Permission.READ_BANCARIO],
  '/veicular': [Permission.READ_VEICULAR],
  '/localizacao': [Permission.READ_LOCALIZACAO],
  '/juridico': [Permission.READ_JURIDICO],
  '/comercial': [Permission.READ_COMERCIAL],
  '/relatorios': [Permission.READ_REPORTS],
  '/admin': [Permission.MANAGE_SYSTEM],
  '/usuarios': [Permission.MANAGE_USERS]
};