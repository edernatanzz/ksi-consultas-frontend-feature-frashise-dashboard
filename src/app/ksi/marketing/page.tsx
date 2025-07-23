'use client'

import { SetorLayout } from '@/components/template/SetorLayout/layout'
import { UserRole } from '@/types/auth'

export default function MarketingPage() {
  return (
    <SetorLayout allowedRoles={[UserRole.ADMIN, UserRole.DEVS, UserRole.MARKETING]}>
      <h1 className="text-2xl font-bold mb-4">Painel de Marketing</h1>
      <p className="text-gray-600">
        Bem-vindo ao painel de marketing. Aqui você tem acesso às ferramentas de marketing.
      </p>
    </SetorLayout>
  )
} 