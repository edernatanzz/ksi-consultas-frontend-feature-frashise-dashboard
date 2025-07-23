import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { ProgressBar } from "../ProgressBar"

describe("ProgressBar", () => {
  it("When value is 0, then bar should have 0% width and red color", () => {
    // Arrange
    const value = 0
    const max = 100

    // Act
    render(<ProgressBar value={value} max={max} />)
    const progressBar = screen.getByRole("progressbar", { hidden: true })

    // Assert
    expect(progressBar).toHaveStyle("width: 0%")
    expect(progressBar.className).toContain("bg-red-500")
  })

  it("When value is 50% of max, then bar should have yellow color", () => {
    // Arrange
    const value = 50
    const max = 100

    // Act
    render(<ProgressBar value={value} max={max} />)
    const progressBar = screen.getByRole("progressbar", { hidden: true })

    // Assert
    expect(progressBar).toHaveStyle("width: 50%")
    expect(progressBar.className).toContain("bg-yellow-500")
  })

  it("When value is 85% of max, then bar should have green color", () => {
    // Arrange
    const value = 85
    const max = 100

    // Act
    render(<ProgressBar value={value} max={max} />)
    const progressBar = screen.getByRole("progressbar", { hidden: true })

    // Assert
    expect(progressBar).toHaveStyle("width: 85%")
    expect(progressBar.className).toContain("bg-green-500")
  })

  it("When value exceeds max, then percentage should be clamped to 100%", () => {
    // Arrange
    const value = 150
    const max = 100

    // Act
    render(<ProgressBar value={value} max={max} />)
    const progressBar = screen.getByRole("progressbar", { hidden: true })

    // Assert
    expect(progressBar).toHaveStyle("width: 100%")
  })

  it("When label is provided, then it should be rendered", () => {
    // Arrange
    const value = 25
    const max = 100
    const label = "25% complete"

    // Act
    render(<ProgressBar value={value} max={max} label={label} />)

    // Assert
    expect(screen.getByText(label)).toBeInTheDocument()
  })

  it("When value is negative, then percentage should be clamped to 0%", () => {
    // Arrange
    const value = -10
    const max = 100

    // Act
    render(<ProgressBar value={value} max={max} />)
    const progressBar = screen.getByRole("progressbar", { hidden: true })

    // Assert
    expect(progressBar).toHaveStyle("width: 0%")
  })
})
