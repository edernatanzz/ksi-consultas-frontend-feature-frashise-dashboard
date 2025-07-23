import { render, screen } from '@testing-library/react'
import AnaliseChequeSustado from '../AnaliseChequeSustado'

describe('AnaliseChequeSustado', () => {
  test('When component is rendered, then it shows the correct texts', () => {
    // Arrange
    const expectedTexts = [
      'Deseja saber se o cheque é sustado, roubado ou fraudado?',
      'Na nossa plataforma essa informação é GRATUITA.'
    ]

    // Act
    render(<AnaliseChequeSustado />)

    // Assert
    expectedTexts.forEach(text => {
      expect(screen.getByText(text)).toBeInTheDocument()
    })
  })

  test('When component is rendered, then it contains a button with correct text', () => {
    // Arrange
    const buttonText = 'Clique aqui'

    // Act
    render(<AnaliseChequeSustado />)

    // Assert
    expect(screen.getByRole('button', { name: buttonText })).toBeInTheDocument()
  })

  test('When component is rendered, then it has the correct styling', () => {
    // Arrange
    const expectedClasses = [
      'text-center',
      'text-gray-700',
      'p-4',
      'mb-4',
      'rounded-lg',
      'bg-secondary-50',
      'border-l-4',
      'border-l-primary-500'
    ]

    // Act
    const { container } = render(<AnaliseChequeSustado />)
    const divElement = container.firstChild

    // Assert
    expectedClasses.forEach(className => {
      expect(divElement).toHaveClass(className)
    })
    expect(divElement).toHaveStyle('borderLeftStyle: solid')
  })

  test('When component is rendered, then the button has the expected classes', () => {
    // Arrange
    const expectedButtonClass = 'text-gray-700'

    // Act
    render(<AnaliseChequeSustado />)
    const button = screen.getByRole('button')

    // Assert
    expect(button).toHaveClass(expectedButtonClass)
  })
})