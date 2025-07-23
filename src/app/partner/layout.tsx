import { ReactNode } from 'react'

interface PartnerLayoutProps {
  children: ReactNode
}

export default function PartnerLayout({ children }: PartnerLayoutProps) {
  // Remove o layout customizado para usar o MainLayout global
  return <>{children}</>
}