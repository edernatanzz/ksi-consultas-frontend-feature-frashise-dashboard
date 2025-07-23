import { ReactNode } from 'react'

interface FranchiseeLayoutProps {
  children: ReactNode
}

export default function FranchiseeLayout({ children }: FranchiseeLayoutProps) {
  // usar o MainLayout global
  return <>{children}</>
}