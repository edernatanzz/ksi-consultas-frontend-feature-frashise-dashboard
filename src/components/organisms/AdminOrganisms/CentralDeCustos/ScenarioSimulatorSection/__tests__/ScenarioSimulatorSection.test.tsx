import { render, screen } from '@testing-library/react'
import ScenarioSimulatorSection from '../ScenarioSimulatorSection'

describe('ScenarioSimulatorSection', () => {
  const mockScenarios = [
    {
      label: 'Cenário A',
      description: 'Descrição do cenário A',
      value: 1000,
      difference: -200,
      isHighlighted: true
    },
    {
      label: 'Cenário B',
      description: 'Descrição do cenário B',
      value: 1500,
      difference: 300
    }
  ]

  const defaultProps = {
    scenarios: mockScenarios,
    projectedAnnualSavings: 5000
  }

  describe('When component renders', () => {
    it('then displays simulator title and scenarios', () => {
      // Arrange & Act
      render(<ScenarioSimulatorSection {...defaultProps} />)

      // Assert
      expect(screen.getByText('Simulador de Cenários')).toBeInTheDocument()
      expect(screen.getByText('Cenário A')).toBeInTheDocument()
      expect(screen.getByText('Cenário B')).toBeInTheDocument()
    })
  })

  describe('When displaying projected savings', () => {
    it('then shows annual savings amount', () => {
      // Arrange & Act
      render(<ScenarioSimulatorSection {...defaultProps} />)

      // Assert
      expect(screen.getByText('Economia Anual Projetada')).toBeInTheDocument()
      expect(screen.getByText(/R\$ 5\.000/)).toBeInTheDocument()
    })
  })

  describe('When action button is present', () => {
    it('then displays apply scenario button', () => {
      // Arrange & Act
      render(<ScenarioSimulatorSection {...defaultProps} />)

      // Assert
      expect(screen.getByText('Aplicar Cenário Selecionado')).toBeInTheDocument()
    })
  })
})