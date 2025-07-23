import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import UserModalFooter from '../UserModalFooter'

// Mock do Button component
vi.mock('../Button/Button', () => ({
  default: vi.fn(({ children, onClick, variant, size, icon }) => (
    <button 
      className={`ksi-button ksi-button--${variant} ksi-button--${size}`}
      onClick={onClick}
    >
      {icon && <span data-testid="save-icon">Save</span>}
      <span className="ksi-button__text">{children}</span>
    </button>
  ))
}))

// Mock do ícone Save
vi.mock('lucide-react', () => ({
  Save: vi.fn(() => <span data-testid="save-icon">Save</span>)
}))

describe('UserModalFooter', () => {
  const mockOnClose = vi.fn()
  const mockOnSave = vi.fn()

  const defaultProps = {
    isReadOnly: false,
    mode: 'create' as const,
    onClose: mockOnClose,
    onSave: mockOnSave
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('When component is in read-only mode', () => {
    it('then shows close button with "Fechar" text', () => {
      // Arrange & Act
      render(<UserModalFooter {...defaultProps} isReadOnly={true} />)

      // Assert
      expect(screen.getByText('Fechar')).toBeInTheDocument()
      expect(screen.queryByText('Cancelar')).not.toBeInTheDocument()
    })

    it('then does not show save button', () => {
      // Arrange & Act
      render(<UserModalFooter {...defaultProps} isReadOnly={true} />)

      // Assert
      expect(screen.queryByTestId('button-primary-small')).not.toBeInTheDocument()
      expect(screen.queryByText('Criar Usuário')).not.toBeInTheDocument()
      expect(screen.queryByText('Salvar Alterações')).not.toBeInTheDocument()
    })
  })

  describe('When component is not in read-only mode', () => {
    it('then shows cancel button with "Cancelar" text', () => {
      // Arrange & Act
      render(<UserModalFooter {...defaultProps} isReadOnly={false} />)

      // Assert
      expect(screen.getByText('Cancelar')).toBeInTheDocument()
      expect(screen.queryByText('Fechar')).not.toBeInTheDocument()
    })

    it('then shows save button', () => {
      // Arrange & Act
      render(<UserModalFooter {...defaultProps} isReadOnly={false} />)

      // Assert
      const saveButton = document.querySelector('.ksi-button--primary')
      expect(saveButton).toBeInTheDocument()
    })
  })

  describe('When mode is create', () => {
    it('then shows "Criar Usuário" text in save button', () => {
      // Arrange & Act
      render(<UserModalFooter {...defaultProps} mode="create" />)

      // Assert
      expect(screen.getByText('Criar Usuário')).toBeInTheDocument()
      expect(screen.queryByText('Salvar Alterações')).not.toBeInTheDocument()
    })
  })

  describe('When mode is edit', () => {
    it('then shows "Salvar Alterações" text in save button', () => {
      // Arrange & Act
      render(<UserModalFooter {...defaultProps} mode="edit" />)

      // Assert
      expect(screen.getByText('Salvar Alterações')).toBeInTheDocument()
      expect(screen.queryByText('Criar Usuário')).not.toBeInTheDocument()
    })
  })

  describe('When close button is clicked', () => {
    it('then calls onClose handler', () => {
      // Arrange
      render(<UserModalFooter {...defaultProps} />)

      // Act
      fireEvent.click(screen.getByText('Cancelar'))

      // Assert
      expect(mockOnClose).toHaveBeenCalledTimes(1)
    })
  })

  describe('When save button is clicked', () => {
    it('then calls onSave handler', () => {
      // Arrange
      render(<UserModalFooter {...defaultProps} />)

      // Act
      fireEvent.click(screen.getByText('Criar Usuário'))

      // Assert
      expect(mockOnSave).toHaveBeenCalledTimes(1)
    })
  })

  describe('When save button renders', () => {
    it('then has save icon', () => {
      // Arrange & Act
      render(<UserModalFooter {...defaultProps} />)

      // Assert
      expect(screen.getByTestId('save-icon')).toBeInTheDocument()
    })
  })
})