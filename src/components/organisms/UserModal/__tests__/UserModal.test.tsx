import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import UserModal from '../UserModal'

describe('UserModal', () => {
  const defaultProps = {
    user: null,
    mode: 'create' as const,
    onClose: vi.fn(),
    onSave: vi.fn(),
    isOpen: true
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('When modal is closed', () => {
    it('then does not render modal content', () => {
      // Arrange
      const props = { ...defaultProps, isOpen: false }

      // Act
      render(<UserModal {...props} />)

      // Assert
      expect(screen.queryByText('Novo Usuário')).not.toBeInTheDocument()
    })
  })

  describe('When modal is open in create mode', () => {
    it('then displays create modal title', () => {
      // Arrange & Act
      render(<UserModal {...defaultProps} />)

      // Assert
      expect(screen.getByText('Novo Usuário')).toBeInTheDocument()
    })
  })

  describe('When modal is open in edit mode', () => {
    it('then displays edit modal title', () => {
      // Arrange
      const user = { 
        id: '1', name: 'John', email: 'john@test.com', profile: 'admin' as const,
        department: 'IT', position: 'Dev', status: 'active' as const,
        lastAccess: '2024-01-01', createdAt: '2024-01-01', phone: '123',
        cpf: '123', hasCustomPermissions: false, dailyQueryLimit: 1000,
        monthlyCostLimit: 500, queriesThisMonth: 0, costThisMonth: 0
      }
      const props = { ...defaultProps, mode: 'edit' as const, user }

      // Act
      render(<UserModal {...props} />)

      // Assert
      expect(screen.getByText('Editar Usuário')).toBeInTheDocument()
    })
  })

  describe('When modal is open in view mode', () => {
    it('then displays view modal title', () => {
      // Arrange
      const user = { 
        id: '1', name: 'John', email: 'john@test.com', profile: 'admin' as const,
        department: 'IT', position: 'Dev', status: 'active' as const,
        lastAccess: '2024-01-01', createdAt: '2024-01-01', phone: '123',
        cpf: '123', hasCustomPermissions: false, dailyQueryLimit: 1000,
        monthlyCostLimit: 500, queriesThisMonth: 0, costThisMonth: 0
      }
      const props = { ...defaultProps, mode: 'view' as const, user }

      // Act
      render(<UserModal {...props} />)

      // Assert
      expect(screen.getByText('Visualizar Usuário')).toBeInTheDocument()
    })
  })
})