import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import QuickActionsSection from '../QuickActionsSection'

// Mock QuickActionButton component
vi.mock('@/components/molecules/AdminMolecules/Painel/QuickActionButton', () => ({
  default: ({
    title,
    description,
    icon,
    bgColor,
    textColor,
    onClick,
  }: {
    title: string
    description: string
    icon: string
    bgColor: string
    textColor: string
    onClick: () => void
  }) => (
    <button 
      data-testid={`quick-action-${title}`}
      data-description={description}
      data-icon={icon}
      data-bgcolor={bgColor}
      data-textcolor={textColor}
      onClick={onClick}
    >
      {title}
    </button>
  )
}))

describe('QuickActionsSection Component', () => {
  it('When QuickActionsSection is rendered with title, then should display section title', () => {
    // Arrange
    const props = {
      title: 'Quick Actions',
      actions: [
        {
          title: 'Create Report',
          description: 'Generate new report',
          icon: 'description',
          bgColor: 'bg-blue-500',
          textColor: 'text-white',
          onClick: vi.fn()
        }
      ]
    }

    // Act
    render(<QuickActionsSection {...props} />)

    // Assert
    expect(screen.getByText('Quick Actions')).toBeInTheDocument()
  })

  it('When QuickActionsSection is rendered with actions, then should display all action buttons', () => {
    // Arrange
    const props = {
      title: 'Test Actions',
      actions: [
        {
          title: 'Action 1',
          description: 'First action',
          icon: 'add',
          bgColor: 'bg-green-500',
          textColor: 'text-white',
          onClick: vi.fn()
        },
        {
          title: 'Action 2',
          description: 'Second action',
          icon: 'edit',
          bgColor: 'bg-red-500',
          textColor: 'text-white',
          onClick: vi.fn()
        }
      ]
    }

    // Act
    render(<QuickActionsSection {...props} />)

    // Assert
    expect(screen.getByTestId('quick-action-Action 1')).toBeInTheDocument()
    expect(screen.getByTestId('quick-action-Action 2')).toBeInTheDocument()
  })

  it('When action buttons are rendered, then should pass correct props to QuickActionButton', () => {
    // Arrange
    const props = {
      title: 'Props Test',
      actions: [
        {
          title: 'Test Button',
          description: 'Test description',
          icon: 'star',
          bgColor: 'bg-purple-500',
          textColor: 'text-yellow-300',
          onClick: vi.fn()
        }
      ]
    }

    // Act
    render(<QuickActionsSection {...props} />)

    // Assert
    const actionButton = screen.getByTestId('quick-action-Test Button')
    expect(actionButton).toHaveAttribute('data-description', 'Test description')
    expect(actionButton).toHaveAttribute('data-icon', 'star')
    expect(actionButton).toHaveAttribute('data-bgcolor', 'bg-purple-500')
    expect(actionButton).toHaveAttribute('data-textcolor', 'text-yellow-300')
  })

  it('When QuickActionsSection is rendered with empty actions array, then should not render any buttons', () => {
    // Arrange
    const props = {
      title: 'Empty Actions',
      actions: []
    }

    // Act
    const { container } = render(<QuickActionsSection {...props} />)

    // Assert
    const gridContainer = container.querySelector('.grid')
    expect(gridContainer?.children).toHaveLength(0)
  })

  it('When QuickActionsSection is rendered, then should have correct container structure', () => {
    // Arrange
    const props = {
      title: 'Structure Test',
      actions: [
        {
          title: 'Structure Action',
          description: 'Test structure',
          icon: 'build',
          bgColor: 'bg-gray-500',
          textColor: 'text-white',
          onClick: vi.fn()
        }
      ]
    }

    // Act
    const { container } = render(<QuickActionsSection {...props} />)

    // Assert
    const mainContainer = container.firstChild
    expect(mainContainer).toHaveClass('bg-white', 'rounded-lg', 'shadow', 'p-6', 'mb-8')
  })

  it('When section title is rendered, then should have correct heading styling', () => {
    // Arrange
    const props = {
      title: 'Styled Title',
      actions: [
        {
          title: 'Style Action',
          description: 'Style test',
          icon: 'palette',
          bgColor: 'bg-pink-500',
          textColor: 'text-white',
          onClick: vi.fn()
        }
      ]
    }

    // Act
    render(<QuickActionsSection {...props} />)

    // Assert
    const title = screen.getByText('Styled Title')
    expect(title).toHaveClass('text-xl', 'font-semibold', 'text-gray-900', 'mb-4')
  })

  it('When actions grid is rendered, then should have correct grid layout classes', () => {
    // Arrange
    const props = {
      title: 'Grid Test',
      actions: [
        {
          title: 'Grid Action',
          description: 'Grid layout test',
          icon: 'grid_view',
          bgColor: 'bg-indigo-500',
          textColor: 'text-white',
          onClick: vi.fn()
        }
      ]
    }

    // Act
    const { container } = render(<QuickActionsSection {...props} />)

    // Assert
    const gridContainer = container.querySelector('.grid')
    expect(gridContainer).toHaveClass('grid-cols-1', 'gap-4')
  })

  it('When multiple actions are rendered, then should render in correct order', () => {
    // Arrange
    const props = {
      title: 'Order Test',
      actions: [
        {
          title: 'First Action',
          description: 'First',
          icon: 'first_page',
          bgColor: 'bg-blue-500',
          textColor: 'text-white',
          onClick: vi.fn()
        },
        {
          title: 'Second Action',
          description: 'Second',
          icon: 'last_page',
          bgColor: 'bg-green-500',
          textColor: 'text-white',
          onClick: vi.fn()
        }
      ]
    }

    // Act
    const { container } = render(<QuickActionsSection {...props} />)

    // Assert
    const buttons = container.querySelectorAll('[data-testid^="quick-action-"]')
    expect(buttons[0]).toHaveAttribute('data-testid', 'quick-action-First Action')
    expect(buttons[1]).toHaveAttribute('data-testid', 'quick-action-Second Action')
  })
})