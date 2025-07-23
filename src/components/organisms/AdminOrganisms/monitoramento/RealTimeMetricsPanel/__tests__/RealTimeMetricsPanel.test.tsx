import { render, screen } from '@testing-library/react'
import RealTimeMetricsPanel from '../RealTimeMetricsPanel'

describe('RealTimeMetricsPanel', () => {
  const mockRealTimeMetrics = {
    requestsPerSecond: 1250,
    avgLatency: 145,
    errorRate: 2.3,
    totalCostToday: 89.50
  }

  describe('When component renders', () => {
    it('then displays the title', () => {
      // Arrange & Act
      render(<RealTimeMetricsPanel realTimeMetrics={mockRealTimeMetrics} />)

      // Assert
      expect(screen.getByText('Métricas em Tempo Real')).toBeInTheDocument()
    })

    it('then displays all metric cards', () => {
      // Arrange & Act
      render(<RealTimeMetricsPanel realTimeMetrics={mockRealTimeMetrics} />)

      // Assert - Busca pelos labels das métricas
      expect(screen.getByText('Requests/seg')).toBeInTheDocument()
      expect(screen.getByText('Latência Média')).toBeInTheDocument()
      expect(screen.getByText('Taxa de Erro')).toBeInTheDocument()
      expect(screen.getByText('Custo Hoje')).toBeInTheDocument()
    })
  })

  describe('When requests per second metric is rendered', () => {
    it('then displays correct data', () => {
      // Arrange & Act
      render(<RealTimeMetricsPanel realTimeMetrics={mockRealTimeMetrics} />)

      // Assert
      expect(screen.getByText('Requests/seg')).toBeInTheDocument()
      expect(screen.getByText('1250')).toBeInTheDocument()
      expect(screen.getByText('+5.2%')).toBeInTheDocument()
    })
  })

  describe('When latency metric is rendered', () => {
    it('then displays correct data with ms unit', () => {
      // Arrange & Act
      render(<RealTimeMetricsPanel realTimeMetrics={mockRealTimeMetrics} />)

      // Assert
      expect(screen.getByText('Latência Média')).toBeInTheDocument()
      expect(screen.getByText('145ms')).toBeInTheDocument()
      expect(screen.getByText('+12ms')).toBeInTheDocument()
    })
  })

  describe('When error rate metric is rendered', () => {
    it('then displays correct data with percentage', () => {
      // Arrange & Act
      render(<RealTimeMetricsPanel realTimeMetrics={mockRealTimeMetrics} />)

      // Assert
      expect(screen.getByText('Taxa de Erro')).toBeInTheDocument()
      expect(screen.getByText('2.3%')).toBeInTheDocument()
      expect(screen.getByText('-0.2%')).toBeInTheDocument()
    })
  })

  describe('When cost metric is rendered', () => {
    it('then displays correct data with currency format', () => {
      // Arrange & Act
      render(<RealTimeMetricsPanel realTimeMetrics={mockRealTimeMetrics} />)

      // Assert
      expect(screen.getByText('Custo Hoje')).toBeInTheDocument()
      expect(screen.getByText('R$ 89.5')).toBeInTheDocument()
      expect(screen.getByText('-15%')).toBeInTheDocument()
    })
  })

  describe('When different metric values are provided', () => {
    it('then displays updated values correctly', () => {
      // Arrange
      const differentMetrics = {
        requestsPerSecond: 500,
        avgLatency: 200,
        errorRate: 0.5,
        totalCostToday: 150.75
      }

      // Act
      render(<RealTimeMetricsPanel realTimeMetrics={differentMetrics} />)

      // Assert
      expect(screen.getByText('500')).toBeInTheDocument()
      expect(screen.getByText('200ms')).toBeInTheDocument()
      expect(screen.getByText('0.5%')).toBeInTheDocument()
      expect(screen.getByText('R$ 150.75')).toBeInTheDocument()
    })
  })

  describe('When zero values are provided', () => {
    it('then displays zero values correctly', () => {
      // Arrange
      const zeroMetrics = {
        requestsPerSecond: 0,
        avgLatency: 0,
        errorRate: 0,
        totalCostToday: 0
      }

      // Act
      render(<RealTimeMetricsPanel realTimeMetrics={zeroMetrics} />)

      // Assert
      expect(screen.getByText('0')).toBeInTheDocument()
      expect(screen.getByText('0ms')).toBeInTheDocument()
      expect(screen.getByText('0%')).toBeInTheDocument()
      expect(screen.getByText('R$ 0')).toBeInTheDocument()
    })
  })

  describe('When component structure is verified', () => {
    it('then has correct container and grid structure', () => {
      // Arrange
      const { container } = render(<RealTimeMetricsPanel realTimeMetrics={mockRealTimeMetrics} />)

      // Assert
      const panel = container.firstChild as HTMLElement
      expect(panel).toHaveClass('bg-white', 'rounded-xl', 'shadow-sm', 'border', 'border-gray-100', 'p-6')
      
      const grid = panel.querySelector('.grid')
      expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-4', 'gap-6')
    })
  })

  describe('When trend types are verified', () => {
    it('then displays correct trend directions', () => {
      // Arrange & Act
      render(<RealTimeMetricsPanel realTimeMetrics={mockRealTimeMetrics} />)

      // Assert - Verifica os sinais de trend nos valores
      expect(screen.getByText('+5.2%')).toBeInTheDocument() // requests up
      expect(screen.getByText('+12ms')).toBeInTheDocument() // latency up
      expect(screen.getByText('-0.2%')).toBeInTheDocument() // error down
      expect(screen.getByText('-15%')).toBeInTheDocument() // cost down
    })
  })
})