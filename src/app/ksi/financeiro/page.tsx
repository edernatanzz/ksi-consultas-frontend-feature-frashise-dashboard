'use client'

import { SetorLayout } from '@/components/template/SetorLayout/layout'
import { UserRole } from '@/types/auth'

export default function FinanceiroPage() {
  return (
    <SetorLayout allowedRoles={[UserRole.ADMIN, UserRole.DEVS, UserRole.FINANCEIRO]}>
      <h1 className="text-2xl font-bold mb-4">Painel Financeiro</h1>
      <p className="text-gray-600">
        Bem-vindo ao painel financeiro. Aqui você tem acesso às ferramentas financeiras.
      </p>
    </SetorLayout>
  )
} 