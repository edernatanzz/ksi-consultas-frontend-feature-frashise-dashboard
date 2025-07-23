import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import CostEvolutionAreaChart from '../CostEvolutionAreaChart'

// Mock Recharts components
vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="responsive-container">{children}</div>
  ),
  AreaChart: ({ children, data }: { children: React.ReactNode; data: unknown[] }) => (
    <div data-testid="area-chart" data-data-length={data.length}>
      {children}
    </div>
  ),
  Area: ({ dataKey, stroke, fill }: { dataKey: string; stroke: string; fill: string }) => (
    <div data-testid={`area-${dataKey}`} data-stroke={stroke} data-fill={fill} />
  ),
  XAxis: ({ dataKey }: { dataKey: string }) => (
    <div data-testid="x-axis" data-key={dataKey} />
  ),
  YAxis: ({ tickFormatter }: { tickFormatter?: (value: number) => string }) => {
    // Test the tickFormatter function if provided
    if (tickFormatter) {
      const formattedValue = tickFormatter(100)
      return <div data-testid="y-axis" data-formatted-value={formattedValue} />
    }
    return <div data-testid="y-axis" />
  },
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  Tooltip: ({ formatter }: { formatter?: (value: number) => string }) => {
    // Test the formatter function if provided
    if (formatter) {
      const formattedValue = formatter(1000)
      return <div data-testid="tooltip" data-formatted-value={formattedValue} />
    }
    return <div data-testid="tooltip" />
  }
}))

describe('CostEvolutionAreaChart Component', () => {
  it('When CostEvolutionAreaChart is rendered with data, then should display ResponsiveContainer', () => {
    // Arrange
    const data = [{ name: 'Jan', Serasa: 100, SPC: 200, Receita: 300 }]
    const series = [{ key: 'Serasa', color: '#8884d8', name: 'Serasa' }]

    // Act
    render(<CostEvolutionAreaChart data={data} series={series} />)

    // Assert
    expect(screen.getByTestId('responsive-container')).toBeInTheDocument()
  })

  it('When CostEvolutionAreaChart is rendered, then should display AreaChart with correct data length', () => {
    // Arrange
    const data = [
      { name: 'Jan', Serasa: 100, SPC: 200, Receita: 300 },
      { name: 'Feb', Serasa: 150, SPC: 250, Receita: 350 }
    ]
    const series = [{ key: 'Serasa', color: '#8884d8', name: 'Serasa' }]

    // Act
    render(<CostEvolutionAreaChart data={data} series={series} />)

    // Assert
    const areaChart = screen.getByTestId('area-chart')
    expect(areaChart).toHaveAttribute('data-data-length', '2')
  })

  it('When CostEvolutionAreaChart is rendered, then should display chart components', () => {
    // Arrange
    const data = [{ name: 'Jan', Serasa: 100, SPC: 200, Receita: 300 }]
    const series = [{ key: 'Serasa', color: '#8884d8', name: 'Serasa' }]

    // Act
    render(<CostEvolutionAreaChart data={data} series={series} />)

    // Assert
    expect(screen.getByTestId('x-axis')).toBeInTheDocument()
    expect(screen.getByTestId('y-axis')).toBeInTheDocument()
    expect(screen.getByTestId('cartesian-grid')).toBeInTheDocument()
    expect(screen.getByTestId('tooltip')).toBeInTheDocument()
  })

  it('When series data is provided, then should render Area components with correct props', () => {
    // Arrange
    const data = [{ name: 'Jan', Serasa: 100, SPC: 200, Receita: 300 }]
    const series = [
      { key: 'Serasa', color: '#8884d8', name: 'Serasa' },
      { key: 'SPC', color: '#82ca9d', name: 'SPC' }
    ]

    // Act
    render(<CostEvolutionAreaChart data={data} series={series} />)

    // Assert
    const serasaArea = screen.getByTestId('area-Serasa')
    expect(serasaArea).toHaveAttribute('data-stroke', '#8884d8')
    expect(serasaArea).toHaveAttribute('data-fill', '#8884d8')

    const spcArea = screen.getByTestId('area-SPC')
    expect(spcArea).toHaveAttribute('data-stroke', '#82ca9d')
    expect(spcArea).toHaveAttribute('data-fill', '#82ca9d')
  })

  it('When XAxis is rendered, then should use name as dataKey', () => {
    // Arrange
    const data = [{ name: 'Jan', Serasa: 100, SPC: 200, Receita: 300 }]
    const series = [{ key: 'Serasa', color: '#8884d8', name: 'Serasa' }]

    // Act
    render(<CostEvolutionAreaChart data={data} series={series} />)

    // Assert
    const xAxis = screen.getByTestId('x-axis')
    expect(xAxis).toHaveAttribute('data-key', 'name')
  })

  it('When YAxis tickFormatter is called, then should format value with R$ prefix', () => {
    // Arrange
    const data = [{ name: 'Jan', Serasa: 100, SPC: 200, Receita: 300 }]
    const series = [{ key: 'Serasa', color: '#8884d8', name: 'Serasa' }]

    // Act
    render(<CostEvolutionAreaChart data={data} series={series} />)

    // Assert
    const yAxis = screen.getByTestId('y-axis')
    expect(yAxis).toHaveAttribute('data-formatted-value', 'R$ 100')
  })

  it('When Tooltip formatter is called, then should format value with R$ and locale', () => {
    // Arrange
    const data = [{ name: 'Jan', Serasa: 100, SPC: 200, Receita: 300 }]
    const series = [{ key: 'Serasa', color: '#8884d8', name: 'Serasa' }]

    // Act
    render(<CostEvolutionAreaChart data={data} series={series} />)

    // Assert
    const tooltip = screen.getByTestId('tooltip')
    expect(tooltip).toHaveAttribute('data-formatted-value', 'R$ 1.000')
  })
})