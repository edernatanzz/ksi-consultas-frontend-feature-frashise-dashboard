import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import ActionButton from '../ActionButton'

// Mock do Button
vi.mock('../Button/Button', () => ({
  Button: vi.fn(({ children, onClick, startIcon }) => (
    <button onClick={onClick}>
      {startIcon}
      {children}
    </button>
  ))
}))

// Mock icon
const MockIcon = vi.fn(() => <span>Icon</span>)

describe('ActionButton', () => {
  const defaultProps = {
    icon: MockIcon,
    label: 'Test Action',
    variant: 'primary' as const,
    onClick: vi.fn()
  }

  describe('When component renders', () => {
    it('then displays label and icon', () => {
      // Arrange & Act
      render(<ActionButton {...defaultProps} />)

      // Assert
      expect(screen.getByText('Test Action')).toBeInTheDocument()
      expect(screen.getByText('Icon')).toBeInTheDocument()
    })

    it('then calls onClick when clicked', () => {
      // Arrange
      render(<ActionButton {...defaultProps} />)

      // Act
      fireEvent.click(screen.getByText('Test Action'))

      // Assert
      expect(defaultProps.onClick).toHaveBeenCalled()
    })
  })
})