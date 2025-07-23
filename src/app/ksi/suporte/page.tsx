'use client'

import { SetorLayout } from '@/components/template/SetorLayout/layout'
import { UserRole } from '@/types/auth'

export default function SuportePage() {
  return (
    <SetorLayout allowedRoles={[UserRole.ADMIN, UserRole.DEVS, UserRole.SUPORTE]}>
      <h1 className="text-2xl font-bold mb-4">Painel de Suporte</h1>
      <p className="text-gray-600">
        Bem-vindo ao painel de suporte. Aqui você tem acesso às ferramentas de suporte.
      </p>
    </SetorLayout>
  )
} 