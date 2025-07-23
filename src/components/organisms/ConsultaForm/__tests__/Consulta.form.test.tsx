import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import ConsultaForm from '../Consulta.form'


// Mock EmptyState component
vi.mock('@/components/atoms/EmptyStates/EmptyState', () => ({
  default: ({ icon, message, showAnimation }: { icon: string; message: string; showAnimation: boolean }) => (
    <div data-testid="empty-state" data-icon={icon} data-animation={showAnimation}>
      {message}
    </div>
  )
}))

// Mock ConsultaContext
const mockConsultarPorDocumento = vi.fn()
const mockConsulta = {
  loading: false,
  error: null,
  resultado: null
}

vi.mock('@/contexts/ConsultaContext', () => ({
  useConsulta: () => ({
    consulta: mockConsulta,
    consultarPorDocumento: mockConsultarPorDocumento
  })
}))

describe('ConsultaForm Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockConsulta.loading = false
    mockConsulta.error = null
    mockConsulta.resultado = null
  })

  it('When ConsultaForm is rendered, then should display form title', () => {
    // Arrange & Act
    render(<ConsultaForm />)

    // Assert
    expect(screen.getByText('Consulta de Documentos')).toBeInTheDocument()
  })

  it('When ConsultaForm is rendered, then should display document type select and number input', () => {
    // Arrange & Act
    render(<ConsultaForm />)

    // Assert
    expect(screen.getByLabelText('Tipo de Documento:')).toBeInTheDocument()
    expect(screen.getByLabelText('Número do Documento:')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Consultar' })).toBeInTheDocument()
  })

  it('When document type is changed, then should update select value', async () => {
    // Arrange
    const user = userEvent.setup()
    render(<ConsultaForm />)

    // Act
    const select = screen.getByLabelText('Tipo de Documento:')
    await user.selectOptions(select, 'cnpj')

    // Assert
    expect(select).toHaveValue('cnpj')
  })

  it('When document number is changed, then should update input value', async () => {
    // Arrange
    const user = userEvent.setup()
    render(<ConsultaForm />)

    // Act
    const input = screen.getByLabelText('Número do Documento:')
    await user.clear(input)
    await user.type(input, '12345678901')

    // Assert
    expect(input).toHaveValue('12345678901')
  })

  it('When form is submitted with empty document, then should display error message', async () => {
    // Arrange
    const user = userEvent.setup()
    render(<ConsultaForm />)

    // Act
    const input = screen.getByLabelText('Número do Documento:')
    await user.clear(input)
    await user.click(screen.getByRole('button', { name: 'Consultar' }))

    // Assert
    expect(screen.getByText('Por favor, informe um documento')).toBeInTheDocument()
  })

  it('When form is submitted with valid document, then should call consultarPorDocumento', async () => {
    // Arrange
    const user = userEvent.setup()
    mockConsultarPorDocumento.mockResolvedValue({ success: true })
    render(<ConsultaForm />)

    // Act
    await user.click(screen.getByRole('button', { name: 'Consultar' }))

    // Assert
    expect(mockConsultarPorDocumento).toHaveBeenCalledWith('cpf', '18930258883')
  })

  it('When consulta is loading, then should display loading state', () => {
    // Arrange
    mockConsulta.loading = true

    // Act
    render(<ConsultaForm />)

    // Assert
    expect(screen.getByText('Consultando...')).toBeInTheDocument()
    expect(screen.getByTestId('empty-state')).toBeInTheDocument()
    expect(screen.getByText('Buscando informações do documento...')).toBeInTheDocument()
  })

  it('When consulta has successful result, then should display result data', () => {
    // Arrange
    mockConsulta.resultado = {
      success: true,
      data: { nome: 'João Silva', cpf: '12345678901' }
    }

    // Act
    render(<ConsultaForm />)

    // Assert
    expect(screen.getByText('Resultado da Consulta')).toBeInTheDocument()
    expect(screen.getByText(/"nome": "João Silva"/)).toBeInTheDocument()
  })
})