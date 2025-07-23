import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import UserFilters from '../UserFilters'

// Mock dos ícones
vi.mock('lucide-react', () => ({
  Search: vi.fn(() => <span>Search</span>)
}))

// Mock das constantes
vi.mock('@/constants/users', () => ({
  DEPARTMENTS: ['TI', 'RH', 'Financeiro'],
  PROFILE_CONFIG: {
    admin: { name: 'Administrador' },
    user: { name: 'Usuário' }
  },
  STATUS_CONFIG: {
    active: { name: 'Ativo' },
    inactive: { name: 'Inativo' }
  }
}))

describe('UserFilters', () => {
  const defaultProps = {
    searchTerm: '',
    onSearchChange: vi.fn(),
    filterProfile: '',
    onProfileChange: vi.fn(),
    filterStatus: '',
    onStatusChange: vi.fn(),
    filterDepartment: '',
    onDepartmentChange: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('When component renders', () => {
    it('then displays all filter inputs', () => {
      // Arrange & Act
      render(<UserFilters {...defaultProps} />)

      // Assert
      expect(screen.getByPlaceholderText('Buscar usuários...')).toBeInTheDocument()
      expect(screen.getByDisplayValue('Todos os Perfis')).toBeInTheDocument()
      expect(screen.getByDisplayValue('Todos os Status')).toBeInTheDocument()
      expect(screen.getByDisplayValue('Todos os Departamentos')).toBeInTheDocument()
    })
  })

  describe('When search input changes', () => {
    it('then calls onSearchChange', () => {
      // Arrange
      render(<UserFilters {...defaultProps} />)
      const searchInput = screen.getByPlaceholderText('Buscar usuários...')

      // Act
      fireEvent.change(searchInput, { target: { value: 'João' } })

      // Assert
      expect(defaultProps.onSearchChange).toHaveBeenCalledWith('João')
    })
  })

  describe('When filter selects change', () => {
    it('then calls onProfileChange', () => {
      // Arrange
      render(<UserFilters {...defaultProps} />)
      const profileSelect = screen.getByDisplayValue('Todos os Perfis')

      // Act
      fireEvent.change(profileSelect, { target: { value: 'admin' } })

      // Assert
      expect(defaultProps.onProfileChange).toHaveBeenCalledWith('admin')
    })

    it('then calls onStatusChange', () => {
      // Arrange
      render(<UserFilters {...defaultProps} />)
      const statusSelect = screen.getByDisplayValue('Todos os Status')

      // Act
      fireEvent.change(statusSelect, { target: { value: 'active' } })

      // Assert
      expect(defaultProps.onStatusChange).toHaveBeenCalledWith('active')
    })

    it('then calls onDepartmentChange', () => {
      // Arrange
      render(<UserFilters {...defaultProps} />)
      const deptSelect = screen.getByDisplayValue('Todos os Departamentos')

      // Act
      fireEvent.change(deptSelect, { target: { value: 'TI' } })

      // Assert
      expect(defaultProps.onDepartmentChange).toHaveBeenCalledWith('TI')
    })
  })
})