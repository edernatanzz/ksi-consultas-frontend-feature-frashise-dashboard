import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import CopyRight from "../CopyRight"

describe("CopyRight", () => {
  it("When rendered, then it should display the copyright text", () => {
    // Arrange & Act
    render(<CopyRight />)

    // Assert
    expect(
      screen.getByText(/Copyright © 2017 Tecnologia. Todos os direitos reservados./i)
    ).toBeInTheDocument()
  })

  it("When rendered, then it should display the version number", () => {
    // Arrange & Act
    render(<CopyRight />)

    // Assert
    expect(screen.getByText(/Versão 6.0.0/i)).toBeInTheDocument()
  })
})
