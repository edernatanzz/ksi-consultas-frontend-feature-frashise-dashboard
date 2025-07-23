import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import CategoryDashboard from '../CategoryDashboard'
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: string;
  size?: string;
  startIcon?: ReactNode;
}

interface BreadcrumbItem {
  label: string;
  [key: string]: unknown;
}
interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

interface DashboardCardProps {
  card: { id: string; title: string };
}

// Mock do contexto de autenticação
vi.mock('@/contexts/AuthContext', () => ({
  useAuth: vi.fn(() => ({
    user: {
      role: 'ADMIN',
      permissions: ['READ_DASHBOARD', 'ACCESS_BANCARIO', 'ACCESS_VEICULAR']
    }
  }))
}))

// Mock das utilidades de permissão
vi.mock('@/utils/dashBoardPermissions', () => ({
  filterServicesByPermissions: vi.fn((services) => services)
}))

vi.mock('@/components/molecules/DashboardCard/DashboardCard', () => ({
  default: ({ card }: DashboardCardProps) => (
    <div data-testid={`dashboard-card-${card.id}`}>
      {card.title}
    </div>
  )
}))

vi.mock('@/components/atoms/Button/Button', () => ({
  default: ({ children, variant, size, startIcon }: ButtonProps) => (
    <button data-variant={variant} data-size={size}>
      {startIcon}
      {children}
    </button>
  )
}))

vi.mock('@/components/molecules/Breadcrumb/Breadcrumb', () => ({
  default: ({ items }: BreadcrumbProps) => (
    <div data-testid="breadcrumb">
      {items.map((item, index) => (
        <span key={index}>{item.label}</span>
      ))}
    </div>
  )
}))

// Mock data
vi.mock('@/data/dashboard', () => ({
  serviceCategories: [
    {
      id: 'bancario',
      title: 'Bancário',
      subtitle: 'Consultas bancárias'
    },
    {
      id: 'veicular',
      title: 'Veicular',
      subtitle: 'Consultas veiculares'
    },
    {
      id: 'empty-category',
      title: 'Categoria Vazia',
      subtitle: 'Sem serviços'
    }
  ],
  dashboardCardsByCategory: {
    bancario: [
      { id: 'service1', title: 'Service 1' },
      { id: 'service2', title: 'Service 2' }
    ],
    veicular: [
      { id: 'service3', title: 'Service 3' }
    ],
    'empty-category': []
  }
}))

describe('CategoryDashboard Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('When CategoryDashboard is rendered with valid categoryId', () => {
    it('then should display category title', () => {
      // Arrange
      const categoryId = 'bancario'

      // Act
      render(<CategoryDashboard categoryId={categoryId} />)

      // Assert
      const bancarioElements = screen.getAllByText('Bancário');
      expect(bancarioElements.length).toBeGreaterThan(0);
    })
  })

  describe('When CategoryDashboard is rendered with invalid categoryId', () => {
    it('then should display error message', () => {
      // Arrange
      const categoryId = 'invalid-category'

      // Act
      render(<CategoryDashboard categoryId={categoryId} />)

      // Assert
      expect(screen.getByText('Categoria não encontrada')).toBeInTheDocument()
    })
  })

  describe('When CategoryDashboard is rendered', () => {
    it('then should display breadcrumb navigation', () => {
      // Arrange
      const categoryId = 'bancario'

      // Act
      render(<CategoryDashboard categoryId={categoryId} />)

      // Assert
      expect(screen.getByTestId('breadcrumb')).toBeInTheDocument()
    })
  })

  describe('When CategoryDashboard is rendered', () => {
    it('then should display category subtitle with service count', () => {
      // Arrange
      const categoryId = 'bancario'

      // Act
      render(<CategoryDashboard categoryId={categoryId} />)

      // Assert
      expect(screen.getByText('Consultas bancárias • 2 serviços disponíveis')).toBeInTheDocument()
    })
  })

  describe('When CategoryDashboard is rendered', () => {
    it('then should display action buttons', () => {
      // Arrange
      const categoryId = 'veicular'

      // Act
      render(<CategoryDashboard categoryId={categoryId} />)

      // Assert
      expect(screen.getByText('Buscar Serviço')).toBeInTheDocument()
      expect(screen.getByText('Ver Histórico')).toBeInTheDocument()
    })
  })

  describe('When CategoryDashboard has services', () => {
    it('then should render all service cards', () => {
      // Arrange
      const categoryId = 'bancario'

      // Act
      render(<CategoryDashboard categoryId={categoryId} />)

      // Assert
      expect(screen.getByTestId('dashboard-card-service1')).toBeInTheDocument()
      expect(screen.getByTestId('dashboard-card-service2')).toBeInTheDocument()
    })
  })

  describe('When CategoryDashboard has no services', () => {
    it('then should display empty state message', () => {
      // Arrange
      const categoryId = 'empty-category'

      // Act
      render(<CategoryDashboard categoryId={categoryId} />)

      // Assert
      expect(screen.getByText('Nenhum serviço encontrado nesta categoria')).toBeInTheDocument()
    })
  })

  describe('When CategoryDashboard is rendered', () => {
    it('then should have correct container structure', () => {
      // Arrange
      const categoryId = 'bancario'

      // Act
      render(<CategoryDashboard categoryId={categoryId} />)

      // Assert
      const container = screen.getByTestId('category-dashboard-container')
      expect(container).toHaveClass('p-8', 'bg-ksiBeige', 'min-h-screen')
    })
  })
})