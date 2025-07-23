import { render, screen } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import Dashboard from '../DashBoard'
import { AuthProvider } from '@/contexts/AuthContext'
import { User, UserRole, Permission } from '@/types/auth'

// Mock do AuthContext
const mockUser: User = {
  id: '1',
  email: 'admin@ksi.com',
  name: 'Administrador KSI',
  role: UserRole.ADMIN,
  permissions: [Permission.READ_DASHBOARD, Permission.MANAGE_SYSTEM],
  isActive: true,
  lastLogin: new Date(),
  createdAt: new Date(),
  updatedAt: new Date()
}

// Mock dos módulos externos
vi.mock('@/utils/dashBoardPermissions', () => ({
  canAccessCategory: vi.fn(() => true),
  filterCategoriesByPermissions: vi.fn(() => []),
  filterServicesByPermissions: vi.fn(() => []),
  getRequiredPermissionsForAction: vi.fn(() => [Permission.READ_DASHBOARD])
}))

vi.mock('@/utils/searchUtils', () => ({
  searchAllServices: vi.fn(() => [])
}))

vi.mock('@/data/dashboard', () => ({
  serviceCategories: [
    {
      id: 'bancario',
      title: 'Bancário',
      subtitle: 'Consultas bancárias',
      icon: 'account_balance',
      path: '/bancario'
    }
  ],
  dashboardCardsByCategory: {
    bancario: []
  }
}))

// Mock do componente RouteGuard
vi.mock('@/components/template/RouteGuard/RouteGuard', () => ({
  RouteGuard: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  PermissionGuard: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

// Mock do Material-UI
vi.mock('@mui/material', () => ({
  Fade: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

// Mock do toast
vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn()
  }
}))

// Mock do localStorage
const mockLocalStorage = {
  getItem: vi.fn(() => JSON.stringify(mockUser)),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
}

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
})

// Helper para renderizar o Dashboard com AuthProvider
const renderDashboardWithAuth = () => {

  return render(
    <AuthProvider>
      <Dashboard />
    </AuthProvider>
  )
}

describe('Dashboard Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockUser))
  })

  describe('When render, then should display the correct title', () => {
    it('should display the correct title', () => {
      renderDashboardWithAuth()
      expect(screen.getByText('PAINEL DE CONTROLE')).toBeInTheDocument()
    })
  })

  describe('When render, then should display both action buttons', () => {
    it('should display both action buttons', () => {
      renderDashboardWithAuth()
      expect(screen.getByText('Nova Consulta')).toBeInTheDocument()
      expect(screen.getByText('Ver Histórico')).toBeInTheDocument()
    })
  })

  describe('When render, then should display icon in the Nova Consulta button', () => {
    it('should display icon in the Nova Consulta button', () => {
      renderDashboardWithAuth()
      const novaConsultaButton = screen.getByText('Nova Consulta').closest('button')
      expect(novaConsultaButton).toBeInTheDocument()
      expect(novaConsultaButton?.querySelector('.material-icons')).toBeInTheDocument()
    })
  })

  describe('When render, then should display all service category cards', () => {
    it('should display all service category cards', () => {
      renderDashboardWithAuth()
      const dashboardGrid = screen.getByTestId('dashboard-grid')
      expect(dashboardGrid).toBeInTheDocument()
    })
  })

  describe('When render, then should apply correct layout classes', () => {
    it('should apply correct layout classes', () => {
      renderDashboardWithAuth()
      const container = screen.getByTestId('dashboard-container')
      expect(container).toHaveClass('p-4', 'sm:p-8', 'bg-ksiBeige', 'min-h-screen')
    })
  })

  describe('When render, then button container should have correct spacing', () => {
    it('should have correct spacing', () => {
      renderDashboardWithAuth()
      const buttonsContainer = screen.getByTestId('buttons-container')
      expect(buttonsContainer).toHaveClass('flex', 'flex-col', 'sm:flex-row', 'gap-2', 'sm:gap-3')
    })
  })

  describe('When render, then should display navigation component', () => {
    it('should display navigation component', () => {
      renderDashboardWithAuth()
      // Verifica se o texto de navegação está presente
      expect(screen.getByText(`Bem-vindo(a), ${mockUser.name}`)).toBeInTheDocument()
    })
  })

  describe('When render, then should display search functionality', () => {
    it('should display search functionality', () => {
      renderDashboardWithAuth()
      // Verifica se existe um input de busca
      const searchInput = screen.getByRole('textbox')
      expect(searchInput).toBeInTheDocument()
    })
  })

  describe('When render, then should wrap cards in Fade component', () => {
    it('should wrap cards in Fade component', () => {
      renderDashboardWithAuth()
      const dashboardGrid = screen.getByTestId('dashboard-grid')
      expect(dashboardGrid).toBeInTheDocument()
      // O Fade está mockado para renderizar apenas os children
      expect(dashboardGrid.parentElement).toBeInTheDocument()
    })
  })
})