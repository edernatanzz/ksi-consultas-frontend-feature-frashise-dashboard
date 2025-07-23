import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import UserTable from '../UserTable'

// Mock dos componentes
vi.mock('../../../../atoms/Button/Button', () => ({
  default: vi.fn(({ onClick }) => <button onClick={onClick}>Button</button>)
}))

vi.mock('../../../../atoms/Badge/Badge', () => ({
  default: vi.fn(() => <span>Badge</span>)
}))

vi.mock('next/image', () => ({
  __esModule: true,
  default: vi.fn((props) => <div data-testid="next-image-mock" {...props} />)
}))

vi.mock('@/utils/user', () => ({
  getInitials: vi.fn(() => 'JS'),
  formatDate: vi.fn(() => '01/01/2024'),
  formatCurrency: vi.fn(() => 'R$ 100,00')
}))

vi.mock('lucide-react', () => ({
  Edit: vi.fn(),
  Eye: vi.fn(),
  Activity: vi.fn(),
  Copy: vi.fn(),
  MoreHorizontal: vi.fn()
}))

describe('UserTable', () => {
  const mockUsers = [
    {
      id: '1',
      name: 'João Silva',
      email: 'joao@example.com',
      profile: 'admin' as const,
      status: 'active' as const,
      department: 'TI',
      lastAccess: '2024-01-01',
      queriesThisMonth: 100,
      costThisMonth: 100,
      hasCustomPermissions: false,
      position: 'Developer',
      createdAt: '2023-01-01',
      phone: '11999999999',
      cpf: '123.456.789-00',
      dailyQueryLimit: 10,
      monthlyCostLimit: 1000,
      // Add any other required fields for User type here
    }
  ]

  const defaultProps = {
    users: mockUsers,
    selectedUsers: [],
    onSelectUser: vi.fn(),
    onSelectAll: vi.fn(),
    onEdit: vi.fn(),
    onView: vi.fn()
  }

  describe('When component renders', () => {
    it('then displays user data', () => {
      // Arrange & Act
      render(<UserTable {...defaultProps} />)

      // Assert
      expect(screen.getByText('João Silva')).toBeInTheDocument()
      expect(screen.getByText('joao@example.com')).toBeInTheDocument()
      expect(screen.getByText('TI')).toBeInTheDocument()
    })

    it('then calls onSelectUser when checkbox clicked', () => {
      // Arrange
      render(<UserTable {...defaultProps} />)
      const checkbox = screen.getAllByRole('checkbox')[1]

      // Act
      fireEvent.click(checkbox)

      // Assert
      expect(defaultProps.onSelectUser).toHaveBeenCalledWith('1')
    })
  })
})