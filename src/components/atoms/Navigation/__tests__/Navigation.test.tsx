import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Navigation } from '../Navigation'

describe('Navigation Component', () => {
  describe('Basic Rendering', () => {
    it('When Navigation is rendered with single item, then should display item without chevron', () => {
      // Arrange
      const items = [
        { label: 'Home' }
      ]
      
      // Act
      render(<Navigation items={items} />)
      
      // Assert
      expect(screen.getByText('Home')).toBeInTheDocument()
      expect(screen.queryByText('chevron_right')).not.toBeInTheDocument()
    })

    it('When Navigation is rendered with multiple items, then should display items separated by chevrons', () => {
      // Arrange
      const items = [
        { label: 'Home' },
        { label: 'Products' },
        { label: 'Electronics' }
      ]
      
      // Act
      render(<Navigation items={items} />)
      
      // Assert
      expect(screen.getByText('Home')).toBeInTheDocument()
      expect(screen.getByText('Products')).toBeInTheDocument()
      expect(screen.getByText('Electronics')).toBeInTheDocument()
      expect(screen.getAllByText('chevron_right')).toHaveLength(2)
    })
  })

  describe('Home Icon', () => {
    it('When first navigation item is rendered, then should display home icon', () => {
      // Arrange
      const items = [
        { label: 'Dashboard' },
        { label: 'Reports' }
      ]
      
      // Act
      render(<Navigation items={items} />)
      
      // Assert
      const homeIcons = screen.getAllByText('home')
      expect(homeIcons).toHaveLength(1)
    })

    it('When Navigation has only first item, then should show home icon with correct styling', () => {
      // Arrange
      const items = [
        { label: 'Home Page' }
      ]
      
      // Act
      render(<Navigation items={items} />)
      
      // Assert
      const homeIcon = screen.getByText('home')
      expect(homeIcon).toHaveClass('text-red-600')
    })
  })

  describe('Custom Icons', () => {
    it('When navigation item has custom icon, then should display custom icon', () => {
      // Arrange
      const items = [
        { label: 'Home' },
        { label: 'Settings', icon: 'settings' }
      ]
      
      // Act
      render(<Navigation items={items} />)
      
      // Assert
      expect(screen.getByText('settings')).toBeInTheDocument()
    })

    it('When multiple items have custom icons, then should display all custom icons', () => {
      // Arrange
      const items = [
        { label: 'Home' },
        { label: 'Profile', icon: 'person' },
        { label: 'Settings', icon: 'settings' }
      ]
      
      // Act
      render(<Navigation items={items} />)
      
      // Assert
      expect(screen.getByText('person')).toBeInTheDocument()
      expect(screen.getByText('settings')).toBeInTheDocument()
    })
  })

  describe('Clickable Items', () => {
    it('When navigation item has onClick handler, then should render as clickable button', () => {
      // Arrange
      const mockOnClick = vi.fn()
      const items = [
        { label: 'Home', onClick: mockOnClick },
        { label: 'Current Page' }
      ]
      
      // Act
      render(<Navigation items={items} />)
      
      // Assert
      expect(screen.getByRole('button', { name: /Home/ })).toBeInTheDocument()
    })

    it('When clickable navigation item is clicked, then should call onClick handler', async () => {
      // Arrange
      const user = userEvent.setup()
      const mockOnClick = vi.fn()
      const items = [
        { label: 'Clickable', onClick: mockOnClick },
        { label: 'Static' }
      ]
      
      // Act
      render(<Navigation items={items} />)
      const clickableItem = screen.getByRole('button', { name: /Clickable/ })
      await user.click(clickableItem)
      
      // Assert
      expect(mockOnClick).toHaveBeenCalledTimes(1)
    })

    it('When navigation item has onClick but is active, then should render as span not button', () => {
      // Arrange
      const items = [
        { label: 'Home', onClick: vi.fn() },
        { label: 'Current', onClick: vi.fn(), isActive: true }
      ]
      
      // Act
      render(<Navigation items={items} />)
      
      // Assert
      expect(screen.getByRole('button', { name: /Home/ })).toBeInTheDocument()
      expect(screen.queryByRole('button', { name: /Current/ })).not.toBeInTheDocument()
      expect(screen.getByText('Current')).toBeInTheDocument()
    })
  })

  describe('Active State', () => {
    it('When navigation item is active, then should have active styling', () => {
      // Arrange
      const items = [
        { label: 'Home' },
        { label: 'Current Page', isActive: true }
      ]
      
      // Act
      render(<Navigation items={items} />)
      
      // Assert
      const activeItem = screen.getByText('Current Page')
      expect(activeItem).toHaveClass('text-black', 'font-medium')
    })

    it('When navigation item is not active and not clickable, then should have inactive styling', () => {
      // Arrange
      const items = [
        { label: 'Home' },
        { label: 'Inactive Page', isActive: false }
      ]
      
      // Act
      render(<Navigation items={items} />)
      
      // Assert
      const inactiveItem = screen.getByText('Inactive Page')
      expect(inactiveItem).toHaveClass('text-gray-500')
    })
  })

  describe('Hover Effects', () => {
    it('When clickable navigation item is hovered, then should show hover styling', () => {
      // Arrange
      const items = [
        { label: 'Hoverable', onClick: vi.fn() },
        { label: 'Static' }
      ]
      
      // Act
      render(<Navigation items={items} />)
      const hoverableItem = screen.getByRole('button', { name: /Hoverable/ })
      
      // Assert
      expect(hoverableItem).toHaveClass('hover:text-gray-700', 'transition-colors')
    })
  })

  describe('Complex Navigation Structure', () => {
    it('When Navigation has home, category and subcategory, then should render complete breadcrumb', () => {
      // Arrange
      const items = [
        { label: 'Início', onClick: vi.fn() },
        { label: 'Categorias', onClick: vi.fn(), icon: 'category' },
        { label: 'Veicular', isActive: true }
      ]
      
      // Act
      render(<Navigation items={items} />)
      
      // Assert
      expect(screen.getByText('Início')).toBeInTheDocument()
      expect(screen.getByText('Categorias')).toBeInTheDocument()
      expect(screen.getByText('Veicular')).toBeInTheDocument()
      expect(screen.getByText('category')).toBeInTheDocument()
      expect(screen.getAllByText('chevron_right')).toHaveLength(2)
    })

    it('When Navigation has mix of clickable and non-clickable items, then should render correctly', () => {
      // Arrange
      const mockHomeClick = vi.fn()
      const mockCategoryClick = vi.fn()
      const items = [
        { label: 'Home', onClick: mockHomeClick },
        { label: 'Category', onClick: mockCategoryClick },
        { label: 'Subcategory' },
        { label: 'Current', isActive: true }
      ]
      
      // Act
      render(<Navigation items={items} />)
      
      // Assert
      expect(screen.getAllByRole('button')).toHaveLength(2)
      expect(screen.getByRole('button', { name: /Home/ })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /Category/ })).toBeInTheDocument()
      expect(screen.queryByRole('button', { name: /Subcategory/ })).not.toBeInTheDocument()
      expect(screen.queryByRole('button', { name: /Current/ })).not.toBeInTheDocument()
    })
  })
})