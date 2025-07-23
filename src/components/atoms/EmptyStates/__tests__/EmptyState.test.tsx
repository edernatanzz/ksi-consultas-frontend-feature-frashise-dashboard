import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { EmptyState } from '@/components/atoms/EmptyStates/EmptyState'

describe('EmptyState Component', () => {
  describe('Basic Rendering', () => {
    it('When EmptyState is rendered with required props, then should display icon and message', () => {
      // Arrange
      const props = {
        icon: 'inbox',
        message: 'No items found'
      }
      
      // Act
      render(<EmptyState {...props} />)
      
      // Assert
      expect(screen.getByText('inbox')).toBeInTheDocument()
      expect(screen.getByText('No items found')).toBeInTheDocument()
    })

    it('When EmptyState is rendered with title, then should display title along with message', () => {
      // Arrange
      const props = {
        icon: 'search',
        title: 'No Results',
        message: 'Try adjusting your search criteria'
      }
      
      // Act
      render(<EmptyState {...props} />)
      
      // Assert
      expect(screen.getByText('No Results')).toBeInTheDocument()
      expect(screen.getByText('Try adjusting your search criteria')).toBeInTheDocument()
    })

    it('When EmptyState is rendered without title, then should not display title element', () => {
      // Arrange
      const props = {
        icon: 'folder',
        message: 'Empty folder'
      }
      
      // Act
      render(<EmptyState {...props} />)
      
      // Assert
      expect(screen.queryByRole('heading', { level: 3 })).not.toBeInTheDocument()
    })
  })

  describe('Action Button', () => {
    it('When EmptyState is rendered with action props, then should display action button', () => {
      // Arrange
      const mockOnAction = vi.fn()
      const props = {
        icon: 'add',
        message: 'No data available',
        actionLabel: 'Add New Item',
        onAction: mockOnAction
      }
      
      // Act
      render(<EmptyState {...props} />)
      
      // Assert
      expect(screen.getByRole('button', { name: 'Add New Item' })).toBeInTheDocument()
    })

    it('When action button is clicked, then should call onAction handler', () => {
      // Arrange
      const mockOnAction = vi.fn()
      const props = {
        icon: 'refresh',
        message: 'Failed to load',
        actionLabel: 'Retry',
        onAction: mockOnAction
      }
      
      // Act
      render(<EmptyState {...props} />)
      const button = screen.getByRole('button', { name: 'Retry' })
      fireEvent.click(button)
      
      // Assert
      expect(mockOnAction).toHaveBeenCalledTimes(1)
    })

    it('When EmptyState is rendered with actionIcon, then should display icon in button', () => {
      // Arrange
      const props = {
        icon: 'error',
        message: 'Something went wrong',
        actionLabel: 'Try Again',
        onAction: vi.fn(),
        actionIcon: 'refresh'
      }
      
      // Act
      render(<EmptyState {...props} />)
      
      // Assert
      expect(screen.getByText('refresh')).toBeInTheDocument()
    })

    it('When EmptyState is rendered without actionLabel or onAction, then should not display button', () => {
      // Arrange
      const props = {
        icon: 'info',
        message: 'Information message'
      }
      
      // Act
      render(<EmptyState {...props} />)
      
      // Assert
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })
  })

  describe('Styling and Classes', () => {
    it('When EmptyState is rendered with custom className, then should apply custom classes', () => {
      // Arrange
      const props = {
        icon: 'settings',
        message: 'Configure settings',
        className: 'custom-empty-state'
      }
      
      // Act
      const { container } = render(<EmptyState {...props} />)
      
      // Assert
      expect(container.firstChild).toHaveClass('custom-empty-state')
    })

    it('When EmptyState is rendered, then should have default styling classes', () => {
      // Arrange
      const props = {
        icon: 'home',
        message: 'Welcome home'
      }
      
      // Act
      const { container } = render(<EmptyState {...props} />)
      
      // Assert
      expect(container.firstChild).toHaveClass('text-center', 'py-12')
    })
  })

  describe('Animation', () => {
    it('When EmptyState is rendered with showAnimation true, then should display content correctly', () => {
      // Arrange
      const props = {
        icon: 'star',
        message: 'Favorite items',
        showAnimation: true
      }
      
      // Act
      render(<EmptyState {...props} />)
      
      // Assert
      expect(screen.getByText('Favorite items')).toBeInTheDocument()
      expect(screen.getByText('star')).toBeInTheDocument()
    })

    it('When EmptyState is rendered with showAnimation false, then should display content correctly', () => {
      // Arrange
      const props = {
        icon: 'visibility_off',
        message: 'Hidden content',
        showAnimation: false
      }
      
      // Act
      render(<EmptyState {...props} />)
      
      // Assert
      expect(screen.getByText('Hidden content')).toBeInTheDocument()
      expect(screen.getByText('visibility_off')).toBeInTheDocument()
    })
  })
})