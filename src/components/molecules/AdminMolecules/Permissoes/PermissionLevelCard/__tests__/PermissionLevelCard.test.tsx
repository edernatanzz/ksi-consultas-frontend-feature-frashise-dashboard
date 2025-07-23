import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import PermissionLevelCard from '../PermissionLevelCard'

// Mock do arquivo CSS
vi.mock('./PermissionLevelCard.module.scss', () => ({
  default: {
    card: 'card',
    header: 'header',
    info: 'info',
    name: 'name',
    description: 'description',
    label: 'label',
    selectedInfo: 'selectedInfo',
    count: 'count'
  }
}))

// Mock do ícone
const MockIcon = vi.fn(({ sx }) => (
  <div data-testid="mock-icon" data-sx={JSON.stringify(sx)}>
    Icon
  </div>
))

describe('PermissionLevelCard', () => {
  const mockOnClick = vi.fn()

  const defaultProps = {
    id: 'admin',
    name: 'Administrador',
    bgColorClass: 'bg-red-500',
    borderColorClass: 'border-red-500',
    textColorClass: 'text-red-500',
    icon: MockIcon,
    description: 'Acesso total ao sistema',
    userCount: 5,
    isSelected: false,
    onClick: mockOnClick,
    accessedModulesCount: 10,
    totalModules: 10
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('When component renders', () => {
    it('then displays basic information', () => {
      // Arrange & Act
      render(<PermissionLevelCard {...defaultProps} />)

      // Assert
      expect(screen.getByText('Administrador')).toBeInTheDocument()
      expect(screen.getByText('Acesso total ao sistema')).toBeInTheDocument()
      expect(screen.getByText('5')).toBeInTheDocument()
      expect(screen.getByText('usuários')).toBeInTheDocument()
    })

    it('then displays icon with correct props', () => {
      // Arrange & Act
      render(<PermissionLevelCard {...defaultProps} />)

      // Assert
      const icon = screen.getByTestId('mock-icon')
      expect(icon).toBeInTheDocument()
      expect(icon).toHaveAttribute('data-sx', JSON.stringify({ fontSize: 24, fill: 'white !important' }))
    })
  })

  describe('When card is not selected', () => {
    it('then applies unselected styling', () => {
      // Arrange & Act
      render(<PermissionLevelCard {...defaultProps} isSelected={false} />)

      // Assert
      const card = document.querySelector('.card')
      expect(card).toHaveClass('border-gray-200', 'hover:border-gray-300', 'shadow-sm', 'bg-white')
      expect(card).not.toHaveClass('border-2', 'shadow-lg', 'scale-105')
    })

    it('then does not show module access info', () => {
      // Arrange & Act
      render(<PermissionLevelCard {...defaultProps} isSelected={false} />)

      // Assert
      expect(screen.queryByText('Módulos com acesso:')).not.toBeInTheDocument()
      expect(screen.queryByText('10/10')).not.toBeInTheDocument()
    })
  })

  describe('When card is selected', () => {
    it('then applies selected styling', () => {
      // Arrange & Act
      render(<PermissionLevelCard {...defaultProps} isSelected={true} />)

      // Assert
      const card = document.querySelector('.card')
      expect(card).toHaveClass('border-red-500', 'border-2', 'bg-white', 'shadow-lg', 'scale-105')
    })

    it('then shows module access information', () => {
      // Arrange & Act
      render(<PermissionLevelCard {...defaultProps} isSelected={true} />)

      // Assert
      expect(screen.getByText('Módulos com acesso:')).toBeInTheDocument()
      expect(screen.getByText('10/10')).toBeInTheDocument()
    })
  })

  describe('When card is clicked', () => {
    it('then calls onClick handler', () => {
      // Arrange
      render(<PermissionLevelCard {...defaultProps} />)

      // Act
      fireEvent.click(document.querySelector('.card')!)

      // Assert
      expect(mockOnClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('When different props are provided', () => {
    it('then applies custom color classes', () => {
      // Arrange & Act
      render(
        <PermissionLevelCard 
          {...defaultProps} 
          bgColorClass="bg-blue-500"
          borderColorClass="border-blue-500"
          textColorClass="text-blue-500"
          isSelected={true}
        />
      )

      // Assert
      const card = document.querySelector('.card')
      expect(card).toHaveClass('border-blue-500')
      
      const iconContainer = document.querySelector('.bg-blue-500')
      expect(iconContainer).toBeInTheDocument()
      
      const userCountContainer = document.querySelector('.bg-blue-500')
      expect(userCountContainer).toBeInTheDocument()
    })

    it('then displays different user count and module info', () => {
      // Arrange & Act
      render(
        <PermissionLevelCard 
          {...defaultProps} 
          userCount={15}
          accessedModulesCount={7}
          totalModules={12}
          isSelected={true}
        />
      )

      // Assert
      expect(screen.getByText('15')).toBeInTheDocument()
      expect(screen.getByText('7/12')).toBeInTheDocument()
    })
  })
})