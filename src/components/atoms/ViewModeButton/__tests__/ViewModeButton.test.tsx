import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import ViewModeButton from '../ViewModeButton'

describe('ViewModeButton', () => {
  const mockOnClick = vi.fn()

  const defaultProps = {
    text: 'Grid View',
    onClick: mockOnClick,
    isSelected: false
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('When component renders', () => {
    it('then displays button text', () => {
      // Arrange & Act
      render(<ViewModeButton {...defaultProps} />)

      // Assert
      expect(screen.getByText('Grid View')).toBeInTheDocument()
    })

    it('then has correct base classes', () => {
      // Arrange & Act
      render(<ViewModeButton {...defaultProps} />)

      // Assert
      const button = screen.getByRole('button')
      expect(button).toHaveClass('flex', 'items-center', 'justify-center', 'bg-transparent', 'focus:outline-none', 'transition-colors')
    })
  })

  describe('When button is not selected', () => {
    it('then applies unselected text styling', () => {
      // Arrange & Act
      render(<ViewModeButton {...defaultProps} isSelected={false} />)

      // Assert
      const textSpan = screen.getByText('Grid View')
      expect(textSpan).toHaveClass('text-gray-700')
      expect(textSpan).not.toHaveClass('text-primary-500', 'font-medium')
    })

    it('then does not show underline indicator', () => {
      // Arrange & Act
      render(<ViewModeButton {...defaultProps} isSelected={false} />)

      // Assert
      const underline = document.querySelector('.bg-primary-500')
      expect(underline).not.toBeInTheDocument()
    })
  })

  describe('When button is selected', () => {
    it('then applies selected text styling', () => {
      // Arrange & Act
      render(<ViewModeButton {...defaultProps} isSelected={true} />)

      // Assert
      const textSpan = screen.getByText('Grid View')
      expect(textSpan).toHaveClass('text-primary-500', 'font-medium')
      expect(textSpan).not.toHaveClass('text-gray-700')
    })

    it('then shows underline indicator', () => {
      // Arrange & Act
      render(<ViewModeButton {...defaultProps} isSelected={true} />)

      // Assert
      const underline = document.querySelector('.bg-primary-500')
      expect(underline).toBeInTheDocument()
      expect(underline).toHaveClass('absolute', 'bottom-0', 'left-0', 'w-full', 'h-[2px]')
    })
  })

  describe('When button is clicked', () => {
    it('then calls onClick handler', () => {
      // Arrange
      render(<ViewModeButton {...defaultProps} />)

      // Act
      fireEvent.click(screen.getByRole('button'))

      // Assert
      expect(mockOnClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('When custom className is provided', () => {
    it('then applies custom classes', () => {
      // Arrange & Act
      render(<ViewModeButton {...defaultProps} className="custom-class another-class" />)

      // Assert
      const button = screen.getByRole('button')
      expect(button).toHaveClass('custom-class', 'another-class')
    })

    it('then preserves base classes with custom classes', () => {
      // Arrange & Act
      render(<ViewModeButton {...defaultProps} className="custom-class" />)

      // Assert
      const button = screen.getByRole('button')
      expect(button).toHaveClass('flex', 'items-center', 'justify-center', 'custom-class')
    })
  })

  describe('When no custom className is provided', () => {
    it('then only has base classes', () => {
      // Arrange & Act
      render(<ViewModeButton {...defaultProps} />)

      // Assert
      const button = screen.getByRole('button')
      expect(button.className).toBe('flex items-center justify-center bg-transparent focus:outline-none transition-colors undefined')
    })
  })

  describe('When text span has relative positioning', () => {
    it('then has correct positioning classes', () => {
      // Arrange & Act
      render(<ViewModeButton {...defaultProps} />)

      // Assert
      const textSpan = screen.getByText('Grid View')
      expect(textSpan).toHaveClass('relative', 'text-sm')
    })
  })
})