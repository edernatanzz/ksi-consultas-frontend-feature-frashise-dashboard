import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import QuickActionButton from '../QuickActionButton'

describe('QuickActionButton Component', () => {
  it('When QuickActionButton is rendered with props, then should display title and description', () => {
    // Arrange
    const props = {
      title: 'Test Action',
      description: 'Test description',
      icon: 'add',
      bgColor: 'bg-blue-500',
      textColor: 'text-white',
      onClick: vi.fn()
    }

    // Act
    render(<QuickActionButton {...props} />)

    // Assert
    expect(screen.getByText('Test Action')).toBeInTheDocument()
    expect(screen.getByText('Test description')).toBeInTheDocument()
  })

  it('When QuickActionButton is rendered, then should display provided icon', () => {
    // Arrange
    const props = {
      title: 'Upload',
      description: 'Upload files',
      icon: 'cloud_upload',
      bgColor: 'bg-green-500',
      textColor: 'text-white',
      onClick: vi.fn()
    }

    // Act
    render(<QuickActionButton {...props} />)

    // Assert
    expect(screen.getByText('cloud_upload')).toBeInTheDocument()
  })

  it('When QuickActionButton is rendered, then should apply background and text color classes', () => {
    // Arrange
    const props = {
      title: 'Delete',
      description: 'Delete item',
      icon: 'delete',
      bgColor: 'bg-red-500',
      textColor: 'text-white',
      onClick: vi.fn()
    }

    // Act
    render(<QuickActionButton {...props} />)

    // Assert
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-red-500', 'text-white')
  })

  it('When QuickActionButton is rendered, then should have correct base classes', () => {
    // Arrange
    const props = {
      title: 'Save',
      description: 'Save changes',
      icon: 'save',
      bgColor: 'bg-blue-600',
      textColor: 'text-white',
      onClick: vi.fn()
    }

    // Act
    render(<QuickActionButton {...props} />)

    // Assert
    const button = screen.getByRole('button')
    expect(button).toHaveClass(
      'flex',
      'items-center',
      'p-4',
      'rounded-lg',
      'shadow-sm',
      'hover:opacity-90',
      'transition-opacity',
      'w-full'
    )
  })

  it('When QuickActionButton is clicked, then should call onClick handler', async () => {
    // Arrange
    const user = userEvent.setup()
    const mockOnClick = vi.fn()
    const props = {
      title: 'Submit',
      description: 'Submit form',
      icon: 'send',
      bgColor: 'bg-green-600',
      textColor: 'text-white',
      onClick: mockOnClick
    }

    // Act
    render(<QuickActionButton {...props} />)
    await user.click(screen.getByRole('button'))

    // Assert
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('When QuickActionButton title has correct styling, then should apply font-semibold and text-lg', () => {
    // Arrange
    const props = {
      title: 'Styled Title',
      description: 'Description text',
      icon: 'style',
      bgColor: 'bg-purple-500',
      textColor: 'text-white',
      onClick: vi.fn()
    }

    // Act
    render(<QuickActionButton {...props} />)

    // Assert
    const titleElement = screen.getByText('Styled Title')
    expect(titleElement).toHaveClass('font-semibold', 'text-lg')
  })

  it('When QuickActionButton description has correct styling, then should apply text-sm', () => {
    // Arrange
    const props = {
      title: 'Action',
      description: 'Styled Description',
      icon: 'description',
      bgColor: 'bg-orange-500',
      textColor: 'text-white',
      onClick: vi.fn()
    }

    // Act
    render(<QuickActionButton {...props} />)

    // Assert
    const descriptionElement = screen.getByText('Styled Description')
    expect(descriptionElement).toHaveClass('text-sm')
  })

  it('When QuickActionButton icon has correct styling, then should apply material-icons text-2xl mr-4', () => {
    // Arrange
    const props = {
      title: 'Icon Test',
      description: 'Icon styling test',
      icon: 'star',
      bgColor: 'bg-yellow-500',
      textColor: 'text-black',
      onClick: vi.fn()
    }

    // Act
    render(<QuickActionButton {...props} />)

    // Assert
    const iconElement = screen.getByText('star')
    expect(iconElement).toHaveClass('material-icons', 'text-2xl', 'mr-4')
  })
})