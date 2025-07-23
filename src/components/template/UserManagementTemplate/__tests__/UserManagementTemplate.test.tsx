import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import UserManagementTemplate from '../UserManagementTemplate'
import { User } from '@/types/user'

// Mock de todos os componentes filhos
vi.mock('../../atoms/Button/Button', () => ({
  default: vi.fn(({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  ))
}))

vi.mock('../../organisms/UserFilters/UserFilters', () => ({
  default: vi.fn(() => null)
}))

vi.mock('../../molecules/AdminMolecules/Usuarios/BulkActions/BulkActions', () => ({
  default: vi.fn(() => null)
}))

vi.mock('../../organisms/UserTable/UserTable', () => ({
  default: vi.fn(() => null)
}))

vi.mock('../../molecules/AdminMolecules/Usuarios/UserCard/UserCard', () => ({
  default: vi.fn(() => null)
}))

vi.mock('../../organisms/UserActivityModal/UserActivityModal', () => ({
  default: vi.fn(() => null)
}))

vi.mock('../../organisms/UserModal/UserModal', () => ({
  default: vi.fn(() => null)
}))

const mockUser: User = {
  id: '1',
  name: 'João Silva',
  email: 'joao@test.com',
  profile: 'admin',
  status: 'active',
  department: 'TI',
  position: 'Desenvolvedor',
  lastAccess: '2024-01-15T10:30:00Z',
  createdAt: '2024-01-01T08:00:00Z',
  phone: '11999999999',
  cpf: '12345678901',
  hasCustomPermissions: false,
  dailyQueryLimit: 1000,
  monthlyCostLimit: 5000,
  queriesThisMonth: 250,
  costThisMonth: 1250
}

const mockProps = {
  users: [mockUser],
  selectedUsers: [],
  searchTerm: '',
  filterProfile: '',
  filterStatus: '',
  filterDepartment: '',
  viewMode: 'table' as const,
  onSearchChange: vi.fn(),
  onProfileChange: vi.fn(),
  onStatusChange: vi.fn(),
  onDepartmentChange: vi.fn(),
  onViewModeChange: vi.fn(),
  onSelectUser: vi.fn(),
  onSelectAll: vi.fn(),
  onViewActivity: vi.fn(),
  onView: vi.fn(),
  onEdit: vi.fn(),
  onClone: vi.fn(),
  onCreate: vi.fn(),
  onExport: vi.fn(),
  onBulkActivate: vi.fn(),
  onBulkDeactivate: vi.fn(),
  onBulkResetPassword: vi.fn(),
  onBulkDelete: vi.fn()
}

describe('UserManagementTemplate', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('When component renders', () => {
    it('then displays header and basic layout', () => {
      // Arrange & Act
      render(<UserManagementTemplate {...mockProps} />)

      // Assert
      expect(screen.getByText('Gestão de Usuários')).toBeInTheDocument()
      expect(screen.getByText('Gerencie usuários e permissões individuais')).toBeInTheDocument()
      expect(screen.getByText('Mostrando 1 de 1 usuários')).toBeInTheDocument()
    })

    it('then displays header buttons', () => {
      // Arrange & Act
      render(<UserManagementTemplate {...mockProps} />)

      // Assert
      expect(screen.getByText('Exportar')).toBeInTheDocument()
      expect(screen.getByText('Novo Usuário')).toBeInTheDocument()
    })
  })

  describe('When viewMode is table', () => {
    it('then view mode button shows Grade', () => {
      // Arrange & Act
      render(<UserManagementTemplate {...mockProps} viewMode="table" />)

      // Assert
      expect(screen.getByText('Grade')).toBeInTheDocument()
    })
  })

  describe('When viewMode is grid', () => {
    it('then view mode button shows Tabela', () => {
      // Arrange & Act
      render(<UserManagementTemplate {...mockProps} viewMode="grid" />)

      // Assert
      expect(screen.getByText('Tabela')).toBeInTheDocument()
    })
  })

  describe('When export button is clicked', () => {
    it('then calls onExport', () => {
      // Arrange
      render(<UserManagementTemplate {...mockProps} />)
      const exportButton = screen.getByText('Exportar')

      // Act
      fireEvent.click(exportButton)

      // Assert
      expect(mockProps.onExport).toHaveBeenCalled()
    })
  })

  describe('When create user button is clicked', () => {
    it('then calls onCreate', () => {
      // Arrange
      render(<UserManagementTemplate {...mockProps} />)
      const createButton = screen.getByText('Novo Usuário')

      // Act
      fireEvent.click(createButton)

      // Assert
      expect(mockProps.onCreate).toHaveBeenCalled()
    })
  })

  describe('When view mode button is clicked', () => {
    it('then calls onViewModeChange with opposite mode from table to grid', () => {
      // Arrange
      render(<UserManagementTemplate {...mockProps} viewMode="table" />)
      const viewModeButton = screen.getByText('Grade')

      // Act
      fireEvent.click(viewModeButton)

      // Assert
      expect(mockProps.onViewModeChange).toHaveBeenCalledWith('grid')
    })

    it('then calls onViewModeChange with opposite mode from grid to table', () => {
      // Arrange
      render(<UserManagementTemplate {...mockProps} viewMode="grid" />)
      const viewModeButton = screen.getByText('Tabela')

      // Act
      fireEvent.click(viewModeButton)

      // Assert
      expect(mockProps.onViewModeChange).toHaveBeenCalledWith('table')
    })
  })

  describe('When users array has multiple items', () => {
    it('then displays correct count in pagination', () => {
      // Arrange
      const multipleUsers = [mockUser, { ...mockUser, id: '2', name: 'Maria Silva' }]
      
      // Act
      render(<UserManagementTemplate {...mockProps} users={multipleUsers} />)

      // Assert
      expect(screen.getByText('Mostrando 2 de 2 usuários')).toBeInTheDocument()
    })
  })

  describe('When no users are provided', () => {
    it('then displays zero count in pagination', () => {
      // Arrange & Act
      render(<UserManagementTemplate {...mockProps} users={[]} />)

      // Assert
      expect(screen.getByText('Mostrando 0 de 0 usuários')).toBeInTheDocument()
    })
  })

  describe('When selectedUsers has items', () => {
    it('then renders the template normally', () => {
      // Arrange & Act
      render(<UserManagementTemplate {...mockProps} selectedUsers={['1', '2']} />)

      // Assert - Template ainda renderiza normalmente
      expect(screen.getByText('Gestão de Usuários')).toBeInTheDocument()
    })
  })

  describe('When all props are provided', () => {
    it('then renders without errors', () => {
      // Arrange
      const fullProps = {
        ...mockProps,
        searchTerm: 'João',
        filterProfile: 'admin',
        filterStatus: 'active',
        filterDepartment: 'TI'
      }

      // Act
      render(<UserManagementTemplate {...fullProps} />)

      // Assert
      expect(screen.getByText('Gestão de Usuários')).toBeInTheDocument()
    })
  })
})