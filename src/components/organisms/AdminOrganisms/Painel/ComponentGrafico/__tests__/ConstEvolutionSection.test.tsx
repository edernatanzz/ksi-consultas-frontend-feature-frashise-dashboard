import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import CostEvolutionChartSection from '../CostEvolutionChartSection'

// Mock do componente de chart
vi.mock('@/components/molecules/AdminMolecules/Painel/CostEvolutionBarChart/CostEvolutionBarChart', () => ({
  default: vi.fn(() => <div data-testid="cost-evolution-chart" />)
}))

describe('CostEvolutionChartSection', () => {
  const defaultProps = {
    title: 'Evolução de Custos'
  }

  describe('When component renders', () => {
    it('then displays title and chart', () => {
      // Arrange & Act
      render(<CostEvolutionChartSection {...defaultProps} />)

      // Assert
      expect(screen.getByText('Evolução de Custos')).toBeInTheDocument()
      expect(screen.getByTestId('cost-evolution-chart')).toBeInTheDocument()
    })
  })
})