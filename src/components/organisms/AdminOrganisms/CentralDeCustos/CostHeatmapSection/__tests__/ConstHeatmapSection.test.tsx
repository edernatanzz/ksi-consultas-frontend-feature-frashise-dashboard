import { render, screen } from '@testing-library/react'
import CostHeatmapSection from '../CostHeatmapSection'

describe('CostHeatmapSection', () => {
  const mockData = [
    {
      day: 'Segunda',
      hourlyCosts: Array.from({ length: 24 }, (_, i) => ({ value: i * 4 }))
    },
    {
      day: 'Terça',
      hourlyCosts: Array.from({ length: 24 }, (_, i) => ({ value: 95 - i }))
    }
  ]

  describe('When component renders', () => {
    it('then displays heatmap title and legend', () => {
      // Arrange & Act
      render(<CostHeatmapSection data={mockData} />)

      // Assert
      expect(screen.getByText('Mapa de Calor - Custos por Horário')).toBeInTheDocument()
      expect(screen.getByText('Baixo')).toBeInTheDocument()
      expect(screen.getByText('Alto')).toBeInTheDocument()
    })
  })

  describe('When data is provided', () => {
    it('then displays days and hour headers', () => {
      // Arrange & Act
      render(<CostHeatmapSection data={mockData} />)

      // Assert
      expect(screen.getByText('Segunda')).toBeInTheDocument()
      expect(screen.getByText('Terça')).toBeInTheDocument()
      expect(screen.getByText('00h')).toBeInTheDocument()
      expect(screen.getByText('23h')).toBeInTheDocument()
    })
  })

  describe('When rendering heatmap cells', () => {
    it('then applies correct color classes based on values', () => {
      // Arrange & Act
      render(<CostHeatmapSection data={mockData} />)

      // Assert
      const cells = document.querySelectorAll('[title*="Custo:"]')
      expect(cells.length).toBeGreaterThan(0)
      expect(cells[0]).toHaveClass('bg-green-400') // Low value
    })
  })
})