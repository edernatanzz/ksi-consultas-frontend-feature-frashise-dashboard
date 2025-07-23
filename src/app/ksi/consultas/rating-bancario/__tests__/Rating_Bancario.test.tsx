import { describe, it, expect } from "vitest"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import RatingBancarioPage from "../page"

describe("RatingBancarioPage", () => {
  // it("When page loads, then form and resultado are displayed", () => {
  //   // Arrange
  //   render(<RatingBancarioPage />)

  //   // Assert
  //   expect(screen.getByTestId("form-consulta")).toBeInTheDocument()
  //   expect(screen.getByTestId("resultado-consulta")).toBeInTheDocument()
  //   expect(screen.getByText("Rating Bancário")).toBeInTheDocument()
  // })

  it("When document is filled and submitted, then loading and result sections are shown", async () => {
    // Arrange
    render(<RatingBancarioPage />)
    const input = screen.getByRole("textbox") // campo de CPF/CNPJ
    const button = screen.getByRole("button", { name: /consultar/i })

    // Act - usando CPF válido
    fireEvent.change(input, { target: { value: "11144477735" } })
    fireEvent.click(button)

    // Assert - verifica se está carregando
    expect(button).toBeDisabled()
    
    // Aguarda o resultado aparecer
    await waitFor(() => {
      expect(screen.getByTestId("nova-consulta-button")).toBeInTheDocument()
    }, { timeout: 2000 })
  })

  it("When clicking nova consulta, then should go back to consulta form", async () => {
    // Arrange
    render(<RatingBancarioPage />)
    const input = screen.getByRole("textbox")
    const button = screen.getByRole("button", { name: /consultar/i })

    // Act - usando CPF válido
    fireEvent.change(input, { target: { value: "11144477735" } })
    fireEvent.click(button)

    // Wait for results
    await waitFor(() => {
      expect(screen.getByTestId("nova-consulta-button")).toBeInTheDocument()
    }, { timeout: 2000 })

    // Act - clica no botão nova consulta
    fireEvent.click(screen.getByTestId("nova-consulta-button"))

    // Assert - verifica se voltou para o formulário
    expect(screen.getByTestId("form-consulta")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveValue("") // campo deve estar limpo
  })

  it("When invalid document is entered, then submit button remains disabled", () => {
    // Arrange
    render(<RatingBancarioPage />)
    const input = screen.getByRole("textbox")
    const button = screen.getByRole("button", { name: /consultar/i })

    // Act - usando CPF inválido
    fireEvent.change(input, { target: { value: "12345678901" } })

    // Assert
    expect(button).toBeDisabled()
  })

  it("When personType is changed, then form updates accordingly", () => {
    // Arrange
    render(<RatingBancarioPage />)
    const juridicaRadio = screen.getByRole("radio", { name: "Jurídica" })
    
    // Act
    fireEvent.click(juridicaRadio)
    
    // Assert
    const input = screen.getByRole("textbox")
    expect(input).toHaveAttribute("placeholder", "Digite o CNPJ")
  })
})
