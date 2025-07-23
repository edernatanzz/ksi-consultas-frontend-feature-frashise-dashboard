import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import QuickActionsPanel from '../QuickActionsPanel'

// Mock do console.log
const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

describe('QuickActionsPanel', () => {
  beforeEach(() => {
    consoleSpy.mockClear()
  })

  afterAll(() => {
    consoleSpy.mockRestore()
  })

  describe('When component renders', () => {
    it('then displays the title', () => {
      // Arrange & Act
      render(<QuickActionsPanel />)

      // Assert
      expect(screen.getByText('Ações Rápidas')).toBeInTheDocument()
    })

    it('then displays all action buttons', () => {
      // Arrange & Act
      render(<QuickActionsPanel />)

      // Assert
      expect(screen.getByText('Reiniciar APIs Lentas')).toBeInTheDocument()
      expect(screen.getByText('Testar Conectividade')).toBeInTheDocument()
      expect(screen.getByText('Status de Fornecedores')).toBeInTheDocument()
    })
  })

  describe('When restart APIs button is clicked', () => {
    it('then calls handleRestartAPIs', () => {
      // Arrange
      render(<QuickActionsPanel />)

      // Act
      fireEvent.click(screen.getByText('Reiniciar APIs Lentas'))

      // Assert
      expect(consoleSpy).toHaveBeenCalledWith('Reiniciar APIs Lentas')
    })
  })

  describe('When test connectivity button is clicked', () => {
    it('then calls handleTestConnectivity', () => {
      // Arrange
      render(<QuickActionsPanel />)

      // Act
      fireEvent.click(screen.getByText('Testar Conectividade'))

      // Assert
      expect(consoleSpy).toHaveBeenCalledWith('Testar Conectividade')
    })
  })

  describe('When provider status button is clicked', () => {
    it('then calls handleProviderStatus', () => {
      // Arrange
      render(<QuickActionsPanel />)

      // Act
      fireEvent.click(screen.getByText('Status de Fornecedores'))

      // Assert
      expect(consoleSpy).toHaveBeenCalledWith('Status de Fornecedores')
    })
  })

  describe('When multiple buttons are clicked', () => {
    it('then calls respective handlers', () => {
      // Arrange
      render(<QuickActionsPanel />)

      // Act
      fireEvent.click(screen.getByText('Reiniciar APIs Lentas'))
      fireEvent.click(screen.getByText('Testar Conectividade'))
      fireEvent.click(screen.getByText('Status de Fornecedores'))

      // Assert
      expect(consoleSpy).toHaveBeenCalledTimes(3)
      expect(consoleSpy).toHaveBeenNthCalledWith(1, 'Reiniciar APIs Lentas')
      expect(consoleSpy).toHaveBeenNthCalledWith(2, 'Testar Conectividade')
      expect(consoleSpy).toHaveBeenNthCalledWith(3, 'Status de Fornecedores')
    })
  })

  describe('When component structure is verified', () => {
    it('then has correct container structure', () => {
      // Arrange
      const { container } = render(<QuickActionsPanel />)

      // Assert
      const panel = container.firstChild as HTMLElement
      expect(panel).toHaveClass('bg-white', 'rounded-xl', 'shadow-sm', 'border', 'border-gray-100', 'p-6')
      
      const actionsContainer = screen.getByText('Ações Rápidas').parentElement?.querySelector('.space-y-3')
      expect(actionsContainer).toBeInTheDocument()
    })
  })
})