import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { AnaliseIA } from "../AnaliseIA"

describe("AnaliseIA", () => {
  it("When rendered, then it should display the title and alert icon", () => {
    // Arrange & Act
    render(<AnaliseIA />)

    // Assert
    expect(screen.getByText("Conclusão Análise Inteligente")).toBeInTheDocument()

    // Verifica se o ícone de alerta está presente pelo aria-label
    expect(screen.getByLabelText("Alerta")).toBeInTheDocument()
  })

  it("When rendered, then it should display the analysis explanation with the bot icon", () => {
    // Arrange & Act
    render(<AnaliseIA />)

    // Assert
    expect(
      screen.getByText(
        /O crédito não pode ser aprovado devido à quantidade significativa de pendências financeiras/i
      )
    ).toBeInTheDocument()

    expect(screen.getByLabelText("Ícone de robô")).toBeInTheDocument()
  })
})
