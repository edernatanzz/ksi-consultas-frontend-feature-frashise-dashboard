import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import  CardDescription  from "@/components/molecules/CardDescription/CardDescription"

describe("CardDescription", () => {
  it("When title is provided, then it should be rendered", () => {
    // Arrange
    const data = [{ item: "Item 1" }]
    const title = "Test Title"

    // Act
    render(<CardDescription data={data} title={title} />)

    // Assert
    expect(screen.getByText("Test Title")).toBeInTheDocument()
  })

  it("When data has multiple items, then all items should be rendered", () => {
    // Arrange
    const data = [
      { item: "Item A" },
      { item: "Item B" },
      { item: "Item C" }
    ]

    // Act
    render(<CardDescription data={data} />)

    // Assert
    expect(screen.getByText("Item A")).toBeInTheDocument()
    expect(screen.getByText("Item B")).toBeInTheDocument()
    expect(screen.getByText("Item C")).toBeInTheDocument()
  })

  it("When title is not provided, then title should not be rendered", () => {
    // Arrange
    const data = [{ item: "Only Item" }]

    // Act
    render(<CardDescription data={data} />)

    // Assert
    expect(screen.queryByRole("heading")).not.toBeInTheDocument()
    expect(screen.getByText("Only Item")).toBeInTheDocument()
  })

  it("When data is empty, then list should be empty", () => {
    // Arrange
    const data: { item: string }[] = []

    // Act
    render(<CardDescription data={data} />)

    // Assert
    const listItems = screen.queryAllByRole("listitem")
    expect(listItems.length).toBe(0)
  })
})
