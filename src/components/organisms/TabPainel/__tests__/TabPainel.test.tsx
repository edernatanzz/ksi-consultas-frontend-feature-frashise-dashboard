import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect } from "vitest"
import { TabPainel } from "../TabPainel"

describe("TabPainel", () => {
  const mockTabs = [
    {
      label: "Tab 1",
      id: "tab1",
      content: () => <div>Conteúdo da Aba 1</div>,
    },
    {
      label: "Tab 2",
      id: "tab2",
      content: () => <div>Conteúdo da Aba 2</div>,
    },
  ]

  it("When rendered, then it should show the first tab content by default", () => {
    // Arrange
    render(<TabPainel label={mockTabs} />)

    // Act
    const tab1Content = screen.getByText("Conteúdo da Aba 1")

    // Assert
    expect(tab1Content).toBeInTheDocument()
  })

  it("When clicking on second tab, then it should display second tab content", async () => {
    // Arrange
    const user = userEvent.setup()
    render(<TabPainel label={mockTabs} />)

    // Act
    const tab2 = screen.getByRole("tab", { name: /tab 2/i })
    await user.click(tab2)

    // Assert
    expect(screen.getByText("Conteúdo da Aba 2")).toBeInTheDocument()
  })

  it("When rendered, then it should display all tab labels", () => {
    // Arrange
    render(<TabPainel label={mockTabs} />)

    // Act
    const tab1 = screen.getByRole("tab", { name: /tab 1/i })
    const tab2 = screen.getByRole("tab", { name: /tab 2/i })

    // Assert
    expect(tab1).toBeInTheDocument()
    expect(tab2).toBeInTheDocument()
  })
})
