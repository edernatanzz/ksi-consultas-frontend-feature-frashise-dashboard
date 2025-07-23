import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import UserCard from '../UserCard'

// Mock dos componentes
vi.mock('../../../../atoms/Button/Button', () => ({
  default: vi.fn(({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  ))
}))

vi.mock('../../../../atoms/Badge/Badge', () => ({
  default: vi.fn(() => <span>Badge</span>)
}))

vi.mock('next/image', () => ({
  __esModule: true,
  default: vi.fn(() => <span data-testid="user-avatar">Mocked Image</span>)
}))

vi.mock('@/utils/user', () => ({
  getInitials: vi.fn(() => 'JS')
}))

vi.mock('lucide-react', () => ({
  Edit: vi.fn(),
  Eye: vi.fn()
}))

describe('UserCard', () => {
  const mockUser = {
    id: '1',
    name: 'João Silva',
    email: 'joao@example.com',
    profile: 'admin' as const,
    status: 'active' as const,
    department: 'TI',
    hasCustomPermissions: false,
    position: 'Developer',
    lastAccess: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    phone: '123456789',
    updatedAt: new Date().toISOString(),
    avatarUrl: '',
    permissions: [],
    isActive: true,
    cpf: '123.456.789-00',
    dailyQueryLimit: 100,
    monthlyCostLimit: 1000,
    queriesThisMonth: 10,
    costThisMonth: 200
  }

  const defaultProps = {
    user: mockUser,
    onEdit: vi.fn(),
    onView: vi.fn()
  }

  describe('When component renders', () => {
    it('then displays user information', () => {
      // Arrange & Act
      render(<UserCard {...defaultProps} />)

      // Assert
      expect(screen.getByText('João Silva')).toBeInTheDocument()
      expect(screen.getByText('joao@example.com')).toBeInTheDocument()
      expect(screen.getByText('TI')).toBeInTheDocument()
      expect(screen.getByText('Visualizar')).toBeInTheDocument()
      expect(screen.getByText('Editar')).toBeInTheDocument()
    })

    it('then calls onEdit when edit button clicked', () => {
      // Arrange
      render(<UserCard {...defaultProps} />)

      // Act
      fireEvent.click(screen.getByText('Editar'))

      // Assert
      expect(defaultProps.onEdit).toHaveBeenCalledWith(mockUser)
    })

    it('then calls onView when view button clicked', () => {
      // Arrange
      render(<UserCard {...defaultProps} />)

      // Act
      fireEvent.click(screen.getByText('Visualizar'))

      // Assert
      expect(defaultProps.onView).toHaveBeenCalledWith(mockUser)
    })
  })
})