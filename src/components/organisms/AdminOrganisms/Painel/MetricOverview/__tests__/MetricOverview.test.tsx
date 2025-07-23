import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import MetricOverview from '../MetricOverview'

// Mock MetricCard component
vi.mock('@/components/molecules/AdminMolecules/Painel/MetricCard', () => ({
  default: ({
    title,
    value,
    change,
    changeType,
    icon
  }: {
    title: string
    value: string
    change: string
    changeType: 'positive' | 'negative' | 'neutral'
    icon: string
  }) => (
    <div 
      data-testid={`metric-card-${title}`}
      data-value={value}
      data-change={change}
      data-changetype={changeType}
      data-icon={icon}
    >
      {title}: {value}
    </div>
  )
}))

describe('MetricOverview Component', () => {
  it('When MetricOverview is rendered with metrics array, then should display all metric cards', () => {
    // Arrange
    const metrics = [
      {
        title: 'Revenue',
        value: 'R$ 10.000',
        change: '15%',
        changeType: 'positive' as const,
        icon: 'monetization_on'
      },
      {
        title: 'Expenses',
        value: 'R$ 5.000',
        change: '8%',
        changeType: 'negative' as const,
        icon: 'trending_down'
      }
    ]

    // Act
    render(<MetricOverview metrics={metrics} />)

    // Assert
    expect(screen.getByTestId('metric-card-Revenue')).toBeInTheDocument()
    expect(screen.getByTestId('metric-card-Expenses')).toBeInTheDocument()
  })

  it('When MetricOverview is rendered, then should pass correct props to MetricCard components', () => {
    // Arrange
    const metrics = [
      {
        title: 'Sales',
        value: 'R$ 25.000',
        change: '12%',
        changeType: 'positive' as const,
        icon: 'trending_up'
      }
    ]

    // Act
    render(<MetricOverview metrics={metrics} />)

    // Assert
    const metricCard = screen.getByTestId('metric-card-Sales')
    expect(metricCard).toHaveAttribute('data-value', 'R$ 25.000')
    expect(metricCard).toHaveAttribute('data-change', '12%')
    expect(metricCard).toHaveAttribute('data-changetype', 'positive')
    expect(metricCard).toHaveAttribute('data-icon', 'trending_up')
  })

  it('When MetricOverview is rendered with multiple metrics, then should render correct number of cards', () => {
    // Arrange
    const metrics = [
      {
        title: 'Metric 1',
        value: '100',
        change: '5%',
        changeType: 'positive' as const,
        icon: 'icon1'
      },
      {
        title: 'Metric 2',
        value: '200',
        change: '3%',
        changeType: 'neutral' as const,
        icon: 'icon2'
      },
      {
        title: 'Metric 3',
        value: '300',
        change: '2%',
        changeType: 'negative' as const,
        icon: 'icon3'
      }
    ]

    // Act
    render(<MetricOverview metrics={metrics} />)

    // Assert
    expect(screen.getByTestId('metric-card-Metric 1')).toBeInTheDocument()
    expect(screen.getByTestId('metric-card-Metric 2')).toBeInTheDocument()
    expect(screen.getByTestId('metric-card-Metric 3')).toBeInTheDocument()
  })

  it('When MetricOverview is rendered with empty metrics array, then should not render any cards', () => {
    // Arrange
    const metrics: {
      title: string
      value: string
      change: string
      changeType: 'positive' | 'negative' | 'neutral'
      icon: string
    }[] = []

    // Act
    const { container } = render(<MetricOverview metrics={metrics} />)

    // Assert
    const gridContainer = container.firstChild as HTMLElement | null
    expect(gridContainer?.children).toHaveLength(0)
  })

  it('When MetricOverview is rendered, then should have correct grid layout classes', () => {
    // Arrange
    const metrics = [
      {
        title: 'Test',
        value: 'Test Value',
        change: '1%',
        changeType: 'positive' as const,
        icon: 'test_icon'
      }
    ]

    // Act
    const { container } = render(<MetricOverview metrics={metrics} />)

    // Assert
    const gridContainer = container.firstChild
    expect(gridContainer).toHaveClass(
      'grid',
      'grid-cols-1',
      'md:grid-cols-2',
      'lg:grid-cols-4',
      'gap-6',
      'mb-8'
    )
  })

  it('When MetricOverview is rendered with different changeTypes, then should pass correct changeType to each card', () => {
    // Arrange
    const metrics = [
      {
        title: 'Positive Metric',
        value: 'R$ 1.000',
        change: '10%',
        changeType: 'positive' as const,
        icon: 'up'
      },
      {
        title: 'Negative Metric',
        value: 'R$ 2.000',
        change: '5%',
        changeType: 'negative' as const,
        icon: 'down'
      },
      {
        title: 'Neutral Metric',
        value: 'R$ 3.000',
        change: '0%',
        changeType: 'neutral' as const,
        icon: 'equal'
      }
    ]

    // Act
    render(<MetricOverview metrics={metrics} />)

    // Assert
    expect(screen.getByTestId('metric-card-Positive Metric')).toHaveAttribute('data-changetype', 'positive')
    expect(screen.getByTestId('metric-card-Negative Metric')).toHaveAttribute('data-changetype', 'negative')
    expect(screen.getByTestId('metric-card-Neutral Metric')).toHaveAttribute('data-changetype', 'neutral')
  })

  it('When MetricOverview is rendered with single metric, then should render one card', () => {
    // Arrange
    const metrics = [
      {
        title: 'Single Metric',
        value: 'R$ 500',
        change: '7%',
        changeType: 'positive' as const,
        icon: 'single'
      }
    ]

    // Act
    render(<MetricOverview metrics={metrics} />)

    // Assert
    const card = screen.getByTestId('metric-card-Single Metric')
    expect(card).toBeInTheDocument()
    expect(card).toHaveTextContent('Single Metric: R$ 500')
  })

  it('When MetricOverview uses map with index as key, then should render cards in correct order', () => {
    // Arrange
    const metrics = [
      {
        title: 'First',
        value: '1',
        change: '1%',
        changeType: 'positive' as const,
        icon: 'first'
      },
      {
        title: 'Second',
        value: '2',
        change: '2%',
        changeType: 'positive' as const,
        icon: 'second'
      }
    ]

    // Act
    const { container } = render(<MetricOverview metrics={metrics} />)

    // Assert
    const cards = container.querySelectorAll('[data-testid^="metric-card-"]')
    expect(cards[0]).toHaveAttribute('data-testid', 'metric-card-First')
    expect(cards[1]).toHaveAttribute('data-testid', 'metric-card-Second')
  })
})