import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import RelatorioTopPage from "@/app/ksi/consultas/relatorio-top/page"
import * as Validator from "@/utils/Validator"

// Mock do validateDocument para controlar o comportamento nos testes
vi.mock("@/utils/Validator", () => ({
  validateDocument: vi.fn(),
  validateCPF: vi.fn(),
  validateCNPJ: vi.fn(),
  getDocumentValidationError: vi.fn()
}))

// Mock dos componentes para focar no teste da lógica do RelatorioTopPage
vi.mock("@/components/template/ResultadosTemplate/ResultadosTemplate", () => ({
  ResultadosTemplate: ({ children, onNovaConsulta }: { children: React.ReactNode; onNovaConsulta: () => void }) => (
    <div data-testid="resultados-template">
      {children}
      <button onClick={onNovaConsulta} data-testid="nova-consulta-btn">Nova Consulta</button>
    </div>
  )
}))

vi.mock("@/components/atoms/AnaliseIA/AnaliseIA", () => ({
  AnaliseIA: () => <div data-testid="analise-ia">Análise IA</div>
}))

vi.mock("@/components/organisms/TabPainel/TabPainel", () => ({
  TabPainel: ({ label }: { label: Array<{ label: string; id: string }> }) => (
    <div data-testid="tab-painel">
      {label.map((item) => (
        <div key={item.id} data-testid={`tab-${item.id}`}>{item.label}</div>
      ))}
    </div>
  )
}))

describe("RelatorioTopPage", () => {
  const mockValidateDocument = vi.mocked(Validator.validateDocument)
  const mockValidateCPF = vi.mocked(Validator.validateCPF)
  const mockValidateCNPJ = vi.mocked(Validator.validateCNPJ)
  const mockGetDocumentValidationError = vi.mocked(Validator.getDocumentValidationError)

  beforeEach(() => {
    vi.clearAllMocks()
    mockValidateDocument.mockReturnValue(false)
    mockValidateCPF.mockReturnValue(false)
    mockValidateCNPJ.mockReturnValue(false)
    mockGetDocumentValidationError.mockReturnValue(null)
  })

  it("When page is rendered initially, then it shows consulta form and description", () => {
    // Arrange
    render(<RelatorioTopPage />)

    // Assert
    expect(screen.getByText("Relatório Top")).toBeInTheDocument()
    expect(screen.getByText("Análise completa de crédito e score")).toBeInTheDocument()
    expect(screen.getByText("Dados Opcionais")).toBeInTheDocument()
    expect(screen.getByTestId("form-consulta")).toBeInTheDocument()
    expect(screen.getByText("Descrição")).toBeInTheDocument()
  })

  it("When no document is provided and form is submitted, then it does not transition to result page", async () => {
    // Arrange
    render(<RelatorioTopPage />)

    // Act
    const submitButton = screen.getByRole("button", { name: /consultar/i })
    fireEvent.click(submitButton)

    // Assert
    expect(screen.queryByText("Análise IA")).not.toBeInTheDocument()
    expect(screen.getByTestId("form-consulta")).toBeInTheDocument()
  })  
  
  it("When optional data checkbox is clicked, then item is selected", () => {
    // Arrange
    render(<RelatorioTopPage />)

    const checkbox = screen.getByLabelText(/SCR - Banco Central/i)

    // Act
    fireEvent.click(checkbox)

    // Assert
    expect(checkbox).toBeChecked()
  })

  it("When valid document is provided and form is submitted, then it shows loading and transitions to result page", async () => {
    // Arrange
    mockValidateDocument.mockReturnValue(true)
    mockValidateCPF.mockReturnValue(true)
    mockGetDocumentValidationError.mockReturnValue(null)
    render(<RelatorioTopPage />)

    // Act
    const documentInput = screen.getByRole("textbox")
    fireEvent.change(documentInput, { target: { value: "11144477735" } })
    
    const submitButton = screen.getByRole("button", { name: /consultar/i })
    fireEvent.click(submitButton)

    // Assert
    expect(screen.getByTestId("loading")).toBeInTheDocument()
    expect(screen.getByText("Carregando...")).toBeInTheDocument()

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.getByTestId("analise-ia")).toBeInTheDocument()
    }, { timeout: 2000 })

    expect(screen.getByTestId("resultados-template")).toBeInTheDocument()
  })

  it("When invalid document is provided and form is submitted, then it does not transition to result page", () => {
    // Arrange
    mockValidateDocument.mockReturnValue(false)
    render(<RelatorioTopPage />)

    // Act
    const documentInput = screen.getByRole("textbox")
    fireEvent.change(documentInput, { target: { value: "invalid-document" } })
    
    const submitButton = screen.getByRole("button", { name: /consultar/i })
    fireEvent.click(submitButton)

    // Assert
    expect(screen.queryByTestId("loading")).not.toBeInTheDocument()
    expect(screen.queryByText("Análise IA")).not.toBeInTheDocument()
    expect(screen.getByTestId("form-consulta")).toBeInTheDocument()
  })

  it("When person type is fisica, then it shows correct score and pontualidade values", async () => {
    // Arrange
    mockValidateDocument.mockReturnValue(true)
    mockValidateCPF.mockReturnValue(true)
    mockGetDocumentValidationError.mockReturnValue(null)
    render(<RelatorioTopPage />)

    // Act
    const documentInput = screen.getByRole("textbox")
    fireEvent.change(documentInput, { target: { value: "11144477735" } })
    
    const submitButton = screen.getByRole("button", { name: /consultar/i })
    fireEvent.click(submitButton)

    // Assert
    await waitFor(() => {
      const scoreGauges = screen.getAllByRole("meter")
      expect(scoreGauges[0]).toHaveAttribute("aria-valuenow", "633")
    }, { timeout: 2000 })
  })

  it("When person type is juridica, then it shows correct score and pontualidade values", async () => {
    // Arrange
    mockValidateDocument.mockReturnValue(true)
    mockValidateCNPJ.mockReturnValue(true)
    mockGetDocumentValidationError.mockReturnValue(null)
    render(<RelatorioTopPage />)

    // Act
    const juridicaRadio = screen.getByRole("radio", { name: "Jurídica" })
    fireEvent.click(juridicaRadio)
    
    const documentInput = screen.getByRole("textbox")
    fireEvent.change(documentInput, { target: { value: "11222333000181" } })
    
    const submitButton = screen.getByRole("button", { name: /consultar/i })
    fireEvent.click(submitButton)

    // Assert
    await waitFor(() => {
      const scoreGauges = screen.getAllByRole("meter")
      expect(scoreGauges[0]).toHaveAttribute("aria-valuenow", "312")
    }, { timeout: 2000 })
  })

  it("When person type is fisica in results page, then it shows correct score values", async () => {
    // Arrange
    mockValidateDocument.mockReturnValue(true)
    mockValidateCPF.mockReturnValue(true)
    mockGetDocumentValidationError.mockReturnValue(null)
    render(<RelatorioTopPage />)

    // Act
    const documentInput = screen.getByRole("textbox")
    fireEvent.change(documentInput, { target: { value: "11144477735" } })
    
    const submitButton = screen.getByRole("button", { name: /consultar/i })
    fireEvent.click(submitButton)

    // Assert
    await waitFor(() => {
      expect(screen.getByTestId("medidores-container")).toBeInTheDocument()
      const scoreGauges = screen.getAllByRole("meter")
      expect(scoreGauges[0]).toHaveAttribute("aria-valuenow", "633")
    }, { timeout: 2000 })
  })

  it("When person type is juridica in results page, then it shows correct score values", async () => {
    // Arrange
    mockValidateDocument.mockReturnValue(true)
    mockValidateCNPJ.mockReturnValue(true)
    mockGetDocumentValidationError.mockReturnValue(null)
    render(<RelatorioTopPage />)

    // Act
    const juridicaRadio = screen.getByRole("radio", { name: "Jurídica" })
    fireEvent.click(juridicaRadio)
    
    const documentInput = screen.getByRole("textbox")
    fireEvent.change(documentInput, { target: { value: "11222333000181" } })
    
    const submitButton = screen.getByRole("button", { name: /consultar/i })
    fireEvent.click(submitButton)

    // Assert
    await waitFor(() => {
      expect(screen.getByTestId("medidores-container")).toBeInTheDocument()
      const scoreGauges = screen.getAllByRole("meter")
      expect(scoreGauges[0]).toHaveAttribute("aria-valuenow", "312")
    }, { timeout: 2000 })
  })

  it("When in results page, then it shows medidores component", async () => {
    // Arrange
    mockValidateDocument.mockReturnValue(true)
    mockValidateCPF.mockReturnValue(true)
    mockGetDocumentValidationError.mockReturnValue(null)
    render(<RelatorioTopPage />)

    // Act
    const documentInput = screen.getByRole("textbox")
    fireEvent.change(documentInput, { target: { value: "11144477735" } })
    
    const submitButton = screen.getByRole("button", { name: /consultar/i })
    fireEvent.click(submitButton)

    // Assert
    await waitFor(() => {
      expect(screen.getByTestId("medidores-container")).toBeInTheDocument()
    }, { timeout: 2000 })
  })

  it("When in results page, then it shows tab panel with correct tabs", async () => {
    // Arrange
    mockValidateDocument.mockReturnValue(true)
    mockValidateCPF.mockReturnValue(true)
    mockGetDocumentValidationError.mockReturnValue(null)
    render(<RelatorioTopPage />)

    // Act
    const documentInput = screen.getByRole("textbox")
    fireEvent.change(documentInput, { target: { value: "11144477735" } })
    
    const submitButton = screen.getByRole("button", { name: /consultar/i })
    fireEvent.click(submitButton)

    // Assert
    await waitFor(() => {
      expect(screen.getByTestId("tab-painel")).toBeInTheDocument()
      expect(screen.getByTestId("tab-creditos")).toHaveTextContent("Pendências")
      expect(screen.getByTestId("tab-informacoes")).toHaveTextContent("Informações")
      expect(screen.getByTestId("tab-contato")).toHaveTextContent("Contato")
    }, { timeout: 2000 })
  })

  it("When nova consulta button is clicked, then it returns to initial form", async () => {
    // Arrange
    mockValidateDocument.mockReturnValue(true)
    mockValidateCPF.mockReturnValue(true)
    mockGetDocumentValidationError.mockReturnValue(null)
    render(<RelatorioTopPage />)

    // Act - First submit to get to results page
    const documentInput = screen.getByRole("textbox")
    fireEvent.change(documentInput, { target: { value: "11144477735" } })
    
    const submitButton = screen.getByRole("button", { name: /consultar/i })
    fireEvent.click(submitButton)

    // Wait for results page
    await waitFor(() => {
      expect(screen.getByTestId("resultados-template")).toBeInTheDocument()
    }, { timeout: 2000 })

    // Click nova consulta button
    const novaConsultaBtn = screen.getByTestId("nova-consulta-btn")
    fireEvent.click(novaConsultaBtn)

    // Assert
    expect(screen.getByTestId("form-consulta")).toBeInTheDocument()
    expect(screen.queryByTestId("resultados-template")).not.toBeInTheDocument()
  })

  it("When multiple optional data checkboxes are clicked, then all items are selected", () => {
    // Arrange
    render(<RelatorioTopPage />)

    // Act
    const scrCheckbox = screen.getByLabelText(/SCR - Banco Central/i)
    const rendaCheckbox = screen.getByLabelText(/Renda familiar/i)
    const acaoCheckbox = screen.getByLabelText(/Ação Judicial Nacional/i)
    
    fireEvent.click(scrCheckbox)
    fireEvent.click(rendaCheckbox)
    fireEvent.click(acaoCheckbox)

    // Assert
    expect(scrCheckbox).toBeChecked()
    expect(rendaCheckbox).toBeChecked()
    expect(acaoCheckbox).toBeChecked()
  })

  it("When optional data checkbox is unchecked, then item is deselected", () => {
    // Arrange
    render(<RelatorioTopPage />)

    // Act
    const checkbox = screen.getByLabelText(/SCR - Banco Central/i)
    fireEvent.click(checkbox) // Select
    fireEvent.click(checkbox) // Deselect

    // Assert
    expect(checkbox).not.toBeChecked()
  })

  it("When page renders, then it shows warning message about optional data charges", () => {
    // Arrange
    render(<RelatorioTopPage />)

    // Assert
    expect(screen.getByText(/OS OPCIONAIS SERÃO COBRADOS COMO ADICIONAIS DA CONSULTA/i)).toBeInTheDocument()
    expect(screen.getByText(/EM CASO DE DÚVIDAS ENTRAR EM CONTATO COM SEU CONSULTOR CORPORATIVO/i)).toBeInTheDocument()
  })

  it("When results page is displayed, then it shows detalhes medidores section", async () => {
    // Arrange
    mockValidateDocument.mockReturnValue(true)
    mockValidateCPF.mockReturnValue(true)
    mockGetDocumentValidationError.mockReturnValue(null)
    render(<RelatorioTopPage />)

    // Act
    const documentInput = screen.getByRole("textbox")
    fireEvent.change(documentInput, { target: { value: "11144477735" } })
    
    const submitButton = screen.getByRole("button", { name: /consultar/i })
    fireEvent.click(submitButton)

    // Assert
    await waitFor(() => {
      expect(screen.getByTestId("detalhes-medidores-section")).toBeInTheDocument()
      expect(screen.getByTestId("medidores-container")).toBeInTheDocument()
    }, { timeout: 2000 })
  })
})