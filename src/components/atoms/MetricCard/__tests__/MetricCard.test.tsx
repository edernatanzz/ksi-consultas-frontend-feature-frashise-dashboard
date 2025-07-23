import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import MetricCard from '../MetricCard'

// Mock dos ícones do Lucide React
vi.mock('lucide-react', () => ({
  TrendingUp: vi.fn(({ size, className }) => (
    <svg data-testid="trending-up-icon" data-size={size} className={className}>
      TrendingUp
    </svg>
  )),
  TrendingDown: vi.fn(({ size, className }) => (
    <svg data-testid="trending-down-icon" data-size={size} className={className}>
      TrendingDown
    </svg>
  ))
}))

describe('MetricCard', () => {
  const mockIcon = <div data-testid="mock-icon">📊</div>

  const defaultProps = {
    icon: mockIcon,
    label: 'Total Users',
    value: '1,234',
    valueColor: 'text-blue-500'
  }

  describe('When component renders', () => {
    it('then displays basic metric information', () => {
      // Arrange & Act
      render(<MetricCard {...defaultProps} />)

      // Assert
      expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
      expect(screen.getByText('Total Users')).toBeInTheDocument()
      expect(screen.getByText('1,234')).toBeInTheDocument()
    })

    it('then applies value color correctly', () => {
      // Arrange & Act
      render(<MetricCard {...defaultProps} />)

      // Assert
      const valueElement = screen.getByText('1,234')
      expect(valueElement).toHaveClass('text-blue-500')
    })
  })

  describe('When trend is up', () => {
    it('then displays trending up icon and positive trend', () => {
      // Arrange & Act
      render(
        <MetricCard 
          {...defaultProps} 
          trendValue="12%" 
          trendType="up" 
        />
      )

      // Assert
      expect(screen.getByTestId('trending-up-icon')).toBeInTheDocument()
      expect(screen.getByText('+12%')).toBeInTheDocument()
      expect(screen.queryByTestId('trending-down-icon')).not.toBeInTheDocument()
    })

    it('then applies default green color for up trend', () => {
      // Arrange & Act
      render(
        <MetricCard 
          {...defaultProps} 
          trendValue="12%" 
          trendType="up" 
        />
      )

      // Assert
      const trendIcon = screen.getByTestId('trending-up-icon')
      expect(trendIcon).toHaveClass('text-green-500')
      
      const trendText = screen.getByText('+12%')
      expect(trendText).toHaveClass('text-green-600')
    })
  })

  describe('When trend is down', () => {
    it('then displays trending down icon and negative trend', () => {
      // Arrange & Act
      render(
        <MetricCard 
          {...defaultProps} 
          trendValue="8%" 
          trendType="down" 
        />
      )

      // Assert
      expect(screen.getByTestId('trending-down-icon')).toBeInTheDocument()
      expect(screen.getByText('-8%')).toBeInTheDocument()
      expect(screen.queryByTestId('trending-up-icon')).not.toBeInTheDocument()
    })

    it('then applies default red color for down trend', () => {
      // Arrange & Act
      render(
        <MetricCard 
          {...defaultProps} 
          trendValue="8%" 
          trendType="down" 
        />
      )

      // Assert
      const trendIcon = screen.getByTestId('trending-down-icon')
      expect(trendIcon).toHaveClass('text-red-500')
      
      const trendText = screen.getByText('-8%')
      expect(trendText).toHaveClass('text-green-600')
    })
  })

  describe('When custom trend color is provided', () => {
    it('then applies custom color instead of default', () => {
      // Arrange & Act
      render(
        <MetricCard 
          {...defaultProps} 
          trendValue="15%" 
          trendType="up" 
          trendColor="text-purple-500"
        />
      )

      // Assert
      const trendIcon = screen.getByTestId('trending-up-icon')
      expect(trendIcon).toHaveClass('text-purple-500')
      
      const trendText = screen.getByText('+15%')
      expect(trendText).toHaveClass('text-purple-500')
    })
  })

  describe('When no trend is provided', () => {
    it('then does not display trend information', () => {
      // Arrange & Act
      render(<MetricCard {...defaultProps} />)

      // Assert
      expect(screen.queryByTestId('trending-up-icon')).not.toBeInTheDocument()
      expect(screen.queryByTestId('trending-down-icon')).not.toBeInTheDocument()
      expect(screen.queryByText(/\+/)).not.toBeInTheDocument()
      expect(screen.queryByText(/-/)).not.toBeInTheDocument()
    })
  })

  describe('When value is a number', () => {
    it('then displays numeric value correctly', () => {
      // Arrange & Act
      render(<MetricCard {...defaultProps} value={5678} />)

      // Assert
      expect(screen.getByText('5678')).toBeInTheDocument()
    })
  })

  describe('When trend icons have correct props', () => {
    it('then trending up icon has correct size', () => {
      // Arrange & Act
      render(
        <MetricCard 
          {...defaultProps} 
          trendValue="10%" 
          trendType="up" 
        />
      )

      // Assert
      const trendIcon = screen.getByTestId('trending-up-icon')
      expect(trendIcon).toHaveAttribute('data-size', '14')
    })

    it('then trending down icon has correct size', () => {
      // Arrange & Act
      render(
        <MetricCard 
          {...defaultProps} 
          trendValue="5%" 
          trendType="down" 
        />
      )

      // Assert
      const trendIcon = screen.getByTestId('trending-down-icon')
      expect(trendIcon).toHaveAttribute('data-size', '14')
    })
  })
})