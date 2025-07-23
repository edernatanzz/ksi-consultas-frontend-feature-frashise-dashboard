'use client';
import React, { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Permission, UserRole } from '@/types/auth';
import { toast } from 'react-toastify';
import { AcessoNegado } from '@/components/template/AcessoNegado/AcessoNegado';

interface RouteGuardProps {
  children: ReactNode;
  requiredPermissions?: Permission[];
  allowedRoles?: UserRole[];
  fallbackPath?: string;
  showAccessDenied?: boolean;
}

export const RouteGuard: React.FC<RouteGuardProps> = ({
  children,
  requiredPermissions = [],
  allowedRoles = [],
  fallbackPath = '/',
  showAccessDenied = true
}) => {
  const { isAuthenticated, canAccess, loading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      router.push(fallbackPath);
      return;
    }

    // Admin tem acesso TOTAL e IRRESTRITO - pula todas as validações
    if (user?.role === UserRole.ADMIN) {
      return;
    }

    if (requiredPermissions.length > 0 && !canAccess(requiredPermissions)) {
      if (showAccessDenied) {
        toast.error('Acesso negado: você não tem permissão para acessar esta página');
      }
      router.back(); 
      return;
    }
  }, [loading, isAuthenticated, canAccess, requiredPermissions, router, fallbackPath, showAccessDenied, user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Admin tem acesso TOTAL e IRRESTRITO - pula todas as validações
  if (user?.role === UserRole.ADMIN) {
    return <>{children}</>;
  }

  if (!isAuthenticated || (requiredPermissions.length > 0 && !canAccess(requiredPermissions))) {
    return null;
  }

  if (allowedRoles.length > 0 && user) {
    const hasAllowedRole = allowedRoles.includes(user.role);
    if (!hasAllowedRole) {
      if (showAccessDenied) {
        toast.error('Acesso negado: você não tem o perfil necessário para acessar esta página');
      }
      return <AcessoNegado message="Você não tem o perfil necessário para acessar esta página." />;
    }
  }

  if (requiredPermissions.length > 0 && !canAccess(requiredPermissions)) {
    if (showAccessDenied) {
      toast.error('Acesso negado: você não tem permissão para acessar esta página');
    }
    return <AcessoNegado />;
  }

  return <>{children}</>;
};

interface PermissionGuardProps {
  children: ReactNode;
  requiredPermissions: Permission[];
  fallback?: ReactNode;
  mode?: 'any' | 'all';
}

export const PermissionGuard: React.FC<PermissionGuardProps> = ({
  children,
  requiredPermissions,
  fallback = null,
  mode = 'any'
}) => {
  const { user, hasPermission } = useAuth();

  if (!user) {
    return <>{fallback}</>;
  }

  const hasAccess = mode === 'all'
    ? requiredPermissions.every(permission => hasPermission(permission))
    : requiredPermissions.some(permission => hasPermission(permission));

  return hasAccess ? <>{children}</> : <>{fallback}</>;
};

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: UserRole[];
  fallback?: ReactNode;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({
  children,
  allowedRoles,
  fallback = null
}) => {
  const { user } = useAuth();

  if (!user || !allowedRoles.includes(user.role)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};