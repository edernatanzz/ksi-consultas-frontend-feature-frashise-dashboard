import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import MetricCard from '../MetricCard'

describe('MetricCard Component', () => {
  it('When MetricCard is rendered with basic props, then should display title and value', () => {
    // Arrange
    const props = {
      title: 'Test Title',
      value: 'R$ 1.000',
      change: '10%',
      changeType: 'positive' as const,
      icon: 'monetization_on'
    }

    // Act
    render(<MetricCard {...props} />)

    // Assert
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('R$ 1.000')).toBeInTheDocument()
  })

  it('When changeType is positive, then should display positive change with green color and plus sign', () => {
    // Arrange
    const props = {
      title: 'Revenue',
      value: 'R$ 5.000',
      change: '15%',
      changeType: 'positive' as const,
      icon: 'trending_up'
    }

    // Act
    render(<MetricCard {...props} />)

    // Assert
    const changeElement = screen.getByText('+15% vs mês anterior')
    expect(changeElement).toHaveClass('text-green-500')
  })

  it('When changeType is negative, then should display negative change with red color', () => {
    // Arrange
    const props = {
      title: 'Expenses',
      value: 'R$ 2.000',
      change: '5%',
      changeType: 'negative' as const,
      icon: 'trending_down'
    }

    // Act
    render(<MetricCard {...props} />)

    // Assert
    const changeElement = screen.getByText('5% vs mês anterior')
    expect(changeElement).toHaveClass('text-red-500')
  })

  it('When changeType is neutral, then should display neutral change with gray color', () => {
    // Arrange
    const props = {
      title: 'Balance',
      value: 'R$ 3.000',
      change: '0%',
      changeType: 'neutral' as const,
      icon: 'balance'
    }

    // Act
    render(<MetricCard {...props} />)

    // Assert
    const changeElement = screen.getByText('0% vs mês anterior')
    expect(changeElement).toHaveClass('text-gray-500')
  })

  it('When title matches predefined titles, then should apply correct icon background class', () => {
    // Arrange
    const props = {
      title: 'Custo Total Mensal',
      value: 'R$ 1.500',
      change: '8%',
      changeType: 'positive' as const,
      icon: 'account_balance'
    }

    // Act
    const { container } = render(<MetricCard {...props} />)

    // Assert
    const iconWrapper = container.querySelector('.bg-blue-100')
    expect(iconWrapper).toHaveClass('text-blue-600')
  })

  it('When title does not match predefined titles, then should apply default icon background class', () => {
    // Arrange
    const props = {
      title: 'Unknown Metric',
      value: 'R$ 999',
      change: '2%',
      changeType: 'positive' as const,
      icon: 'help'
    }

    // Act
    const { container } = render(<MetricCard {...props} />)

    // Assert
    const iconWrapper = container.querySelector('.bg-gray-100')
    expect(iconWrapper).toHaveClass('text-gray-600')
  })

  it('When MetricCard is rendered, then should display trending up icon', () => {
    // Arrange
    const props = {
      title: 'Test',
      value: 'R$ 100',
      change: '1%',
      changeType: 'positive' as const,
      icon: 'star'
    }

    // Act
    render(<MetricCard {...props} />)

    // Assert
    expect(screen.getByText('trending_up')).toBeInTheDocument()
  })

  it('When MetricCard is rendered, then should display provided icon', () => {
    // Arrange
    const props = {
      title: 'Test',
      value: 'R$ 200',
      change: '3%',
      changeType: 'neutral' as const,
      icon: 'dashboard'
    }

    // Act
    render(<MetricCard {...props} />)

    // Assert
    expect(screen.getByText('dashboard')).toBeInTheDocument()
  })
})