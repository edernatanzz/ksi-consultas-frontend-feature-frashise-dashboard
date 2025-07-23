import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import UserModalHeader from '../UserModalHeader'

// Mock do Button component
vi.mock('../Button/Button', () => ({
  default: vi.fn(({ onClick, variant, size, icon }) => (
    <button 
      className={`ksi-button ksi-button--${variant} ksi-button--${size}`}
      onClick={onClick}
    >
      {icon && <span data-testid="x-icon">X</span>}
    </button>
  ))
}))

// Mock do ícone X
vi.mock('lucide-react', () => ({
  X: vi.fn(() => <span data-testid="x-icon">X</span>)
}))

describe('UserModalHeader', () => {
  const mockOnClose = vi.fn()
  const mockUser = {
    name: 'João Silva',
    email: 'joao@example.com'
  }

  const defaultProps = {
    mode: 'create' as const,
    user: null,
    onClose: mockOnClose
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('When mode is create', () => {
    it('then displays "Novo Usuário" title', () => {
      // Arrange & Act
      render(<UserModalHeader {...defaultProps} mode="create" />)

      // Assert
      expect(screen.getByText('Novo Usuário')).toBeInTheDocument()
    })
  })

  describe('When mode is edit', () => {
    it('then displays "Editar Usuário" title', () => {
      // Arrange & Act
      render(<UserModalHeader {...defaultProps} mode="edit" />)

      // Assert
      expect(screen.getByText('Editar Usuário')).toBeInTheDocument()
    })
  })

  describe('When mode is view', () => {
    it('then displays "Visualizar Usuário" title', () => {
      // Arrange & Act
      render(<UserModalHeader {...defaultProps} mode="view" />)

      // Assert
      expect(screen.getByText('Visualizar Usuário')).toBeInTheDocument()
    })
  })

  describe('When user is provided', () => {
    it('then displays user name and email', () => {
      // Arrange & Act
      render(<UserModalHeader {...defaultProps} user={mockUser} />)

      // Assert
      expect(screen.getByText('João Silva - joao@example.com')).toBeInTheDocument()
    })
  })

  describe('When user is null', () => {
    it('then does not display user information', () => {
      // Arrange & Act
      render(<UserModalHeader {...defaultProps} user={null} />)

      // Assert
      expect(screen.queryByText(/João Silva/)).not.toBeInTheDocument()
      expect(screen.queryByText(/joao@example.com/)).not.toBeInTheDocument()
    })
  })

  describe('When close button is clicked', () => {
    it('then calls onClose handler', () => {
      // Arrange
      render(<UserModalHeader {...defaultProps} />)

      // Act
      const closeButton = document.querySelector('.ksi-button--ghost')
      fireEvent.click(closeButton!)

      // Assert
      expect(mockOnClose).toHaveBeenCalledTimes(1)
    })
  })

  describe('When close button renders', () => {
    it('then has X icon', () => {
      // Arrange & Act
      render(<UserModalHeader {...defaultProps} />)

      // Assert
      expect(screen.getByTestId('x-icon')).toBeInTheDocument()
    })
  })

  describe('When header container renders', () => {
    it('then has correct styling classes', () => {
      // Arrange & Act
      render(<UserModalHeader {...defaultProps} />)

      // Assert
      const headerContainer = document.querySelector('.border-b.border-gray-200')
      expect(headerContainer).toBeInTheDocument()
      expect(headerContainer).toHaveClass('flex', 'items-center', 'justify-between')
    })
  })
})