import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import ApiHealthMapPanel from '../ApiHealthMapPanel'

// Mock apenas dos componentes filhos
vi.mock('../../../../atoms/ApiHealthCard/ApiHealthCard', () => ({
  default: vi.fn(({ api, onClick }) => (
    <div onClick={() => onClick(api.id)}>{api.name}</div>
  ))
}))

vi.mock('../../../../atoms/StatusIndicator/StatusIndicator', () => ({
  default: vi.fn(() => <span>status</span>)
}))

describe('ApiHealthMapPanel', () => {
  const mockApiData = [
    {
      id: '1',
      name: 'Payment API',
      provider: 'Stripe',
      status: 'healthy' as const,
      usage: 85,
      latency: 120,
      errors: 0.2
    },
    {
      id: '2', 
      name: 'User API',
      provider: 'Internal',
      status: 'warning' as const,
      usage: 95,
      latency: 250,
      errors: 2.1
    }
  ]

  describe('When component renders', () => {
    it('then displays title and legend', () => {
      // Arrange & Act
      render(<ApiHealthMapPanel apiData={mockApiData} />)

      // Assert
      expect(screen.getByText('Mapa de Saúde das APIs')).toBeInTheDocument()
      expect(screen.getByText('Saudável')).toBeInTheDocument()
      expect(screen.getByText('Atenção')).toBeInTheDocument()
      expect(screen.getByText('Crítico')).toBeInTheDocument()
    })

    it('then displays all API cards', () => {
      // Arrange & Act
      render(<ApiHealthMapPanel apiData={mockApiData} />)

      // Assert
      expect(screen.getByText('Payment API')).toBeInTheDocument()
      expect(screen.getByText('User API')).toBeInTheDocument()
    })
  })

  describe('When API card is clicked', () => {
    it('then shows API details', () => {
      // Arrange
      render(<ApiHealthMapPanel apiData={mockApiData} />)

      // Act
      fireEvent.click(screen.getByText('Payment API'))

      // Assert
      expect(screen.getByText('Stripe - Payment API')).toBeInTheDocument()
      expect(screen.getByText('Uso:')).toBeInTheDocument()
      expect(screen.getByText('Latência:')).toBeInTheDocument()
      expect(screen.getByText('Erros:')).toBeInTheDocument()
    })
  })

  describe('When selected API is not found', () => {
    it('then does not show details', () => {
      // Arrange
      const { rerender } = render(<ApiHealthMapPanel apiData={mockApiData} />)
      
      // Act - Clica em uma API para selecionar
      fireEvent.click(screen.getByText('Payment API'))
      
      // Act - Remove a API dos dados mas mantém selecionada
      rerender(<ApiHealthMapPanel apiData={[]} />)

      // Assert
      expect(screen.queryByText('Stripe - Payment API')).not.toBeInTheDocument()
      expect(screen.queryByText('Uso:')).not.toBeInTheDocument()
    })
  })

  describe('When no API is selected', () => {
    it('then does not show details section', () => {
      // Arrange & Act
      render(<ApiHealthMapPanel apiData={mockApiData} />)

      // Assert
      expect(screen.queryByText('Stripe - Payment API')).not.toBeInTheDocument()
    })
  })
})