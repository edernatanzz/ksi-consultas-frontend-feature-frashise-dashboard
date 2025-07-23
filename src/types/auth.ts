export enum UserRole {
  ADMIN = 'admin',
  FINANCEIRO = 'financeiro', 
  SUPORTE = 'suporte',
  DEVS = 'devs',
  MARKETING = 'marketing',
  USER = "USER",
  FRANCHISEE = 'franchisee',
  PARTNER = 'partner'
}

// Novos tipos para os 3 ambientes principais
export enum UserEnvironment {
  KSI = 'ksi',
  FRANCHISEE = 'franchisee', 
  PARTNER = 'partner'
}

// Interface para perfis de usuário com booleanos (apenas um pode ser true)
export interface UserProfile {
  isKsi: boolean;
  isFranchisee: boolean;
  isPartner: boolean;
}

export enum Permission {
  // Permissões gerais
  READ_DASHBOARD = 'read_dashboard',
  READ_REPORTS = 'read_reports',
  WRITE_REPORTS = 'write_reports',
  DELETE_REPORTS = 'delete_reports',
  
  // Permissões específicas por categoria
  READ_BANCARIO = 'read_bancario',
  WRITE_BANCARIO = 'write_bancario',
  READ_VEICULAR = 'read_veicular',
  WRITE_VEICULAR = 'write_veicular',
  READ_LOCALIZACAO = 'read_localizacao',
  WRITE_LOCALIZACAO = 'write_localizacao',
  READ_JURIDICO = 'read_juridico',
  WRITE_JURIDICO = 'write_juridico',
  READ_COMERCIAL = 'read_comercial',
  WRITE_COMERCIAL = 'write_comercial',
  
  // Permissões administrativas
  MANAGE_USERS = 'manage_users',
  MANAGE_PERMISSIONS = 'manage_permissions',
  MANAGE_SYSTEM = 'manage_system',
  
  // Permissões de relatórios específicos
  EXPORT_DATA = 'export_data',
  VIEW_ANALYTICS = 'view_analytics',
  ADVANCED_SEARCH = 'advanced_search',
  WRITE_USERS = "WRITE_USERS"
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  permissions: Permission[];
  profile: UserProfile;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasPermission: (permission: Permission) => boolean;
  hasRole: (role: UserRole) => boolean;
  canAccess: (requiredPermissions: Permission[]) => boolean;
  loading: boolean;
  
  // === FUNÇÕES DOS 3 AMBIENTES ===
  getActiveEnvironment: () => UserEnvironment | null;
  canAccessEnvironment: (environment: UserEnvironment) => boolean;
  getUserProfile: () => UserProfile | null;
  getDefaultRedirectPath: () => string;
}

export interface RolePermissions {
  [UserRole.ADMIN]: Permission[];
  [UserRole.FINANCEIRO]: Permission[];
  [UserRole.SUPORTE]: Permission[];
  [UserRole.DEVS]: Permission[];
  [UserRole.MARKETING]: Permission[];
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token?: string;
  refreshToken?: string;
}

// === FUNÇÕES UTILITÁRIAS PARA OS 3 AMBIENTES ===

// Valida se apenas um perfil está ativo
export function validateSingleProfile(profile: UserProfile): boolean {
  const activeProfiles = [profile.isKsi, profile.isFranchisee, profile.isPartner].filter(Boolean);
  return activeProfiles.length === 1;
}

// Retorna qual ambiente está ativo
export function getActiveProfile(profile: UserProfile): UserEnvironment | null {
  if (!validateSingleProfile(profile)) return null;
  
  if (profile.isKsi) return UserEnvironment.KSI;
  if (profile.isFranchisee) return UserEnvironment.FRANCHISEE;
  if (profile.isPartner) return UserEnvironment.PARTNER;
  
  return null;
}

// Cria um profile baseado no role (para compatibilidade)
export function createProfile(role: UserRole): UserProfile {
  switch (role) {
    case UserRole.FRANCHISEE:
      return { isKsi: false, isFranchisee: true, isPartner: false };
    case UserRole.PARTNER:
      return { isKsi: false, isFranchisee: false, isPartner: true };
    default:
      // Admin, financeiro, suporte, devs, marketing ficam no KSI
      return { isKsi: true, isFranchisee: false, isPartner: false };
  }
}

// Retorna o path de redirecionamento padrão baseado no perfil
export function getDefaultRedirectPath(profile: UserProfile): string {
  const activeEnvironment = getActiveProfile(profile);
  
  switch (activeEnvironment) {
    case UserEnvironment.KSI:
      return '/ksi/';
    case UserEnvironment.FRANCHISEE:
      return '/franchisee/';
    case UserEnvironment.PARTNER:
      return '/partner/';
    default:
      return '/acesso-negado';
  }
}

// Verifica se o usuário pode acessar um ambiente específico
export function canAccessEnvironment(profile: UserProfile, environment: UserEnvironment): boolean {
  switch (environment) {
    case UserEnvironment.KSI:
      return profile.isKsi;
    case UserEnvironment.FRANCHISEE:
      return profile.isFranchisee;
    case UserEnvironment.PARTNER:
      return profile.isPartner;
    default:
      return false;
  }
}