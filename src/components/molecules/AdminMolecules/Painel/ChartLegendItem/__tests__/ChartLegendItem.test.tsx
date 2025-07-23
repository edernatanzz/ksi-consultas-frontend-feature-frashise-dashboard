import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ChartLegendItem from '../ChartLegendItem'

describe('ChartLegendItem Component', () => {
  it('When ChartLegendItem is rendered with label and color, then should display label text', () => {
    // Arrange
    const props = { label: 'Test Label', color: 'bg-red-500' }

    // Act
    render(<ChartLegendItem {...props} />)

    // Assert
    expect(screen.getByText('Test Label')).toBeInTheDocument()
  })

  it('When ChartLegendItem is rendered, then should display color indicator with correct classes', () => {
    // Arrange
    const props = { label: 'Revenue', color: 'bg-blue-500' }

    // Act
    render(<ChartLegendItem {...props} />)

    // Assert
    const colorIndicator = document.querySelector('span.w-3')
    expect(colorIndicator).toHaveClass('w-3', 'h-3', 'rounded-full', 'bg-blue-500')
  })

  it('When ChartLegendItem is rendered, then should have correct container layout classes', () => {
    // Arrange
    const props = { label: 'Sales', color: 'bg-green-500' }

    // Act
    const { container } = render(<ChartLegendItem {...props} />)

    // Assert
    expect(container.firstChild).toHaveClass('flex', 'items-center', 'space-x-2')
  })

  it('When different color prop is provided, then should apply correct color class', () => {
    // Arrange
    const props = { label: 'Test', color: 'bg-purple-600' }

    // Act
    render(<ChartLegendItem {...props} />)

    // Assert
    const colorIndicator = document.querySelector('span.w-3')
    expect(colorIndicator).toHaveClass('bg-purple-600')
  })

  it('When label text is rendered, then should have correct text styling classes', () => {
    // Arrange
    const props = { label: 'Styled Label', color: 'bg-pink-500' }

    // Act
    render(<ChartLegendItem {...props} />)

    // Assert
    const labelElement = screen.getByText('Styled Label')
    expect(labelElement).toHaveClass('text-sm', 'text-gray-700')
  })
})