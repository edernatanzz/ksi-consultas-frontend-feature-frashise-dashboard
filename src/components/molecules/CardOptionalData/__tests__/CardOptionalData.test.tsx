import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, vi, expect } from "vitest"
import  CardOptionalData  from "@/components/molecules/CardOptionalData/CardOptionalData"

describe("CardOptionalData", () => {
  const mockData = [
    { item: "Opção 1", id: "1" },
    { item: "Opção 2", id: "2" },
  ]

  const renderComponent = (selected: string[] = []) => {
    const setOpcionalSelected = vi.fn()
    render(
      <CardOptionalData
        data={mockData}
        title="Título Teste"
        opcionalSelected={selected}
        setOpcionalSelected={setOpcionalSelected}
      />
    )
    return { setOpcionalSelected }
  }

  it("When title is provided, then it should render the title", () => {
    // Arrange
    renderComponent()

    // Act
    const title = screen.getByText("Título Teste")

    // Assert
    expect(title).toBeInTheDocument()
  })

  it("When rendering, then it should show all checkbox options", () => {
    // Arrange
    renderComponent()

    // Act
    const checkboxes = screen.getAllByRole("checkbox")

    // Assert
    expect(checkboxes).toHaveLength(2)
    expect(screen.getByLabelText("Opção 1")).toBeInTheDocument()
    expect(screen.getByLabelText("Opção 2")).toBeInTheDocument()
  })

  it("When checkbox is clicked, then it should call setOpcionalSelected with updated values (select case)", () => {
    // Arrange
    const { setOpcionalSelected } = renderComponent([])

    // Act
    const checkbox = screen.getByLabelText("Opção 1")
    fireEvent.click(checkbox)

    // Assert
    expect(setOpcionalSelected).toHaveBeenCalledWith(["1"])
  })

  it("When checkbox is clicked, then it should call setOpcionalSelected with updated values (deselect case)", () => {
    // Arrange
    const { setOpcionalSelected } = renderComponent(["1"])

    // Act
    const checkbox = screen.getByLabelText("Opção 1")
    fireEvent.click(checkbox)

    // Assert
    expect(setOpcionalSelected).toHaveBeenCalledWith([])
  })

  it("When rendered, then it should show informative text", () => {
    // Arrange & Act
    renderComponent()

    // Assert
    expect(
      screen.getByText("Selecione informações adicionais para incluir no relatório")
    ).toBeInTheDocument()
  })
})
