// contexts/AuthContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User, 
  UserRole, 
  Permission, 
  AuthContextType, 
  UserProfile,
  UserEnvironment,
  getActiveProfile,
  canAccessEnvironment,
  getDefaultRedirectPath
} from '@/types/auth';
import { getPermissionsByRole } from '@/config/rolePermissions';
import { toast } from 'react-toastify';

// Mock de usuários dos 3 ambientes separados
const MOCK_USERS = [
  // === AMBIENTE KSI ===
  {
    id: '1',
    email: 'admin@ksi.com',
    password: '123456',
    name: 'Administrador KSI',
    role: UserRole.ADMIN,
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
    profile: {
      isKsi: true,
      isFranchisee: false,
      isPartner: false
    }
  },
  {
    id: '2',
    email: 'financeiro@ksi.com',
    password: '123456',
    name: 'Gerente Financeiro KSI',
    role: UserRole.FINANCEIRO,
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
      profile: {
        isKsi: true,
        isFranchisee: false,
        isPartner: false
      }
  },
  {
    id: '3',
    email: 'suporte@ksi.com',
    password: '123456',
    name: 'Analista de Suporte KSI',
    role: UserRole.SUPORTE,
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
    profile: {
      isKsi: true,
      isFranchisee: false,
      isPartner: false
    }
  },
  {
    id: '4',
    email: 'dev@ksi.com',
    password: '123456', 
    name: 'Desenvolvedor Senior KSI',
    role: UserRole.DEVS,
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
    profile: {
      isKsi: true,
      isFranchisee: false,
      isPartner: false
    }
  },
  {
    id: '5',
    email: 'marketing@ksi.com',
    password: '123456',
    name: 'Analista de Marketing KSI',
    role: UserRole.MARKETING,
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
    profile: {
      isKsi: true,
      isFranchisee: false,
      isPartner: false
    }
  },

  // === AMBIENTE FRANCHISEE ===
  {
    id: '10',
    email: 'franquia@exemplo.com',
    password: '123456',
    name: 'Gerente da Franquia São Paulo',
    role: UserRole.FRANCHISEE,
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
    profile: {
      isKsi: false,
      isFranchisee: true,
      isPartner: false
    }
  },
  {
    id: '11',
    email: 'franquia.rio@exemplo.com',
    password: '123456',
    name: 'Operador Franquia Rio de Janeiro',
    role: UserRole.FRANCHISEE,
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
    profile: {
      isKsi: false,
      isFranchisee: true,
      isPartner: false
    }
  },
  {
    id: '12',
    email: 'franquia.bh@exemplo.com',
    password: '123456',
    name: 'Supervisor Franquia Belo Horizonte',
    role: UserRole.FRANCHISEE,
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
    profile: {
      isKsi: false,
      isFranchisee: true,
      isPartner: false
    }
  },

  // === AMBIENTE PARTNER ===
  {
    id: '20',
    email: 'parceiro@empresa.com',
    password: '123456',
    name: 'Gestor de Parceria TechCorp',
    role: UserRole.PARTNER,
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
    profile: {
      isKsi: false,
      isFranchisee: false,
      isPartner: true
    }
  },
  {
    id: '21',
    email: 'api@integrator.com',
    password: '123456',
    name: 'Integrador API Solutions',
    role: UserRole.PARTNER,
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
    profile: {
      isKsi: false,
      isFranchisee: false,
      isPartner: true
    }
  },
  {
    id: '22',
    email: 'reseller@vendas.com',
    password: '123456',
    name: 'Representante Comercial Plus',
    role: UserRole.PARTNER,
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
    profile: {
      isKsi: false,
      isFranchisee: false,
      isPartner: true
    }
  },

  // === ADMIN KSI (tem role ADMIN mas só acessa ambiente KSI) ===
  {
    id: '100',
    email: 'superadmin@ksi.com',
    password: '123456',
    name: 'Super Administrador KSI',
    role: UserRole.ADMIN,
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
    profile: {
      isKsi: true,
      isFranchisee: false,
      isPartner: false
    }
  }
];

const AUTH_STORAGE_KEY = 'ksi_auth_user';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        
        // Se não tem profile, criar baseado no role (para usuários existentes)
        if (!parsedUser.profile) {
          parsedUser.profile = {
            isKsi: parsedUser.role === UserRole.ADMIN || 
                   parsedUser.role === UserRole.DEVS ||
                   parsedUser.role === UserRole.MARKETING ||
                   parsedUser.role === UserRole.SUPORTE ||
                   parsedUser.role === UserRole.FINANCEIRO,
            isFranchisee: parsedUser.role === UserRole.FRANCHISEE,
            isPartner: parsedUser.role === UserRole.PARTNER
          };
        }
        
        const userWithPermissions = {
          ...parsedUser,
          permissions: getPermissionsByRole(parsedUser.role)
        };
        setUser(userWithPermissions);
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = MOCK_USERS.find(
        u => u.email === email && u.password === password
      );

      if (!mockUser) {
        throw new Error('Credenciais inválidas');
      }

      if (!mockUser.isActive) {
        throw new Error('Usuário inativo');
      }

      // Usar o profile do mock user (que já vem configurado corretamente)
      const authenticatedUser: User = {
        id: mockUser.id,
        email: mockUser.email,
        name: mockUser.name,
        role: mockUser.role,
        permissions: getPermissionsByRole(mockUser.role),
        profile: mockUser.profile, // Usar o profile do mock user
        isActive: mockUser.isActive,
        lastLogin: new Date(),
        createdAt: mockUser.createdAt,
        updatedAt: new Date()
      };

      setUser(authenticatedUser);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authenticatedUser));
      
      // Configurar o cookie user_role
      document.cookie = `user_role=${authenticatedUser.role}; path=/`;
      
      // Configurar o cookie user_profile com o profile correto
      document.cookie = `user_profile=${JSON.stringify(mockUser.profile)}; path=/`;
      
      toast.success(`Bem-vindo, ${authenticatedUser.name}!`);
      
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro interno';
      toast.error(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = (): void => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    // Remover os cookies user_role e user_profile
    document.cookie = 'user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'user_profile=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    toast.info('Logout realizado com sucesso');
    
    // Redirecionar para a página de login
    router.push('/');
  };

  const hasPermission = (permission: Permission): boolean => {
    return user?.permissions.includes(permission) || false;
  };

  const hasRole = (role: UserRole): boolean => {
    return user?.role === role;
  };

  const canAccess = (requiredPermissions: Permission[]): boolean => {
    if (!user) return false;
    
    // Admin tem acesso TOTAL e IRRESTRITO a tudo
    if (user.role === UserRole.ADMIN) {
      return true;
    }
    
    if (!requiredPermissions.length) return false;
    
    return requiredPermissions.some(permission => 
      user.permissions.includes(permission)
    );
  };

  // === NOVAS FUNÇÕES DOS 3 AMBIENTES ===
  const getActiveEnvironmentFunc = (): UserEnvironment | null => {
    if (!user?.profile) return null;
    return getActiveProfile(user.profile);
  };

  const canAccessEnvironmentFunc = (environment: UserEnvironment): boolean => {
    if (!user?.profile) return false;
    return canAccessEnvironment(user.profile, environment);
  };

  const getUserProfileFunc = (): UserProfile | null => {
    return user?.profile || null;
  };

  const getDefaultRedirectPathFunc = (): string => {
    if (!user?.profile) return '/acesso-negado';
    return getDefaultRedirectPath(user.profile);
  };

  const contextValue: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    hasPermission,
    hasRole,
    canAccess,
    loading,
    
    // === FUNÇÕES DOS 3 AMBIENTES ===
    getActiveEnvironment: getActiveEnvironmentFunc,
    canAccessEnvironment: canAccessEnvironmentFunc,
    getUserProfile: getUserProfileFunc,
    getDefaultRedirectPath: getDefaultRedirectPathFunc
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};