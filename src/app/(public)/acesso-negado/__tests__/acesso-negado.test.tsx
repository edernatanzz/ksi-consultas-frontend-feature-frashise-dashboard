import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import AcessoNegadoPage from '../page'


vi.mock('@/components/template/AcessoNegado/AcessoNegado', () => ({
  AcessoNegado: vi.fn(() => <div data-testid="acesso-negado-component">AcessoNegado Component</div>)
}))

describe('AcessoNegadoPage', () => {
  describe('When page renders', () => {
    it('then renders AcessoNegado component', () => {
      // Arrange & Act
      render(<AcessoNegadoPage />)

      // Assert
      expect(screen.getByTestId('acesso-negado-component')).toBeInTheDocument()
    })
  })
})