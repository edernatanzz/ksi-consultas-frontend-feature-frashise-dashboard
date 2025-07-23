import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import Monitoring from '../page'

// Mock dos componentes
vi.mock('@/components/atoms/StatusIndicator/StatusIndicator', () => ({
  default: vi.fn(({ status, showLabel }) => (
    <div data-testid="status-indicator">
      <span data-testid="status">{status}</span>
      {showLabel && <span data-testid="status-label">Status Label</span>}
    </div>
  ))
}))

vi.mock('@/components/organisms/AdminOrganisms/monitoramento/RealTimeMetricsPanel/RealTimeMetricsPanel', () => ({
  default: vi.fn(() => <div data-testid="real-time-metrics">RealTimeMetricsPanel</div>)
}))

vi.mock('@/components/organisms/AdminOrganisms/monitoramento/ApiHealMapPanel/ApiHealthMapPanel', () => ({
  default: vi.fn(() => <div data-testid="api-health-map">ApiHealthMapPanel</div>)
}))

vi.mock('@/components/organisms/AdminOrganisms/monitoramento/IncidentsTimelimePanel/IncidentsTimelinePanel', () => ({
  default: vi.fn(() => <div data-testid="incidents-timeline">IncidentsTimelinePanel</div>)
}))

vi.mock('@/components/organisms/AdminOrganisms/monitoramento/QuickActionsPanel/QuickActionsPanel', () => ({
  default: vi.fn(() => <div data-testid="quick-actions">QuickActionsPanel</div>)
}))

describe('Monitoring', () => {
  describe('When page renders', () => {
    it('then displays header and title', () => {
      // Arrange & Act
      render(<Monitoring />)

      // Assert
      expect(screen.getByText('Monitoramento de APIs')).toBeInTheDocument()
      expect(screen.getByText('Visualize a saúde e performance das integrações')).toBeInTheDocument()
    })

    it('then displays status indicator and update button', () => {
      // Arrange & Act
      render(<Monitoring />)

      // Assert
      expect(screen.getByTestId('status-indicator')).toBeInTheDocument()
      expect(screen.getByTestId('status')).toHaveTextContent('online')
      expect(screen.getByTestId('status-label')).toBeInTheDocument()
      expect(screen.getByText('Atualizar Status')).toBeInTheDocument()
    })

    it('then displays all monitoring panels', () => {
      // Arrange & Act
      render(<Monitoring />)

      // Assert
      expect(screen.getByTestId('real-time-metrics')).toBeInTheDocument()
      expect(screen.getByTestId('api-health-map')).toBeInTheDocument()
      expect(screen.getByTestId('incidents-timeline')).toBeInTheDocument()
      expect(screen.getByTestId('quick-actions')).toBeInTheDocument()
    })
  })

  describe('When update status button is clicked', () => {
    it('then button is clickable', () => {
      // Arrange
      render(<Monitoring />)
      const updateButton = screen.getByText('Atualizar Status')

      // Act
      fireEvent.click(updateButton)

      // Assert
      expect(updateButton).toBeInTheDocument()
    })
  })


})