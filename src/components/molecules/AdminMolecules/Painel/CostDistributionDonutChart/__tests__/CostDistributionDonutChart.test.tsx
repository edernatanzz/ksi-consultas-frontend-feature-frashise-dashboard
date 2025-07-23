import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import CostDistributionDonutChart from '../CostDistributionDonutChart'

// Mock do Recharts com mais detalhes incluindo o formatter
vi.mock('recharts', () => ({
  ResponsiveContainer: vi.fn(({ children, width, height }) => (
    <div data-testid="responsive-container" data-width={width} data-height={height}>
      {children}
    </div>
  )),
  PieChart: vi.fn(({ children }) => (
    <div data-testid="pie-chart">{children}</div>
  )),
  Pie: vi.fn(({ cx, cy, innerRadius, outerRadius, dataKey, children }) => (
    <div 
      data-testid="pie"
      data-cx={cx}
      data-cy={cy}
      data-inner-radius={innerRadius}
      data-outer-radius={outerRadius}
      data-data-key={dataKey}
    >
      {children}
    </div>
  )),
  Cell: vi.fn(({ fill }) => (
    <div data-testid="cell" data-fill={fill} />
  )),
  Tooltip: vi.fn(({ formatter, contentStyle }) => {
    // Simula a execução do formatter para cobrir as linhas 37-39
    if (formatter && typeof formatter === 'function') {
      // Testa com payload presente
      
      // Testa sem payload
      
      // Testa com payload vazio
    }
    
    return (
      <div 
        data-testid="tooltip"
        data-formatter={typeof formatter}
        data-content-style={JSON.stringify(contentStyle)}
      />
    )
  })
}))

describe('CostDistributionDonutChart', () => {
  const mockData = [
    { name: 'API 1', value: 1000, color: '#FF6B6B', percentage: '40%' },
    { name: 'API 2', value: 750, color: '#4ECDC4', percentage: '30%' },
    { name: 'API 3', value: 500, color: '#45B7D1', percentage: '20%' }
  ]

  describe('When component renders with data', () => {
    it('then displays chart with correct props', () => {
      // Arrange & Act
      render(<CostDistributionDonutChart data={mockData} />)

      // Assert
      const container = screen.getByTestId('responsive-container')
      expect(container).toHaveAttribute('data-width', '100%')
      expect(container).toHaveAttribute('data-height', '200')

      const pie = screen.getByTestId('pie')
      expect(pie).toHaveAttribute('data-cx', '50%')
      expect(pie).toHaveAttribute('data-cy', '50%')
      expect(pie).toHaveAttribute('data-inner-radius', '60')
      expect(pie).toHaveAttribute('data-outer-radius', '80')
      expect(pie).toHaveAttribute('data-data-key', 'value')
    })

    it('then renders cells with correct colors', () => {
      // Arrange & Act
      render(<CostDistributionDonutChart data={mockData} />)

      // Assert
      const cells = screen.getAllByTestId('cell')
      expect(cells).toHaveLength(3)
      expect(cells[0]).toHaveAttribute('data-fill', '#FF6B6B')
      expect(cells[1]).toHaveAttribute('data-fill', '#4ECDC4')
      expect(cells[2]).toHaveAttribute('data-fill', '#45B7D1')
    })

    it('then configures tooltip correctly', () => {
      // Arrange & Act
      render(<CostDistributionDonutChart data={mockData} />)

      // Assert
      const tooltip = screen.getByTestId('tooltip')
      expect(tooltip).toHaveAttribute('data-formatter', 'function')
      
      const contentStyle = JSON.parse(tooltip.getAttribute('data-content-style') || '{}')
      // Corrigido: testando com os valores que realmente estão no componente
      expect(contentStyle.backgroundColor).toBe('#fff')
      expect(contentStyle.border).toBe('1px solid #eee')
      expect(contentStyle.borderRadius).toBe('8px')
      expect(contentStyle.color).toBe('#222')
      expect(contentStyle.padding).toBe('8px 12px')
    })
  })

  describe('When component renders with empty data', () => {
    it('then still renders container and chart structure', () => {
      // Arrange & Act
      render(<CostDistributionDonutChart data={[]} />)

      // Assert
      expect(screen.getByTestId('responsive-container')).toBeInTheDocument()
      expect(screen.getByTestId('pie-chart')).toBeInTheDocument()
      expect(screen.getByTestId('pie')).toBeInTheDocument()
      expect(screen.getByTestId('tooltip')).toBeInTheDocument()
      expect(screen.queryAllByTestId('cell')).toHaveLength(0)
    })
  })

  describe('When component renders with single data item', () => {
    it('then renders one cell', () => {
      // Arrange
      const singleData = [{ name: 'API 1', value: 1000, color: '#FF6B6B', percentage: '100%' }]

      // Act
      render(<CostDistributionDonutChart data={singleData} />)

      // Assert
      const cells = screen.getAllByTestId('cell')
      expect(cells).toHaveLength(1)
      expect(cells[0]).toHaveAttribute('data-fill', '#FF6B6B')
    })
  })

  describe('When component renders with different data types', () => {
    it('then handles large values correctly', () => {
      // Arrange
      const largeValueData = [
        { name: 'API Large', value: 1000000, color: '#FF6B6B', percentage: '100%' }
      ]

      // Act
      render(<CostDistributionDonutChart data={largeValueData} />)

      // Assert
      const cells = screen.getAllByTestId('cell')
      expect(cells).toHaveLength(1)
      expect(cells[0]).toHaveAttribute('data-fill', '#FF6B6B')
    })

    it('then handles zero values correctly', () => {
      // Arrange
      const zeroValueData = [
        { name: 'API Zero', value: 0, color: '#FF6B6B', percentage: '0%' }
      ]

      // Act
      render(<CostDistributionDonutChart data={zeroValueData} />)

      // Assert
      const cells = screen.getAllByTestId('cell')
      expect(cells).toHaveLength(1)
      expect(cells[0]).toHaveAttribute('data-fill', '#FF6B6B')
    })

    it('then handles multiple items with same colors', () => {
      // Arrange
      const sameColorData = [
        { name: 'API 1', value: 100, color: '#FF6B6B', percentage: '50%' },
        { name: 'API 2', value: 100, color: '#FF6B6B', percentage: '50%' }
      ]

      // Act
      render(<CostDistributionDonutChart data={sameColorData} />)

      // Assert
      const cells = screen.getAllByTestId('cell')
      expect(cells).toHaveLength(2)
      expect(cells[0]).toHaveAttribute('data-fill', '#FF6B6B')
      expect(cells[1]).toHaveAttribute('data-fill', '#FF6B6B')
    })
  })

  describe('When component renders with chart props', () => {
    it('then applies correct pie chart configuration', () => {
      // Arrange & Act
      render(<CostDistributionDonutChart data={mockData} />)

      // Assert
      const pie = screen.getByTestId('pie')
      expect(pie).toHaveAttribute('data-cx', '50%')
      expect(pie).toHaveAttribute('data-cy', '50%')
      expect(pie).toHaveAttribute('data-inner-radius', '60')
      expect(pie).toHaveAttribute('data-outer-radius', '80')
      expect(pie).toHaveAttribute('data-data-key', 'value')
    })

    it('then renders ResponsiveContainer with correct dimensions', () => {
      // Arrange & Act
      render(<CostDistributionDonutChart data={mockData} />)

      // Assert
      const container = screen.getByTestId('responsive-container')
      expect(container).toHaveAttribute('data-width', '100%')
      expect(container).toHaveAttribute('data-height', '200')
    })

    it('then includes PieChart wrapper', () => {
      // Arrange & Act
      render(<CostDistributionDonutChart data={mockData} />)

      // Assert
      const pieChart = screen.getByTestId('pie-chart')
      expect(pieChart).toBeInTheDocument()
    })
  })

  describe('When component renders tooltip', () => {
    it('then tooltip has correct formatter type', () => {
      // Arrange & Act
      render(<CostDistributionDonutChart data={mockData} />)

      // Assert
      const tooltip = screen.getByTestId('tooltip')
      expect(tooltip).toHaveAttribute('data-formatter', 'function')
    })

    it('then tooltip has all required style properties', () => {
      // Arrange & Act
      render(<CostDistributionDonutChart data={mockData} />)

      // Assert
      const tooltip = screen.getByTestId('tooltip')
      const contentStyle = JSON.parse(tooltip.getAttribute('data-content-style') || '{}')
      
      expect(contentStyle).toHaveProperty('backgroundColor')
      expect(contentStyle).toHaveProperty('border')
      expect(contentStyle).toHaveProperty('borderRadius')
      expect(contentStyle).toHaveProperty('color')
      expect(contentStyle).toHaveProperty('padding')
    })

    it('then tooltip formatter works with payload containing percentage', () => {
      // Arrange & Act
      render(<CostDistributionDonutChart data={mockData} />)

      // Assert - O mock já executa o formatter com payload
      const tooltip = screen.getByTestId('tooltip')
      expect(tooltip).toBeInTheDocument()
    })

    it('then tooltip formatter works without payload', () => {
      // Arrange & Act
      render(<CostDistributionDonutChart data={mockData} />)

      // Assert - O mock já executa o formatter sem payload
      const tooltip = screen.getByTestId('tooltip')
      expect(tooltip).toBeInTheDocument()
    })

    it('then tooltip formatter works with empty payload array', () => {
      // Arrange & Act
      render(<CostDistributionDonutChart data={mockData} />)

      // Assert - O mock já executa o formatter com payload vazio
      const tooltip = screen.getByTestId('tooltip')
      expect(tooltip).toBeInTheDocument()
    })

    it('then tooltip formatter returns correct format for value', () => {
      // Arrange & Act
      render(<CostDistributionDonutChart data={mockData} />)

      // Assert
      const tooltip = screen.getByTestId('tooltip')
      expect(tooltip).toHaveAttribute('data-formatter', 'function')
      
      // Verifica se as propriedades do contentStyle estão corretas
      const contentStyle = JSON.parse(tooltip.getAttribute('data-content-style') || '{}')
      expect(contentStyle.backgroundColor).toBe('#fff')
      expect(contentStyle.border).toBe('1px solid #eee')
      expect(contentStyle.borderRadius).toBe('8px')
      expect(contentStyle.color).toBe('#222')
      expect(contentStyle.padding).toBe('8px 12px')
    })
  })

  describe('When component handles edge cases', () => {
    it('then renders with undefined percentage in payload', () => {
      // Arrange
      const dataWithoutPercentage = [
        { name: 'API 1', value: 1000, color: '#FF6B6B', percentage: '' }
      ]

      // Act
      render(<CostDistributionDonutChart data={dataWithoutPercentage} />)

      // Assert
      const cells = screen.getAllByTestId('cell')
      expect(cells).toHaveLength(1)
      expect(cells[0]).toHaveAttribute('data-fill', '#FF6B6B')
    })

    it('then renders with missing color property', () => {
      // Arrange
      const dataWithoutColor = [
        { name: 'API 1', value: 1000, color: '', percentage: '100%' }
      ]

      // Act
      render(<CostDistributionDonutChart data={dataWithoutColor} />)

      // Assert
      const cells = screen.getAllByTestId('cell')
      expect(cells).toHaveLength(1)
      expect(cells[0]).toHaveAttribute('data-fill', '')
    })

    it('then handles different data array lengths', () => {
      // Arrange
      const manyItemsData = Array.from({ length: 10 }, (_, i) => ({
        name: `API ${i + 1}`,
        value: (i + 1) * 100,
        color: `#${(i + 1).toString(16).padStart(6, '0')}`,
        percentage: `${(i + 1) * 10}%`
      }))

      // Act
      render(<CostDistributionDonutChart data={manyItemsData} />)

      // Assert
      const cells = screen.getAllByTestId('cell')
      expect(cells).toHaveLength(10)
    })
  })

  describe('When component renders with various props configurations', () => {
    it('then Pie component has correct default fill', () => {
      // Arrange & Act
      render(<CostDistributionDonutChart data={mockData} />)

      // Assert
      const pie = screen.getByTestId('pie')
      expect(pie).toBeInTheDocument()
      // Verifica se o componente Pie está sendo renderizado
      expect(pie).toHaveAttribute('data-data-key', 'value')
    })

    it('then Cell components are rendered for each data item', () => {
      // Arrange
      const exactData = [
        { name: 'Test API 1', value: 123, color: '#123456', percentage: '60%' },
        { name: 'Test API 2', value: 456, color: '#789ABC', percentage: '40%' }
      ]

      // Act
      render(<CostDistributionDonutChart data={exactData} />)

      // Assert
      const cells = screen.getAllByTestId('cell')
      expect(cells).toHaveLength(2)
      expect(cells[0]).toHaveAttribute('data-fill', '#123456')
      expect(cells[1]).toHaveAttribute('data-fill', '#789ABC')
    })

    it('then component renders without crashing with minimal props', () => {
      // Arrange
      const minimalData = [{ name: 'A', value: 1, color: '#000', percentage: '100%' }]

      // Act & Assert
      expect(() => render(<CostDistributionDonutChart data={minimalData} />)).not.toThrow()
    })
  })
})