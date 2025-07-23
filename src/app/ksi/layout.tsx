import { ReactNode } from 'react'

interface KSILayoutProps {
  children: ReactNode
}

export default function KSILayout({ children }: KSILayoutProps) {
  // Remove o layout customizado para usar o MainLayout global
  return <>{children}</>
}