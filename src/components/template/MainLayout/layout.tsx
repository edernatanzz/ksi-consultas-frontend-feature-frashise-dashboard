'use client'
import React, { useState } from 'react'
import Sidebar from '@/components/molecules/Sidebar/Sidebar'
import { useAuth } from '@/contexts/AuthContext'

interface MainLayoutProps {
  children: React.ReactNode
}

// Atom - Mobile Header
const MobileHeader: React.FC<{
  onMenuClick: () => void
}> = ({ onMenuClick }) => (
  <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
    <button
      onClick={onMenuClick}
      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
      aria-label="Abrir menu"
    >
      <span className="material-icons text-[24px]">menu</span>
    </button>
    <div className="text-lg font-medium text-gray-800">
      KSI CONSULTAS
    </div>
    <div className="w-10"></div>
  </div>
)

// Molecule - Desktop Sidebar Container
const DesktopSidebar: React.FC = () => (
  <div
    data-testid="sidebar-container"
    className="hidden lg:block w-[275px] h-full shrink-0"
  >
    <Sidebar
      isOpen={true}
      onClose={() => {}}
    />
  </div>
)

// Molecule - Mobile Sidebar Container
const MobileSidebar: React.FC<{
  isOpen: boolean
  onClose: () => void
}> = ({ isOpen, onClose }) => (
  <div className="lg:hidden">
    <Sidebar
      isOpen={isOpen}
      onClose={onClose}
    />
  </div>
)

// Molecule - Content Area
const ContentArea: React.FC<{
  children: React.ReactNode
  onMenuClick: () => void
}> = ({ children, onMenuClick }) => (
  <div
    data-testid="content-container"
    className="flex-1 flex flex-col overflow-hidden"
  >
    <MobileHeader onMenuClick={onMenuClick} />
    <div className="flex-1 overflow-auto">
      {children}
    </div>
  </div>
)

// Organism - Dashboard Layout
const DashboardLayout: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  return (
    <div
      role="main-layout"
      className="flex h-screen w-screen overflow-hidden bg-white text-secondary-800"
    >
      <DesktopSidebar />
      <MobileSidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      <ContentArea onMenuClick={toggleSidebar}>
        {children}
      </ContentArea>
    </div>
  )
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAuth()

  // Se não está autenticado, renderiza as children diretamente (para permitir a página de login)
  if (!isAuthenticated) {
    return <>{children}</>
  }

  // Se está autenticado, usa o layout do dashboard
  return <DashboardLayout>{children}</DashboardLayout>
}

export default MainLayout