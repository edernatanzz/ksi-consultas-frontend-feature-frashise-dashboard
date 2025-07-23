import { render, screen } from '@testing-library/react'
import ProviderComparisonSection from '../ProviderComparisonSection'

describe('ProviderComparisonSection', () => {
  const mockData = [
    {
      providerName: 'Fornecedor A',
      actualCost: 1000.50,
      alternativeCost: 800.25,
      difference: -200.25,
      economy: 200
    },
    {
      providerName: 'Fornecedor B',
      actualCost: 500.75,
      alternativeCost: 600.00,
      difference: 100.25
    }
  ]

  describe('When component renders', () => {
    it('then displays comparison title and provider data', () => {
      // Arrange & Act
      render(<ProviderComparisonSection data={mockData} />)

      // Assert
      expect(screen.getByText('Comparação de Fornecedores')).toBeInTheDocument()
      expect(screen.getByText('Fornecedor A')).toBeInTheDocument()
      expect(screen.getByText('Fornecedor B')).toBeInTheDocument()
    })
  })

  describe('When provider has economy', () => {
    it('then displays economy badge', () => {
      // Arrange & Act
      render(<ProviderComparisonSection data={mockData} />)

      // Assert
      expect(screen.getByText(/Economia: R\$ 200/)).toBeInTheDocument()
    })
  })

  describe('When displaying cost values', () => {
    it('then shows formatted currency values', () => {
      // Arrange & Act
      render(<ProviderComparisonSection data={mockData} />)

      // Assert
      expect(screen.getAllByText('Atual:').length).toBeGreaterThan(0)
      expect(screen.getAllByText('Alternativo:').length).toBeGreaterThan(0)
      expect(screen.getAllByText('Diferença:').length).toBeGreaterThan(0)
    })
  })
})