// PersonTypeSelector.test.tsx
import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { PersonTypeSelector } from "../PersonTypeSelector"

describe("PersonTypeSelector", () => {
  it('When value is "fisica", then it should render "Física" radio as selected', () => {
    // Arrange
    const mockOnChange = vi.fn()
    render(<PersonTypeSelector value="fisica" onChange={mockOnChange} />)

    // Act
    const fisicaRadio = screen.getByLabelText("Física") as HTMLInputElement

    // Assert
    expect(fisicaRadio.checked).toBe(true)
  })

  it('When value is "juridica", then it should render "Jurídica" radio as selected', () => {
    // Arrange
    const mockOnChange = vi.fn()
    render(<PersonTypeSelector value="juridica" onChange={mockOnChange} />)

    // Act
    const juridicaRadio = screen.getByLabelText("Jurídica") as HTMLInputElement

    // Assert
    expect(juridicaRadio.checked).toBe(true)
  })

  it('When user clicks "Jurídica", then it should call onChange with "juridica"', () => {
    // Arrange
    const mockOnChange = vi.fn()
    render(<PersonTypeSelector value="fisica" onChange={mockOnChange} />)

    // Act
    const juridicaRadio = screen.getByLabelText("Jurídica")
    fireEvent.click(juridicaRadio)

    // Assert
    expect(mockOnChange).toHaveBeenCalledWith("juridica")
  })

  it('When user clicks "Física", then it should call onChange with "fisica"', () => {
    // Arrange
    const mockOnChange = vi.fn()
    render(<PersonTypeSelector value="juridica" onChange={mockOnChange} />)

    // Act
    const fisicaRadio = screen.getByLabelText("Física")
    fireEvent.click(fisicaRadio)

    // Assert
    expect(mockOnChange).toHaveBeenCalledWith("fisica")
  })

  it('When rendered, then it should display the label "Tipo de pessoa"', () => {
    // Arrange
    render(<PersonTypeSelector value="fisica" onChange={() => {}} />)

    // Act
    const label = screen.getByText("Tipo de pessoa")

    // Assert
    expect(label).toBeInTheDocument()
  })
})
