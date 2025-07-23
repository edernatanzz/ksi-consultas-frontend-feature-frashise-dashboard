import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import UserModalTabs from '../UserModalTabs'

// Mock do Button component
vi.mock('../../atoms/Button/Button', () => ({
  default: vi.fn(({ children, onClick, className, icon }) => (
    <button 
      onClick={onClick}
      className={`ksi-button ksi-button--ghost ksi-button--medium ${className}`}
    >
      {icon && <span data-testid={`${icon.name.toLowerCase()}-icon`}>{icon.name}</span>}
      <span className="ksi-button__text">{children}</span>
    </button>
  ))
}))

// Mock dos ícones
vi.mock('lucide-react', () => ({
  User: vi.fn(() => <span data-testid="user-icon">User</span>),
  Shield: vi.fn(() => <span data-testid="shield-icon">Shield</span>),
  DollarSign: vi.fn(() => <span data-testid="dollar-icon">DollarSign</span>),
  Bell: vi.fn(() => <span data-testid="bell-icon">Bell</span>)
}))

describe('UserModalTabs', () => {
  const mockOnTabChange = vi.fn()

  const defaultProps = {
    activeTab: 'basic',
    onTabChange: mockOnTabChange
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('When component renders', () => {
    it('then displays all tab names', () => {
      // Arrange & Act
      render(<UserModalTabs {...defaultProps} />)

      // Assert
      expect(screen.getByText('Informações Básicas')).toBeInTheDocument()
      expect(screen.getByText('Perfil e Permissões')).toBeInTheDocument()
      expect(screen.getByText('Limites e Quotas')).toBeInTheDocument()
      expect(screen.getByText('Notificações')).toBeInTheDocument()
    })

    it('then renders correct number of tabs', () => {
      // Arrange & Act
      render(<UserModalTabs {...defaultProps} />)

      // Assert
      const tabButtons = document.querySelectorAll('.ksi-button--ghost')
      expect(tabButtons).toHaveLength(4)
    })
  })

  describe('When basic tab is active', () => {
    it('then applies active styling', () => {
      // Arrange & Act
      render(<UserModalTabs {...defaultProps} activeTab="basic" />)

      // Assert
      const basicTabButton = screen.getByText('Informações Básicas').parentElement
      expect(basicTabButton).toHaveClass('text-red-500', 'underline', 'decoration-red-500')
    })
  })

  describe('When permissions tab is active', () => {
    it('then applies active styling to permissions tab', () => {
      // Arrange & Act
      render(<UserModalTabs {...defaultProps} activeTab="permissions" />)

      // Assert
      const permissionsTabButton = screen.getByText('Perfil e Permissões').parentElement
      expect(permissionsTabButton).toHaveClass('text-red-500', 'underline', 'decoration-red-500')
    })

    it('then applies inactive styling to other tabs', () => {
      // Arrange & Act
      render(<UserModalTabs {...defaultProps} activeTab="permissions" />)

      // Assert
      const basicTabButton = screen.getByText('Informações Básicas').parentElement
      expect(basicTabButton).toHaveClass('text-gray-600', 'hover:text-gray-800')
      expect(basicTabButton).not.toHaveClass('text-red-500', 'underline')
    })
  })

  describe('When tab is clicked', () => {
    it('then calls onTabChange with basic tab id', () => {
      // Arrange
      render(<UserModalTabs {...defaultProps} />)

      // Act
      fireEvent.click(screen.getByText('Informações Básicas'))

      // Assert
      expect(mockOnTabChange).toHaveBeenCalledTimes(1)
      expect(mockOnTabChange).toHaveBeenCalledWith('basic')
    })

    it('then calls onTabChange with permissions tab id', () => {
      // Arrange
      render(<UserModalTabs {...defaultProps} />)

      // Act
      fireEvent.click(screen.getByText('Perfil e Permissões'))

      // Assert
      expect(mockOnTabChange).toHaveBeenCalledTimes(1)
      expect(mockOnTabChange).toHaveBeenCalledWith('permissions')
    })

    it('then calls onTabChange with limits tab id', () => {
      // Arrange
      render(<UserModalTabs {...defaultProps} />)

      // Act
      fireEvent.click(screen.getByText('Limites e Quotas'))

      // Assert
      expect(mockOnTabChange).toHaveBeenCalledTimes(1)
      expect(mockOnTabChange).toHaveBeenCalledWith('limits')
    })

    it('then calls onTabChange with notifications tab id', () => {
      // Arrange
      render(<UserModalTabs {...defaultProps} />)

      // Act
      fireEvent.click(screen.getByText('Notificações'))

      // Assert
      expect(mockOnTabChange).toHaveBeenCalledTimes(1)
      expect(mockOnTabChange).toHaveBeenCalledWith('notifications')
    })
  })

  describe('When tabs have icons', () => {
    it('then all tabs have icons attached', () => {
      // Arrange & Act
      render(<UserModalTabs {...defaultProps} />)

      // Assert
      expect(screen.getByTestId('user-icon')).toBeInTheDocument()
      expect(screen.getByTestId('shield-icon')).toBeInTheDocument()
      expect(screen.getByTestId('dollar-icon')).toBeInTheDocument()
      expect(screen.getByTestId('bell-icon')).toBeInTheDocument()
    })
  })

  describe('When nav container renders', () => {
    it('then has correct styling classes', () => {
      // Arrange & Act
      render(<UserModalTabs {...defaultProps} />)

      // Assert
      const navContainer = document.querySelector('nav')
      expect(navContainer).toBeInTheDocument()
      expect(navContainer).toHaveClass('flex', 'justify-between', 'bg-white', 'border-b', 'border-gray-200')
    })
  })
})