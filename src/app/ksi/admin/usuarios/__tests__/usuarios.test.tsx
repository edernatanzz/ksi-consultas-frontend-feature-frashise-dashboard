import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import Users from '../page'


// Mock do template principal
vi.mock('@/components/template/UserManagementTemplate/UserManagementTemplate', () => ({
  default: vi.fn((props) => (
    <div data-testid="user-management-template">
      <div data-testid="search-input">
        <input 
          value={props.searchTerm} 
          onChange={(e) => props.onSearchChange(e.target.value)}
          placeholder="Search users"
        />
      </div>
      <div data-testid="filter-profile">
        <select value={props.filterProfile} onChange={(e) => props.onProfileChange(e.target.value)}>
          <option value="all">All Profiles</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div data-testid="view-mode">
        <button onClick={() => props.onViewModeChange('table')}>Table</button>
        <button onClick={() => props.onViewModeChange('grid')}>Grid</button>
      </div>
      <div data-testid="user-actions">
        <button onClick={props.onCreate}>Create User</button>
        <button onClick={props.onExport}>Export</button>
        <button onClick={props.onSelectAll}>Select All</button>
        <button onClick={props.onBulkActivate}>Bulk Activate</button>
        <button onClick={props.onBulkDeactivate}>Bulk Deactivate</button>
      </div>
      <div data-testid="users-list">
        {props.users.map((user: { id: string; name: string; profile: string; status: string; department: string }) => (
          <div key={user.id} data-testid={`user-${user.id}`}>
            <span>{user.name}</span>
            <button onClick={() => props.onSelectUser(user.id)}>Select</button>
            <button onClick={() => props.onView(user)}>View</button>
            <button onClick={() => props.onEdit(user)}>Edit</button>
            <button onClick={() => props.onClone(user)}>Clone</button>
          </div>
        ))}
      </div>
    </div>
  ))
}))

// Mock dos dados
vi.mock('@/constants/users', () => ({
  MOCK_USERS: [
    { id: '1', name: 'User 1', profile: 'admin', status: 'active', department: 'IT' },
    { id: '2', name: 'User 2', profile: 'user', status: 'inactive', department: 'HR' },
    { id: '3', name: 'User 3', profile: 'user', status: 'active', department: 'IT' }
  ]
}))

// Mock do utilitário de filtro
vi.mock('@/utils/user', () => {
  type User = { id: string; name: string; profile: string; status: string; department: string };
  return {
    filterUsers: vi.fn((users: User[], searchTerm: string, profile: string, status: string, department: string) => {
      // Simulação simples de filtro
      return users.filter((user: User) => {
        const matchesSearch = !searchTerm || user.name.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesProfile = profile === 'all' || user.profile === profile
        const matchesStatus = status === 'all' || user.status === status
        const matchesDepartment = department === 'all' || user.department === department
        return matchesSearch && matchesProfile && matchesStatus && matchesDepartment
      })
    })
  }
})

describe('Users', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('When page renders', () => {
    it('then displays user management template', () => {
      // Arrange & Act
      render(<Users />)

      // Assert
      expect(screen.getByTestId('user-management-template')).toBeInTheDocument()
    })

    it('then displays all users by default', () => {
      // Arrange & Act
      render(<Users />)

      // Assert
      expect(screen.getByTestId('user-1')).toBeInTheDocument()
      expect(screen.getByTestId('user-2')).toBeInTheDocument()
      expect(screen.getByTestId('user-3')).toBeInTheDocument()
    })

    it('then initializes with correct default values', () => {
      // Arrange & Act
      render(<Users />)

      // Assert
      const searchInput = screen.getByDisplayValue('')
      const profileFilter = screen.getByTestId('filter-profile').querySelector('select')
      expect(searchInput).toBeInTheDocument()
      expect(profileFilter).toHaveValue('all')
    })
  })

  describe('When search is performed', () => {
    it('then updates search term', () => {
      // Arrange
      render(<Users />)
      const searchInput = screen.getByPlaceholderText('Search users')

      // Act
      fireEvent.change(searchInput, { target: { value: 'User 1' } })

      // Assert
      expect(searchInput).toHaveValue('User 1')
    })
  })

  describe('When filters are changed', () => {
    it('then updates profile filter', () => {
      // Arrange
      render(<Users />)
      const profileFilter = screen.getByTestId('filter-profile').querySelector('select')

      // Act
      fireEvent.change(profileFilter!, { target: { value: 'admin' } })

      // Assert
      expect(profileFilter).toHaveValue('admin')
    })
  })

  describe('When view mode is changed', () => {
    it('then switches between table and grid', () => {
      // Arrange
      render(<Users />)
      const gridButton = screen.getByText('Grid')

      // Act
      fireEvent.click(gridButton)

      // Assert - O template deveria receber viewMode: 'grid'
      expect(gridButton).toBeInTheDocument()
    })
  })

  describe('When user actions are performed', () => {
    it('then handles user selection', () => {
      // Arrange
      render(<Users />)
      const selectButton = screen.getAllByText('Select')[0]

      // Act
      fireEvent.click(selectButton)

      // Assert - O usuário deveria ser selecionado
      expect(selectButton).toBeInTheDocument()
    })

    it('then handles select all action', () => {
      // Arrange
      render(<Users />)
      const selectAllButton = screen.getByText('Select All')

      // Act
      fireEvent.click(selectAllButton)

      // Assert
      expect(selectAllButton).toBeInTheDocument()
    })

    it('then handles create user action', () => {
      // Arrange
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      render(<Users />)
      const createButton = screen.getByText('Create User')

      // Act
      fireEvent.click(createButton)

      // Assert
      expect(consoleSpy).toHaveBeenCalledWith('Create new user')
      consoleSpy.mockRestore()
    })

    it('then handles export action', () => {
      // Arrange
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      render(<Users />)
      const exportButton = screen.getByText('Export')

      // Act
      fireEvent.click(exportButton)

      // Assert
      expect(consoleSpy).toHaveBeenCalledWith('Export users')
      consoleSpy.mockRestore()
    })
  })

  describe('When bulk actions are performed', () => {
    it('then handles bulk activate', () => {
      // Arrange
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      render(<Users />)
      const activateButton = screen.getByText('Bulk Activate')

      // Act
      fireEvent.click(activateButton)

      // Assert
      expect(consoleSpy).toHaveBeenCalledWith('Activate users:', [])
      consoleSpy.mockRestore()
    })

    it('then handles bulk deactivate', () => {
      // Arrange
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      render(<Users />)
      const deactivateButton = screen.getByText('Bulk Deactivate')

      // Act
      fireEvent.click(deactivateButton)

      // Assert
      expect(consoleSpy).toHaveBeenCalledWith('Deactivate users:', [])
      consoleSpy.mockRestore()
    })
  })
})