import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { AcessoNegado } from '../AcessoNegado'

const mockBack = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({ back: mockBack })
}))

describe('AcessoNegado', () => {
  beforeEach(() => {
    mockBack.mockClear()
  })

  describe('When renders with default props', () => {
    it('then shows default message and back button', () => {
      // Arrange & Act
      render(<AcessoNegado />)

      // Assert
      expect(screen.getByText('Acesso Negado')).toBeInTheDocument()
      expect(screen.getByText((content) => 
        content.includes('Você não tem permissão para acessar esta página.')
      )).toBeInTheDocument()
      expect(screen.getByText('Voltar')).toBeInTheDocument()
    })
  })

  describe('When renders with custom message', () => {
    it('then shows custom message', () => {
      // Arrange
      const customMessage = 'Mensagem personalizada'

      // Act
      render(<AcessoNegado message={customMessage} />)

      // Assert
      expect(screen.getByText((content) => 
        content.includes(customMessage)
      )).toBeInTheDocument()
    })
  })

  describe('When showBackButton is false', () => {
    it('then hides back button', () => {
      // Arrange & Act
      render(<AcessoNegado showBackButton={false} />)

      // Assert
      expect(screen.queryByText('Voltar')).not.toBeInTheDocument()
    })
  })

  describe('When back button is clicked', () => {
    it('then calls router.back', () => {
      // Arrange
      render(<AcessoNegado />)

      // Act
      fireEvent.click(screen.getByText('Voltar'))

      // Assert
      expect(mockBack).toHaveBeenCalledOnce()
    })
  })
})