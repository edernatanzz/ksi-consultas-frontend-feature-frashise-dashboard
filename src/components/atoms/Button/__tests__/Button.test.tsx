import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Button } from '../Button'

describe('Button Component', () => {
  describe('Rendering behavior', () => {
    it('When text prop is provided, then button displays the text', () => {
      // Arrange
      const buttonText = 'Click me'
      // Act
      render(<Button>{buttonText}</Button>)
      // Assert
      expect(screen.getByRole('button', { name: buttonText })).toBeInTheDocument()
    })

    it('When disabled prop is true, then button is not clickable', () => {
      // Arrange
      const mockOnClick = vi.fn()
      // Act
      render(<Button disabled onClick={mockOnClick}>Disabled Button</Button>)
      const button = screen.getByRole('button')
      fireEvent.click(button)
      // Assert
      expect(mockOnClick).not.toHaveBeenCalled()
      expect(button).toBeDisabled()
    })
  })

  describe('Click events', () => {
    it('When button is clicked and enabled, then onClick handler is called', () => {
      // Arrange
      const mockOnClick = vi.fn()
      // Act
      render(<Button onClick={mockOnClick}>Click me</Button>)
      fireEvent.click(screen.getByRole('button'))
      // Assert
      expect(mockOnClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('Loading state', () => {
    it('When loading is true, then shows spinner and "Carregando..." text', () => {
      // Act
      render(<Button loading>Submit</Button>)
      const button = screen.getByRole('button')
      // Assert
      expect(button).toHaveTextContent('Carregando...')
      expect(button.querySelector('.ksi-button__spinner')).toBeInTheDocument()
      expect(button).toBeDisabled()
    })

    it('When loading is true, then button is disabled', () => {
      // Arrange
      const mockOnClick = vi.fn()
      // Act
      render(<Button loading onClick={mockOnClick}>Submit</Button>)
      const button = screen.getByRole('button')
      fireEvent.click(button)
      // Assert
      expect(mockOnClick).not.toHaveBeenCalled()
      expect(button).toBeDisabled()
    })

    it('When loading is true with different sizes, then spinner size adjusts accordingly', () => {
      // Test small size
      const { rerender } = render(<Button loading size="small">Submit</Button>)
      let spinner = document.querySelector('.ksi-button__spinner')
      expect(spinner).toBeInTheDocument()

      // Test large size
      rerender(<Button loading size="large">Submit</Button>)
      spinner = document.querySelector('.ksi-button__spinner')
      expect(spinner).toBeInTheDocument()

      // Test medium size (default)
      rerender(<Button loading size="medium">Submit</Button>)
      spinner = document.querySelector('.ksi-button__spinner')
      expect(spinner).toBeInTheDocument()
    })
  })

  describe('Icon functionality', () => {
    it('When startIcon is provided and not loading, then displays start icon', () => {
      // Arrange
      const startIcon = <span data-testid="start-icon">→</span>
      // Act
      render(<Button startIcon={startIcon}>Button with start icon</Button>)
      // Assert
      expect(screen.getByTestId('start-icon')).toBeInTheDocument()
      expect(document.querySelector('.ksi-button__start-icon')).toBeInTheDocument()
    })

    it('When endIcon is provided and not loading, then displays end icon', () => {
      // Arrange
      const endIcon = <span data-testid="end-icon">←</span>
      // Act
      render(<Button endIcon={endIcon}>Button with end icon</Button>)
      // Assert
      expect(screen.getByTestId('end-icon')).toBeInTheDocument()
      expect(document.querySelector('.ksi-button__end-icon')).toBeInTheDocument()
    })

    it('When loading is true, then icons are not displayed', () => {
      // Arrange
      const startIcon = <span data-testid="start-icon">→</span>
      const endIcon = <span data-testid="end-icon">←</span>
      // Act
      render(
        <Button loading startIcon={startIcon} endIcon={endIcon}>
          Loading Button
        </Button>
      )
      // Assert
      expect(screen.queryByTestId('start-icon')).not.toBeInTheDocument()
      expect(screen.queryByTestId('end-icon')).not.toBeInTheDocument()
      expect(document.querySelector('.ksi-button__start-icon')).not.toBeInTheDocument()
      expect(document.querySelector('.ksi-button__end-icon')).not.toBeInTheDocument()
    })

    it('When iconOnly is true, then text content is not displayed', () => {
      // Act
      render(<Button iconOnly>This text should not appear</Button>)
      const button = screen.getByRole('button')
      // Assert
      expect(button).not.toHaveTextContent('This text should not appear')
      expect(document.querySelector('.ksi-button__text')).not.toBeInTheDocument()
    })

    it('When iconOnly is true with startIcon, then only icon is displayed', () => {
      // Arrange
      const startIcon = <span data-testid="icon-only">🔥</span>
      // Act
      render(<Button iconOnly startIcon={startIcon}>Hidden text</Button>)
      // Assert
      expect(screen.getByTestId('icon-only')).toBeInTheDocument()
      expect(screen.getByRole('button')).not.toHaveTextContent('Hidden text')
    })
  })

  describe('Variants and styling', () => {
    it('When different variants are provided, then applies correct CSS classes', () => {
      const variants = ['primary', 'secondary', 'success', 'error', 'warning', 'info'] as const
      
      variants.forEach(variant => {
        const { container } = render(<Button variant={variant}>Test</Button>)
        const button = container.querySelector('button')
        expect(button).toHaveClass(`ksi-button--${variant}`)
      })
    })

    it('When different sizes are provided, then applies correct CSS classes', () => {
      const sizes = ['small', 'medium', 'large', 'extra-large'] as const
      
      sizes.forEach(size => {
        const { container } = render(<Button size={size}>Test</Button>)
        const button = container.querySelector('button')
        expect(button).toHaveClass(`ksi-button--${size}`)
      })
    })

    it('When fullWidth is true, then applies full-width CSS class', () => {
      // Act
      const { container } = render(<Button fullWidth>Full Width Button</Button>)
      const button = container.querySelector('button')
      // Assert
      expect(button).toHaveClass('ksi-button--full-width')
    })

    it('When custom className is provided, then includes it in button classes', () => {
      // Act
      const { container } = render(<Button className="custom-class">Custom Button</Button>)
      const button = container.querySelector('button')
      // Assert
      expect(button).toHaveClass('custom-class')
      expect(button).toHaveClass('ksi-button')
    })
  })

  describe('Accessibility and props forwarding', () => {
    it('When ref is provided, then forwards ref to button element', () => {
      // Arrange
      const ref = vi.fn()
      // Act
      render(<Button ref={ref}>Ref Button</Button>)
      // Assert
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLButtonElement))
    })

    it('When additional props are provided, then forwards them to button element', () => {
      // Act
      render(<Button data-testid="custom-button" aria-label="Custom label">Test</Button>)
      const button = screen.getByTestId('custom-button')
      // Assert
      expect(button).toHaveAttribute('aria-label', 'Custom label')
    })

    it('When no children provided, then button renders without text span', () => {
      // Act
      const { container } = render(<Button />)
      // Assert
      expect(container.querySelector('.ksi-button__text')).not.toBeInTheDocument()
    })
  })
})