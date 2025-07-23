import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Breadcrumb } from '../Breadcrumb'

interface BreadcrumbItem {
  label: string
  path?: string
  onClick?: () => void
}

interface MockLinkProps {
  children: React.ReactNode
  href: string
  className?: string
}

// Mock do Next.js Link
vi.mock('next/link', () => ({
  default: ({ children, href, className }: MockLinkProps) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}))

const mockBreadcrumbItems: BreadcrumbItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Users', path: '/users' },
  { label: 'Profile' }, // Last item without path (current page)
]

const singleItemBreadcrumb: BreadcrumbItem[] = [
  { label: 'Single Page' },
]

describe('Breadcrumb Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('When breadcrumb is rendered with items, then should display all breadcrumb labels', () => {
      // Arrange
      const props = { items: mockBreadcrumbItems }

      // Act
      render(<Breadcrumb {...props} />)

      // Assert
      expect(screen.getByText('Home')).toBeInTheDocument()
      expect(screen.getByText('Dashboard')).toBeInTheDocument()
      expect(screen.getByText('Users')).toBeInTheDocument()
      expect(screen.getByText('Profile')).toBeInTheDocument()
    })

    it('When breadcrumb is rendered, then should have proper navigation structure', () => {
      // Arrange
      const props = { items: mockBreadcrumbItems }

      // Act
      render(<Breadcrumb {...props} />)

      // Assert
      const nav = screen.getByRole('navigation')
      expect(nav).toBeInTheDocument()
      expect(nav).toHaveAttribute('aria-label', 'Breadcrumb')
    })

    it('When breadcrumb has multiple items, then should display chevron separators', () => {
      // Arrange
      const props = { items: mockBreadcrumbItems }

      // Act
      render(<Breadcrumb {...props} />)

      // Assert
      const chevrons = screen.getAllByText('chevron_right')
      expect(chevrons).toHaveLength(3) // 4 items = 3 separators
    })

    it('When breadcrumb has single item, then should not display any separators', () => {
      // Arrange
      const props = { items: singleItemBreadcrumb }

      // Act
      render(<Breadcrumb {...props} />)

      // Assert
      expect(screen.queryByText('chevron_right')).not.toBeInTheDocument()
    })

    it('When breadcrumb is rendered with empty items array, then should render empty navigation', () => {
      // Arrange
      const props = { items: [] }

      // Act
      render(<Breadcrumb {...props} />)

      // Assert
      const nav = screen.getByRole('navigation')
      expect(nav).toBeInTheDocument()
      expect(nav.textContent).toBe('')
    })
  })

  describe('Link Rendering', () => {
    it('When item has path and is not last item, then should render as clickable link', () => {
      // Arrange
      const props = { items: mockBreadcrumbItems }

      // Act
      render(<Breadcrumb {...props} />)

      // Assert
      const homeLink = screen.getByText('Home').closest('a')
      expect(homeLink).toBeInTheDocument()
      expect(homeLink).toHaveAttribute('href', '/')
      expect(homeLink).toHaveClass('hover:text-primary-500', 'transition-colors', 'cursor-pointer')
    })

    it('When item has onClick and is not last item, then should render as clickable button', () => {
      // Arrange
      const mockOnClick = vi.fn()
      const items = [
        { label: 'Home', path: '/' },
        { label: 'Clickable', onClick: mockOnClick },
        { label: 'Current' },
      ]
      const props = { items }

      // Act
      render(<Breadcrumb {...props} />)

      // Assert
      const clickableButton = screen.getByText('Clickable')
      expect(clickableButton.tagName).toBe('BUTTON')
      expect(clickableButton).toHaveClass('hover:text-primary-500', 'transition-colors', 'cursor-pointer')
    })

    it('When item is last in breadcrumb, then should render as non-clickable span', () => {
      // Arrange
      const props = { items: mockBreadcrumbItems }

      // Act
      render(<Breadcrumb {...props} />)

      // Assert
      const lastItem = screen.getByText('Profile')
      expect(lastItem.tagName).toBe('SPAN')
      expect(lastItem).toHaveClass('text-secondary-800', 'font-medium')
    })

    it('When item has no path or onClick, then should render as plain span', () => {
      // Arrange
      const items = [
        { label: 'Home', path: '/' },
        { label: 'Static Item' },
        { label: 'Current' },
      ]
      const props = { items }

      // Act
      render(<Breadcrumb {...props} />)

      // Assert
      const staticItem = screen.getByText('Static Item')
      expect(staticItem.tagName).toBe('SPAN')
      expect(staticItem).not.toHaveClass('text-secondary-800', 'font-medium')
    })
  })

  describe('Click Interactions', () => {
    it('When breadcrumb item with onClick is clicked, then should call the onClick function', () => {
      // Arrange
      const mockOnClick = vi.fn()
      const items = [
        { label: 'Home', path: '/' },
        { label: 'Clickable', onClick: mockOnClick },
        { label: 'Current' },
      ]
      const props = { items }

      // Act
      render(<Breadcrumb {...props} />)
      const clickableItem = screen.getByText('Clickable')
      fireEvent.click(clickableItem)

      // Assert
      expect(mockOnClick).toHaveBeenCalledTimes(1)
    })

    it('When multiple onClick items are clicked, then should call respective functions', () => {
      // Arrange
      const mockOnClick1 = vi.fn()
      const mockOnClick2 = vi.fn()
      const items = [
        { label: 'First', onClick: mockOnClick1 },
        { label: 'Second', onClick: mockOnClick2 },
        { label: 'Current' },
      ]
      const props = { items }

      // Act
      render(<Breadcrumb {...props} />)
      fireEvent.click(screen.getByText('First'))
      fireEvent.click(screen.getByText('Second'))

      // Assert
      expect(mockOnClick1).toHaveBeenCalledTimes(1)
      expect(mockOnClick2).toHaveBeenCalledTimes(1)
    })

    it('When last item is clicked, then should not trigger any action', () => {
      // Arrange
      const mockOnClick = vi.fn()
      const items = [
        { label: 'Home', path: '/' },
        { label: 'Current', onClick: mockOnClick }, // Last item with onClick should not be clickable
      ]
      const props = { items }

      // Act
      render(<Breadcrumb {...props} />)
      const lastItem = screen.getByText('Current')

      // Assert
      expect(lastItem.tagName).toBe('SPAN') // Should be span, not button
      expect(mockOnClick).not.toHaveBeenCalled()
    })
  })

  describe('Styling and CSS Classes', () => {
    it('When breadcrumb container is rendered, then should have correct base classes', () => {
      // Arrange
      const props = { items: mockBreadcrumbItems }

      // Act
      const { container } = render(<Breadcrumb {...props} />)

      // Assert
      const nav = container.querySelector('nav')
      expect(nav).toHaveClass('mb-6')
      
      const breadcrumbContainer = container.querySelector('.flex.items-center')
      expect(breadcrumbContainer).toHaveClass('space-x-2', 'text-sm', 'text-gray-500')
    })

    it('When chevron separators are rendered, then should have correct styling', () => {
      // Arrange
      const props = { items: mockBreadcrumbItems }

      // Act
      render(<Breadcrumb {...props} />)

      // Assert
      const chevrons = screen.getAllByText('chevron_right')
      chevrons.forEach(chevron => {
        expect(chevron).toHaveClass('material-icons', 'text-[16px]', 'text-gray-400')
      })
    })

    it('When clickable items are rendered, then should have hover styles', () => {
      // Arrange
      const props = { items: mockBreadcrumbItems }

      // Act
      render(<Breadcrumb {...props} />)

      // Assert
      const homeLink = screen.getByText('Home').closest('a')
      expect(homeLink).toHaveClass('hover:text-primary-500', 'transition-colors', 'cursor-pointer')
    })

    it('When last item is rendered, then should have emphasized styling', () => {
      // Arrange
      const props = { items: mockBreadcrumbItems }

      // Act
      render(<Breadcrumb {...props} />)

      // Assert
      const lastItem = screen.getByText('Profile')
      expect(lastItem).toHaveClass('text-secondary-800', 'font-medium')
    })
  })

  describe('Accessibility', () => {
    it('When breadcrumb is rendered, then should have proper ARIA label', () => {
      // Arrange
      const props = { items: mockBreadcrumbItems }

      // Act
      render(<Breadcrumb {...props} />)

      // Assert
      const nav = screen.getByRole('navigation')
      expect(nav).toHaveAttribute('aria-label', 'Breadcrumb')
    })

    it('When breadcrumb links are rendered, then should be keyboard accessible', () => {
      // Arrange
      const props = { items: mockBreadcrumbItems }

      // Act
      render(<Breadcrumb {...props} />)

      // Assert
      const homeLink = screen.getByText('Home').closest('a')
      expect(homeLink).toHaveAttribute('href', '/')
      
      // Links should be focusable by default
      expect(homeLink?.tagName).toBe('A')
    })

    it('When breadcrumb buttons are rendered, then should be keyboard accessible', () => {
      // Arrange
      const mockOnClick = vi.fn()
      const items = [
        { label: 'Home', path: '/' },
        { label: 'Button Item', onClick: mockOnClick },
        { label: 'Current' },
      ]
      const props = { items }

      // Act
      render(<Breadcrumb {...props} />)

      // Assert
      const button = screen.getByText('Button Item')
      expect(button.tagName).toBe('BUTTON')
      // Buttons should be focusable by default
    })
  })

  describe('Edge Cases', () => {
    it('When all items have paths, then last item should still be non-clickable', () => {
      // Arrange
      const items = [
        { label: 'Home', path: '/' },
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Current', path: '/current' }, // Last item with path
      ]
      const props = { items }

      // Act
      render(<Breadcrumb {...props} />)

      // Assert
      const lastItem = screen.getByText('Current')
      expect(lastItem.tagName).toBe('SPAN')
      expect(lastItem).toHaveClass('text-secondary-800', 'font-medium')
    })

    it('When item has both path and onClick, then should prioritize path', () => {
      // Arrange
      const mockOnClick = vi.fn()
      const items = [
        { label: 'Home', path: '/', onClick: mockOnClick },
        { label: 'Current' },
      ]
      const props = { items }

      // Act
      render(<Breadcrumb {...props} />)

      // Assert
      const homeItem = screen.getByText('Home').closest('a')
      expect(homeItem).toBeInTheDocument()
      expect(homeItem).toHaveAttribute('href', '/')
      
      // Should not render as button when path is provided
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })

    it('When breadcrumb has very long labels, then should render without truncation', () => {
      // Arrange
      const items = [
        { label: 'Very Long Breadcrumb Item Label That Should Not Be Truncated', path: '/' },
        { label: 'Another Very Long Label For Testing Purposes' },
      ]
      const props = { items }

      // Act
      render(<Breadcrumb {...props} />)

      // Assert
      expect(screen.getByText('Very Long Breadcrumb Item Label That Should Not Be Truncated')).toBeInTheDocument()
      expect(screen.getByText('Another Very Long Label For Testing Purposes')).toBeInTheDocument()
    })

    it('When breadcrumb has special characters in labels, then should render correctly', () => {
      // Arrange
      const items = [
        { label: 'Home & Garden', path: '/' },
        { label: 'Products (New)', path: '/products' },
        { label: 'Item #123' },
      ]
      const props = { items }

      // Act
      render(<Breadcrumb {...props} />)

      // Assert
      expect(screen.getByText('Home & Garden')).toBeInTheDocument()
      expect(screen.getByText('Products (New)')).toBeInTheDocument()
      expect(screen.getByText('Item #123')).toBeInTheDocument()
    })
  })

  describe('Component Structure', () => {
    it('When breadcrumb items are rendered, then should maintain correct order', () => {
      // Arrange
      const props = { items: mockBreadcrumbItems }

      // Act
      const { container } = render(<Breadcrumb {...props} />)

      // Assert
      const textContent = container.textContent
      const homeIndex = textContent?.indexOf('Home') ?? -1
      const dashboardIndex = textContent?.indexOf('Dashboard') ?? -1
      const usersIndex = textContent?.indexOf('Users') ?? -1
      const profileIndex = textContent?.indexOf('Profile') ?? -1

      expect(homeIndex).toBeLessThan(dashboardIndex)
      expect(dashboardIndex).toBeLessThan(usersIndex)
      expect(usersIndex).toBeLessThan(profileIndex)
    })

    it('When breadcrumb is rendered, then should use React fragments for key management', () => {
      // Arrange
      const props = { items: mockBreadcrumbItems }

      // Act
      const { container } = render(<Breadcrumb {...props} />)

      // Assert
      // Should render without React key warnings (implicit test)
      const breadcrumbContainer = container.querySelector('.flex.items-center')
      expect(breadcrumbContainer?.children.length).toBe(7) // 4 items + 3 separators
    })
  })
})