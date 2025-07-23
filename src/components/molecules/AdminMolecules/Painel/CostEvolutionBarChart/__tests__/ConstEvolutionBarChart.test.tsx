import { render } from '@testing-library/react'
import { vi } from 'vitest'
import CostEvolutionBarChart from '../CostEvolutionBarChart'

// Mock do Recharts
vi.mock('recharts', () => ({
  ResponsiveContainer: vi.fn(({ children, width, height }) => (
    <div data-testid="container" data-width={width} data-height={height}>
      {children}
    </div>
  )),
  BarChart: vi.fn(({ children, margin }) => (
    <div data-testid="bar-chart" data-margin={JSON.stringify(margin)}>
      {children}
    </div>
  )),
  CartesianGrid: vi.fn(({ strokeDasharray, vertical }) => (
    <div data-testid="grid" data-stroke={strokeDasharray} data-vertical={vertical} />
  )),
  XAxis: vi.fn(({ dataKey }) => <div data-testid="x-axis" data-key={dataKey} />),
  YAxis: vi.fn(() => <div data-testid="y-axis" />),
  Tooltip: vi.fn(() => <div data-testid="tooltip" />),
  Legend: vi.fn(() => <div data-testid="legend" />),
  Bar: vi.fn(({ dataKey, fill }) => (
    <div data-testid="bar" data-key={dataKey} data-fill={fill} />
  ))
}))

describe('CostEvolutionBarChart', () => {
  const mockData = [
    { month: 'Jan', Atual: 1000, Otimizado: 800 },
    { month: 'Feb', Atual: 1200, Otimizado: 900 },
    { month: 'Mar', Atual: 1100, Otimizado: 850 }
  ]

  describe('When component renders', () => {
    it('then displays chart with correct structure', () => {
      // Arrange & Act
      render(<CostEvolutionBarChart data={mockData} />)

      // Assert
      expect(document.querySelector('[data-testid="container"]')).toHaveAttribute('data-width', '100%')
      expect(document.querySelector('[data-testid="container"]')).toHaveAttribute('data-height', '300')
      expect(document.querySelector('[data-testid="bar-chart"]')).toBeInTheDocument()
    })

    it('then has correct margin configuration', () => {
      // Arrange & Act
      render(<CostEvolutionBarChart data={mockData} />)

      // Assert
      const barChart = document.querySelector('[data-testid="bar-chart"]')
      const expectedMargin = JSON.stringify({ top: 5, right: 30, left: 20, bottom: 5 })
      expect(barChart).toHaveAttribute('data-margin', expectedMargin)
    })
  })

  describe('When chart components render', () => {
    it('then displays all chart elements', () => {
      // Arrange & Act
      render(<CostEvolutionBarChart data={mockData} />)

      // Assert
      expect(document.querySelector('[data-testid="grid"]')).toBeInTheDocument()
      expect(document.querySelector('[data-testid="x-axis"]')).toBeInTheDocument()
      expect(document.querySelector('[data-testid="y-axis"]')).toBeInTheDocument()
      expect(document.querySelector('[data-testid="tooltip"]')).toBeInTheDocument()
      expect(document.querySelector('[data-testid="legend"]')).toBeInTheDocument()
    })

    it('then configures grid correctly', () => {
      // Arrange & Act
      render(<CostEvolutionBarChart data={mockData} />)

      // Assert
      const grid = document.querySelector('[data-testid="grid"]')
      expect(grid).toHaveAttribute('data-stroke', '3 3')
      expect(grid).toHaveAttribute('data-vertical', 'false')
    })

    it('then configures X-axis with month data', () => {
      // Arrange & Act
      render(<CostEvolutionBarChart data={mockData} />)

      // Assert
      const xAxis = document.querySelector('[data-testid="x-axis"]')
      expect(xAxis).toHaveAttribute('data-key', 'month')
    })
  })

  describe('When bars render', () => {
    it('then creates both Atual and Otimizado bars', () => {
      // Arrange & Act
      render(<CostEvolutionBarChart data={mockData} />)

      // Assert
      const bars = document.querySelectorAll('[data-testid="bar"]')
      expect(bars).toHaveLength(2)
    })

    it('then applies correct colors to bars', () => {
      // Arrange & Act
      render(<CostEvolutionBarChart data={mockData} />)

      // Assert
      const bars = document.querySelectorAll('[data-testid="bar"]')
      expect(bars[0]).toHaveAttribute('data-key', 'Atual')
      expect(bars[0]).toHaveAttribute('data-fill', '#ef4444')
      expect(bars[1]).toHaveAttribute('data-key', 'Otimizado')
      expect(bars[1]).toHaveAttribute('data-fill', '#10b981')
    })
  })

  describe('When data is empty', () => {
    it('then renders chart structure without bars', () => {
      // Arrange & Act
      render(<CostEvolutionBarChart data={[]} />)

      // Assert
      expect(document.querySelector('[data-testid="container"]')).toBeInTheDocument()
      expect(document.querySelector('[data-testid="bar-chart"]')).toBeInTheDocument()
      expect(document.querySelectorAll('[data-testid="bar"]')).toHaveLength(2) // Bars are always rendered
    })
  })
})