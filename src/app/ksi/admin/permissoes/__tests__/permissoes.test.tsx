import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import Permissions from '../page'


// Mock dos componentes
vi.mock('@/components/atoms/Button/Button', () => ({
  default: vi.fn(({ children, onClick, startIcon }) => (
    <button data-testid="button" onClick={onClick}>
      {startIcon}
      {children}
    </button>
  ))
}))

vi.mock('@/components/molecules/AdminMolecules/Permissoes/PermissionLevelCard/PermissionLevelCard', () => ({
  default: vi.fn(({ name, onClick, isSelected }) => (
    <div 
      data-testid={`permission-level-${name.toLowerCase().replace(' ', '-')}`}
      onClick={onClick}
      className={isSelected ? 'selected' : ''}
    >
      {name}
    </div>
  ))
}))

vi.mock('@/components/molecules/AdminMolecules/Permissoes/PermissionMatrix/PermissionMatrix', () => ({
  default: vi.fn(() => <div data-testid="permission-matrix">PermissionMatrix</div>)
}))

vi.mock('@/components/molecules/AdminMolecules/Permissoes/PermissionUsersSection/PermissionUsersSection', () => ({
  default: vi.fn(() => <div data-testid="permission-users-section">PermissionUsersSection</div>)
}))

vi.mock('@/components/organisms/UserModal/UserModal', () => ({
  default: vi.fn(({ isOpen, onClose }) => 
    isOpen ? (
      <div data-testid="user-modal">
        <button data-testid="close-modal" onClick={onClose}>Close</button>
        UserModal
      </div>
    ) : null
  )
}))

// Mock dos ícones
vi.mock('lucide-react', () => ({
  Users: vi.fn(() => <span data-testid="users-icon">Users</span>)
}))

vi.mock('@mui/icons-material', () => ({
  AdminPanelSettings: vi.fn(() => <span>AdminIcon</span>),
  AttachMoney: vi.fn(() => <span>MoneyIcon</span>),
  Code: vi.fn(() => <span>CodeIcon</span>),
  BarChart: vi.fn(() => <span>ChartIcon</span>),
  Headphones: vi.fn(() => <span>HeadphonesIcon</span>)
}))

describe('Permissions', () => {
  describe('When page renders', () => {
    it('then displays header and main sections', () => {
      // Arrange & Act
      render(<Permissions />)

      // Assert
      expect(screen.getByText('Gerenciamento de Permissões')).toBeInTheDocument()
      expect(screen.getByText('Controle acesso hierárquico ao sistema')).toBeInTheDocument()
      expect(screen.getByText('Novo Usuário')).toBeInTheDocument()
    })

    it('then displays all permission levels', () => {
      // Arrange & Act
      render(<Permissions />)

      // Assert
      expect(screen.getByTestId('permission-level-administrador')).toBeInTheDocument()
      expect(screen.getByTestId('permission-level-financeiro')).toBeInTheDocument()
      expect(screen.getByTestId('permission-level-suporte')).toBeInTheDocument()
      expect(screen.getByTestId('permission-level-desenvolvedores')).toBeInTheDocument()
      expect(screen.getByTestId('permission-level-marketing')).toBeInTheDocument()
    })

    it('then displays permission components', () => {
      // Arrange & Act
      render(<Permissions />)

      // Assert
      expect(screen.getByTestId('permission-matrix')).toBeInTheDocument()
      expect(screen.getByTestId('permission-users-section')).toBeInTheDocument()
    })

    it('then admin level is selected by default', () => {
      // Arrange & Act
      render(<Permissions />)

      // Assert
      const adminCard = screen.getByTestId('permission-level-administrador')
      expect(adminCard).toHaveClass('selected')
    })
  })

  describe('When new user button is clicked', () => {
    it('then opens user modal', () => {
      // Arrange
      render(<Permissions />)
      const newUserButton = screen.getByTestId('button')

      // Act
      fireEvent.click(newUserButton)

      // Assert
      expect(screen.getByTestId('user-modal')).toBeInTheDocument()
    })
  })

  describe('When user modal is open', () => {
    it('then can close modal', () => {
      // Arrange
      render(<Permissions />)
      fireEvent.click(screen.getByTestId('button'))

      // Act
      fireEvent.click(screen.getByTestId('close-modal'))

      // Assert
      expect(screen.queryByTestId('user-modal')).not.toBeInTheDocument()
    })
  })

  describe('When permission level is clicked', () => {
    it('then changes selected level', () => {
      // Arrange
      render(<Permissions />)
      const financeiroCard = screen.getByTestId('permission-level-financeiro')

      // Act
      fireEvent.click(financeiroCard)

      // Assert
      expect(financeiroCard).toHaveClass('selected')
    })
  })
})