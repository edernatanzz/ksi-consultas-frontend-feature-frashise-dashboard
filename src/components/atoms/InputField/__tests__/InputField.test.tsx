import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { InputField } from '../InputField'

describe('InputField', () => {
  it('When renders with text type, then displays basic text input', () => {
    // Arrange
    const label = 'Username'
    const placeholder = 'Enter your username'
    const mockOnChange = vi.fn()

    // Act
    render(
      <InputField
        label={label}
        type="text"
        placeholder={placeholder}
        value=""
        onChange={mockOnChange}
      />
    )

    // Assert
    // Usamos getByLabelText com o texto do label e a opção selector: 'input' para encontrar o input associado
    const input = screen.getByLabelText(label, { selector: 'input' })
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('placeholder', placeholder)
    expect(input).toHaveAttribute('type', 'text')
  })

  it('When renders with email type, then displays email icon', () => {
    // Arrange
    const mockOnChange = vi.fn()

    // Act
    render(
      <InputField
        label="Email"
        type="email"
        value=""
        onChange={mockOnChange}
      />
    )

    // Assert
    expect(screen.getByTestId('EmailIcon')).toBeInTheDocument()
  })

  it('When renders with password type, then displays password icon and toggle button', () => {
    // Arrange
    const mockOnChange = vi.fn()

    // Act
    render(
      <InputField
        label="Password"
        type="password"
        value=""
        onChange={mockOnChange}
      />
    )

    // Assert
    expect(screen.getByTestId('LockIcon')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
    
    // Verificamos o input usando getByLabelText com selector
    const input = screen.getByLabelText('Password', { selector: 'input' })
    expect(input).toHaveAttribute('type', 'password')
  })

  it('When password visibility is toggled, then changes input type between password and text', async () => {
    // Arrange
    const mockOnChange = vi.fn()
    render(
      <InputField
        label="Password"
        type="password"
        value=""
        onChange={mockOnChange}
      />
    )

    const toggleButton = screen.getByRole('button')
    const input = screen.getByLabelText('Password', { selector: 'input' })

    // Act - Initial state
    expect(input).toHaveAttribute('type', 'password')

    // Act - First click
    fireEvent.click(toggleButton)

    // Assert
    expect(input).toHaveAttribute('type', 'text')
    expect(screen.getByTestId('VisibilityOffIcon')).toBeInTheDocument()

    // Act - Second click
    fireEvent.click(toggleButton)

    // Assert
    expect(input).toHaveAttribute('type', 'password')
    expect(screen.getByTestId('VisibilityIcon')).toBeInTheDocument()
  })

  it('When error is provided, then displays error message and applies error styling', () => {
    // Arrange
    const errorMessage = 'Invalid input'
    const mockOnChange = vi.fn()

    // Act
    render(
      <InputField
        label="Test"
        type="text"
        value=""
        onChange={mockOnChange}
        error={errorMessage}
      />
    )

    // Assert
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
    expect(screen.getByText(errorMessage)).toHaveClass('Mui-error')
  })

  it('When disabled is true, then input is disabled', () => {
    // Arrange
    const mockOnChange = vi.fn()

    // Act
    render(
      <InputField
        label="Disabled Field"
        type="text"
        value=""
        onChange={mockOnChange}
        disabled
      />
    )

    // Assert
    const input = screen.getByLabelText('Disabled Field', { selector: 'input' })
    expect(input).toBeDisabled()
  })

  it('When required is true, then displays required asterisk', () => {
    // Arrange
    const mockOnChange = vi.fn()

    // Act
    render(
      <InputField
        label="Required Field"
        type="text"
        value=""
        onChange={mockOnChange}
        required
      />
    )

    // Assert
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('When value changes, then calls onChange callback', () => {
    // Arrange
    const mockOnChange = vi.fn()
    const testValue = 'test input'

    // Act
    render(
      <InputField
        label="Test"
        type="text"
        value=""
        onChange={mockOnChange}
      />
    )

    const input = screen.getByLabelText('Test', { selector: 'input' })
    fireEvent.change(input, { target: { value: testValue } })

    // Assert
    expect(mockOnChange).toHaveBeenCalledTimes(1)
    expect(mockOnChange).toHaveBeenCalledWith(testValue)
  })

  it('When fullWidth is true, then input container takes full width', () => {
    // Arrange
    const mockOnChange = vi.fn()

    // Act
    render(
      <InputField
        label="Full Width Field"
        type="text"
        value=""
        onChange={mockOnChange}
        fullWidth
      />
    )

    // Assert
    // Verificamos a classe do container do TextField
    const textFieldContainer = screen.getByTestId('text-field-container')
    expect(textFieldContainer).toHaveClass('w-full')
  })
})