import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { SetorLayout } from '../layout'
import { UserRole, Permission } from '@/types/auth'

// Mock do contexto de autenticação
const mockUseAuth = vi.fn()
vi.mock('@/contexts/AuthContext', () => ({
  useAuth: () => mockUseAuth()
}))

// Mock do componente AcessoNegado
vi.mock('@/components/template/AcessoNegado/AcessoNegado', () => ({
  AcessoNegado: vi.fn(({ message }) => (
    <div data-testid="acesso-negado">{message}</div>
  ))
}))

describe('SetorLayout', () => {
  const defaultProps = {
    allowedRoles: [UserRole.ADMIN],
    children: <div data-testid="children-content">Test Content</div>
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('When user is not authenticated', () => {
    it('then shows access denied message', () => {
      // Arrange
      mockUseAuth.mockReturnValue({ user: null })

      // Act
      render(<SetorLayout {...defaultProps} />)

      // Assert
      expect(screen.getByTestId('acesso-negado')).toBeInTheDocument()
      expect(screen.getByText('Você não tem permissão para acessar esta área.')).toBeInTheDocument()
      expect(screen.queryByTestId('children-content')).not.toBeInTheDocument()
    })
  })

  describe('When user role is not allowed', () => {
    it('then shows access denied message', () => {
      // Arrange
      const user = { 
        id: '1', 
        role: UserRole.USER, 
        permissions: [Permission.READ_DASHBOARD] 
      }
      mockUseAuth.mockReturnValue({ user })

      // Act
      render(<SetorLayout {...defaultProps} />)

      // Assert
      expect(screen.getByTestId('acesso-negado')).toBeInTheDocument()
      expect(screen.getByText('Você não tem permissão para acessar esta área.')).toBeInTheDocument()
      expect(screen.queryByTestId('children-content')).not.toBeInTheDocument()
    })
  })

  describe('When user has allowed role but missing required permissions', () => {
    it('then shows permission denied message', () => {
      // Arrange
      const user = { 
        id: '1', 
        role: UserRole.ADMIN, 
        permissions: [Permission.READ_DASHBOARD] 
      }
      mockUseAuth.mockReturnValue({ user })

      // Act
      render(
        <SetorLayout 
          {...defaultProps} 
          requiredPermissions={[Permission.WRITE_USERS]} 
        />
      )

      // Assert
      expect(screen.getByTestId('acesso-negado')).toBeInTheDocument()
      expect(screen.getByText('Você não tem as permissões necessárias para acessar esta área.')).toBeInTheDocument()
      expect(screen.queryByTestId('children-content')).not.toBeInTheDocument()
    })
  })

  describe('When user has valid role and no required permissions', () => {
    it('then renders children content', () => {
      // Arrange
      const user = { 
        id: '1', 
        role: UserRole.ADMIN, 
        permissions: [Permission.READ_DASHBOARD] 
      }
      mockUseAuth.mockReturnValue({ user })

      // Act
      render(<SetorLayout {...defaultProps} />)

      // Assert
      expect(screen.getByTestId('children-content')).toBeInTheDocument()
      expect(screen.queryByTestId('acesso-negado')).not.toBeInTheDocument()
    })
  })

  describe('When user has valid role and all required permissions', () => {
    it('then renders children content', () => {
      // Arrange
      const user = { 
        id: '1', 
        role: UserRole.ADMIN, 
        permissions: [Permission.READ_DASHBOARD, Permission.WRITE_USERS] 
      }
      mockUseAuth.mockReturnValue({ user })

      // Act
      render(
        <SetorLayout 
          {...defaultProps} 
          requiredPermissions={[Permission.READ_DASHBOARD, Permission.WRITE_USERS]} 
        />
      )

      // Assert
      expect(screen.getByTestId('children-content')).toBeInTheDocument()
      expect(screen.queryByTestId('acesso-negado')).not.toBeInTheDocument()
    })
  })

  describe('When user has multiple allowed roles', () => {
    it('then renders children if user has one of allowed roles', () => {
      // Arrange
      const user = { 
        id: '1', 
        role: UserRole.FINANCEIRO, 
        permissions: [Permission.READ_DASHBOARD] 
      }
      mockUseAuth.mockReturnValue({ user })

      // Act
      render(
        <SetorLayout allowedRoles={[UserRole.ADMIN, UserRole.FINANCEIRO]}>
          <div data-testid="children-content">Test Content</div>
        </SetorLayout>
      )

      // Assert
      expect(screen.getByTestId('children-content')).toBeInTheDocument()
      expect(screen.queryByTestId('acesso-negado')).not.toBeInTheDocument()
    })
  })
})