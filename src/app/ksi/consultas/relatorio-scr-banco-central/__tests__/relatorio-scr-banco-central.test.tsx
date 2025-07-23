import { render, screen, waitFor, fireEvent, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RelatorioTopPage from '../page'
import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock completo do módulo cpfValidator
vi.mock('@/utils/Validator', () => ({
  validateDocument: vi.fn().mockImplementation((doc) => {
    // Simula validação básica - considera válido se tiver mais de 11 caracteres
    return doc.length > 11
  }),
  validateCPF: vi.fn().mockReturnValue(true),
  validateCNPJ: vi.fn().mockReturnValue(true),
  getDocumentValidationError: vi.fn().mockReturnValue(null)
}))

describe('RelatorioTopPage', () => {
  beforeEach(() => {
    // Reset mocks antes de cada teste
    vi.clearAllMocks()
  })

  describe('When clicking new consultation from results page', () => {
    it('then should return to consult page', async () => {
      render(<RelatorioTopPage />)
      
      // Preenche o formulário com um CPF válido (formato com pontos e traço)
      const input = screen.getByTestId('form-consulta-input')
      await userEvent.type(input, '123.456.789-09')
      
      // Submete o formulário
      const submitButton = screen.getByTestId('submit-button')
      await act(async () => {
        fireEvent.click(submitButton)
      })
      
      // Aguarda a transição para a página de resultados
      // Adicionamos um timeout maior e verificações intermediárias
      try {
        await waitFor(() => {
          expect(screen.getByTestId('resultados-page')).toBeInTheDocument()
        }, { timeout: 3000, interval: 100 })
      } catch (error) {
        // Debug adicional em caso de falha
        console.log('Estado atual do DOM:')
        screen.debug()
        throw error
      }
      
      // Verifica se o botão "Nova Consulta" está presente
      const novaConsultaButton = await screen.findByText('Nova Consulta')
      
      // Clica em nova consulta
      await act(async () => {
        fireEvent.click(novaConsultaButton)
      })
      
      // Verifica que voltou para a página de consulta
      await waitFor(() => {
        expect(screen.getByTestId('consulta-page')).toBeInTheDocument()
        expect(screen.queryByTestId('resultados-page')).not.toBeInTheDocument()
      })
    })
  })
})