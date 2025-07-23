import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import CentralDeCustosPage from '../page'

// Mock do SetorLayout
vi.mock('@/components/template/SetorLayout/layout', () => ({
  SetorLayout: vi.fn(({ children }) => <div data-testid="setor-layout">{children}</div>)
}))

// Mock dos componentes organisms
vi.mock('@/components/organisms/AdminOrganisms/Painel/MetricOverview/MetricOverview', () => ({
  default: vi.fn(() => <div data-testid="metric-overview">MetricOverview</div>)
}))

vi.mock('@/components/organisms/AdminOrganisms/Painel/CostDistributionSection/CostDistributionSection', () => ({
  default: vi.fn(() => <div data-testid="cost-distribution">CostDistributionSection</div>)
}))

vi.mock('@/components/organisms/AdminOrganisms/Painel/ComponentGrafico', () => ({
  default: vi.fn(() => <div data-testid="cost-evolution">CostEvolutionChartSection</div>)
}))

vi.mock('@/components/organisms/AdminOrganisms/CentralDeCustos/CostHeatmapSection/CostHeatmapSection', () => ({
  default: vi.fn(() => <div data-testid="cost-heatmap">CostHeatmapSection</div>)
}))

vi.mock('@/components/organisms/AdminOrganisms/CentralDeCustos/ProviderComparisonSection/ProviderComparisonSection', () => ({
  default: vi.fn(() => <div data-testid="provider-comparison">ProviderComparisonSection</div>)
}))

vi.mock('@/components/organisms/AdminOrganisms/CentralDeCustos/ScenarioSimulatorSection/ScenarioSimulatorSection', () => ({
  default: vi.fn(() => <div data-testid="scenario-simulator">ScenarioSimulatorSection</div>)
}))

describe('CentralDeCustosPage', () => {
  describe('When page renders', () => {
    it('then displays main layout and title', () => {
      // Arrange & Act
      render(<CentralDeCustosPage />)

      // Assert
      expect(screen.getByTestId('setor-layout')).toBeInTheDocument()
      expect(screen.getByTestId('central-de-custos-container')).toBeInTheDocument()
      expect(screen.getByText('Central de Custos')).toBeInTheDocument()
    })

    it('then displays all dashboard sections', () => {
      // Arrange & Act
      render(<CentralDeCustosPage />)

      // Assert
      expect(screen.getByTestId('metric-overview')).toBeInTheDocument()
      expect(screen.getByTestId('cost-distribution')).toBeInTheDocument()
      expect(screen.getByTestId('cost-evolution')).toBeInTheDocument()
      expect(screen.getByTestId('cost-heatmap')).toBeInTheDocument()
      expect(screen.getByTestId('provider-comparison')).toBeInTheDocument()
      expect(screen.getByTestId('scenario-simulator')).toBeInTheDocument()
    })
  })
})