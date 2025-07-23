'use client'

import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { UserRole, Permission } from '@/types/auth'
import { AcessoNegado } from '@/components/template/AcessoNegado/AcessoNegado'

interface SetorLayoutProps {
  children: React.ReactNode
  allowedRoles: UserRole[]
  requiredPermissions?: Permission[]
}

export const SetorLayout: React.FC<SetorLayoutProps> = ({ children, allowedRoles, requiredPermissions }) => {
  const { user } = useAuth()

  if (!user || !allowedRoles.includes(user.role)) {
    return (
      <AcessoNegado 
        message="Você não tem permissão para acessar esta área."
      />
    )
  }

  if (requiredPermissions && !requiredPermissions.every(permission => user.permissions?.includes(permission))) {
    return (
      <AcessoNegado 
        message="Você não tem as permissões necessárias para acessar esta área."
      />
    )
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  )
} 