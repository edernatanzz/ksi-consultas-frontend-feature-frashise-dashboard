import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import BulkActions from '../BulkActions'

vi.mock('../../../../atoms/Button/Button', () => ({
  default: vi.fn(({ children, onClick, disabled }) => (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  ))
}))

vi.mock('lucide-react', () => ({
  Trash2: vi.fn(() => <span>Trash2</span>),
  UserRoundCheck: vi.fn(() => <span>UserRoundCheck</span>),
  UserRoundX: vi.fn(() => <span>UserRoundX</span>),
  RefreshCw: vi.fn(() => <span>RefreshCw</span>)
}))

describe('BulkActions', () => {
  const defaultProps = {
    selectedCount: 3,
    onDelete: vi.fn(),
    onActivate: vi.fn(),
    onDeactivate: vi.fn(),
    onResetPassword: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('When component renders', () => {
    it('then displays selected count and action buttons', () => {
      // Arrange & Act
      render(<BulkActions {...defaultProps} />)

      // Assert
      expect(screen.getByText('3 usuários selecionados')).toBeInTheDocument()
      expect(screen.getByText('Ativar')).toBeInTheDocument()
      expect(screen.getByText('Desativar')).toBeInTheDocument()
      expect(screen.getByText('Resetar Senha')).toBeInTheDocument()
      expect(screen.getByText('Excluir')).toBeInTheDocument()
    })

    it('then displays singular text for one user', () => {
      // Arrange & Act
      render(<BulkActions {...defaultProps} selectedCount={1} />)

      // Assert
      expect(screen.getByText('1 usuário selecionado')).toBeInTheDocument()
    })
  })

  describe('When buttons are clicked', () => {
    it('then calls onActivate when activate button clicked', () => {
      // Arrange
      render(<BulkActions {...defaultProps} />)

      // Act
      fireEvent.click(screen.getByText('Ativar'))

      // Assert
      expect(defaultProps.onActivate).toHaveBeenCalledTimes(1)
    })

    it('then calls onDeactivate when deactivate button clicked', () => {
      // Arrange
      render(<BulkActions {...defaultProps} />)

      // Act
      fireEvent.click(screen.getByText('Desativar'))

      // Assert
      expect(defaultProps.onDeactivate).toHaveBeenCalledTimes(1)
    })

    it('then calls onResetPassword when reset button clicked', () => {
      // Arrange
      render(<BulkActions {...defaultProps} />)

      // Act
      fireEvent.click(screen.getByText('Resetar Senha'))

      // Assert
      expect(defaultProps.onResetPassword).toHaveBeenCalledTimes(1)
    })

    it('then calls onDelete when delete button clicked', () => {
      // Arrange
      render(<BulkActions {...defaultProps} />)

      // Act
      fireEvent.click(screen.getByText('Excluir'))

      // Assert
      expect(defaultProps.onDelete).toHaveBeenCalledTimes(1)
    })
  })
})