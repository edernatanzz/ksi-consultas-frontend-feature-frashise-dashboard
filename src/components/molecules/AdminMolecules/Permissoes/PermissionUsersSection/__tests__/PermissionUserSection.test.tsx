import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import PermissionUsersSection from '../PermissionUsersSection'

// Mock dos ícones MUI
vi.mock('@mui/icons-material', () => ({
  Person: vi.fn(() => <div data-testid="person-icon">Person</div>),
  ErrorOutline: vi.fn(() => <div data-testid="error-icon">Error</div>)
}))

// Mock do Button
vi.mock('../../../../atoms/Button/Button', () => ({
  default: vi.fn(({ onClick, startIcon }) => (
    <button onClick={onClick}>{startIcon}</button>
  ))
}))

// Mock do CSS
vi.mock('./PermissionUsersSection.module.scss', () => ({ default: {} }))

// Mock console.log
const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

// Mock icon
const MockIcon = vi.fn(() => <div data-testid="level-icon">Icon</div>)

describe('PermissionUsersSection', () => {
  const mockData = {
    id: 'admin',
    name: 'Admin',
    color: 'bg-red-500',
    textColor: 'text-red-500',
    icon: MockIcon,
    userCount: 2
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('When selectedLevelData is null', () => {
    it('then renders nothing', () => {
      // Arrange & Act
      const { container } = render(<PermissionUsersSection selectedLevelData={null} />)

      // Assert
      expect(container.firstChild).toBeNull()
    })
  })

  describe('When selectedLevelData is provided', () => {
    it('then displays level info and users', () => {
      // Arrange & Act
      render(<PermissionUsersSection selectedLevelData={mockData} />)

      // Assert
      expect(screen.getByText('Admin - Usuários Ativos')).toBeInTheDocument()
      expect(screen.getByText('2 usuários com este nível')).toBeInTheDocument()
      expect(screen.getByText('Usuário 1')).toBeInTheDocument()
      expect(screen.getByText('Usuário 2')).toBeInTheDocument()
      expect(screen.getByText('usuario1@ksi.com.br')).toBeInTheDocument()
      expect(screen.getByText('usuario2@ksi.com.br')).toBeInTheDocument()
    })

    it('then creates correct number of user cards', () => {
      // Arrange & Act
      render(<PermissionUsersSection selectedLevelData={mockData} />)

      // Assert
      expect(screen.getAllByTestId('person-icon')).toHaveLength(2)
      expect(screen.getAllByRole('button')).toHaveLength(2)
    })
  })

  describe('When action button is clicked', () => {
    it('then logs correct message', () => {
      // Arrange
      render(<PermissionUsersSection selectedLevelData={mockData} />)

      // Act
      fireEvent.click(screen.getAllByRole('button')[0])

      // Assert
      expect(consoleSpy).toHaveBeenCalledWith('Action for user 1')
    })
  })
})