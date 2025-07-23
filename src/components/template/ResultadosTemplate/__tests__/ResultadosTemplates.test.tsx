import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ResultadosTemplate } from "../ResultadosTemplate"

describe("ResultadosTemplate", () => {
  const defaultProps = {
    document: "12345678900",
    personType: "fisica",
    onNovaConsulta: vi.fn(),
    title: "Título de Teste"
  }
  it("When children are passed, then they should be rendered inside the template", () => {
    // Arrange
    const childText = "Conteúdo de teste"

    // Act
    render(
      <ResultadosTemplate {...defaultProps}>
        <p>{childText}</p>
      </ResultadosTemplate>
    )

    // Assert
    expect(screen.getByText(childText)).toBeInTheDocument()
  })

  it("When no children are passed, then nothing should be rendered inside the content area", () => {
    // Arrange + Act
    const { container } = render(<ResultadosTemplate {...defaultProps}>{null}</ResultadosTemplate>)

    // Assert
    const contentDiv = container.querySelector("div.flex-1.p-4") // seleciona o div que normalmente envolve os children
    expect(contentDiv?.textContent?.trim()).toBe("")
  })

  const baseProps = {
    onNovaConsulta: vi.fn(),
    title: "Título de Teste"
  };

  it("When personType is 'juridica', then renders company information and formatted CNPJ", () => {
    // Arrange
    const props = {
      ...baseProps,
      document: "12345678000195",
      personType: "juridica"
    };

    // Act
    render(<ResultadosTemplate {...props}><></></ResultadosTemplate>);

    // Assert
    expect(screen.getByText("Nome da empresa:")).toBeInTheDocument();
    expect(screen.getByText("União Norte Brasileira da Igreja Adventista do Sétimo Dia")).toBeInTheDocument();
    expect(screen.getByText("Fundação:")).toBeInTheDocument();
    expect(screen.getByText("17/10/2017")).toBeInTheDocument();
    expect(screen.getByText("CNPJ:")).toBeInTheDocument();
    expect(screen.getByText("12.345.678/0001-95")).toBeInTheDocument();
    expect(screen.getByText("Situação:")).toBeInTheDocument();
    expect(screen.getByText("ATIVA")).toBeInTheDocument();
  });

  it("When personType is 'fisica', then renders personal information and formatted CPF", () => {
    // Arrange
    const props = {
      ...baseProps,
      document: "12345678900",
      personType: "fisica"
    };

    // Act
    render(<ResultadosTemplate {...props}><></></ResultadosTemplate>);

    // Assert
    expect(screen.getByText("Roberta Santos Oliveira")).toBeInTheDocument();
    expect(screen.getByText("Data de Nascimento:")).toBeInTheDocument();
    expect(screen.getByText("30/07/2000")).toBeInTheDocument();
    expect(screen.getByText("CPF:")).toBeInTheDocument();
    expect(screen.getByText("123.456.789-00")).toBeInTheDocument();
    expect(screen.getByText("Nome da mãe:")).toBeInTheDocument();
    expect(screen.getByText("Rosangela Santos Oliveira")).toBeInTheDocument();
  });

  it("When document is missing and personType is 'juridica', then renders empty CNPJ", () => {
    // Arrange
    const props = {
      ...baseProps,
      document: "",
      personType: "juridica"
    };

    // Act
    render(<ResultadosTemplate {...props}><></></ResultadosTemplate>);

    // Assert
    const cnpjLabel = screen.getByText("CNPJ:");
    const container = cnpjLabel.parentElement!; // Box que contém "CNPJ:" e o valor
    const paragraphs = container.querySelectorAll("p");

    // Deve haver 2 <p>: o "CNPJ:" e o valor (vazio)
    expect(paragraphs).toHaveLength(2);
    expect(paragraphs[1].textContent?.trim()).toBe("");
  });
})
