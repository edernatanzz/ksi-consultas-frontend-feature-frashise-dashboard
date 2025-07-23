import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LoginWelcome } from '../LoginWelcome'

describe('LoginWelcome Component', () => {
  describe('Basic Rendering', () => {
    it('When LoginWelcome is rendered, then should display welcome content', () => {
      // Arrange & Act
      render(<LoginWelcome />)
      
      // Assert
      expect(screen.getByText('Bem-vindo à KSI Consultas')).toBeInTheDocument()
      expect(screen.getByText('Sua plataforma completa para consultas e informações.')).toBeInTheDocument()
    })

    it('When LoginWelcome is rendered, then should display logo image', () => {
      // Arrange & Act
      render(<LoginWelcome />)
      
      // Assert
      expect(screen.getByRole('img', { name: 'Logo' })).toBeInTheDocument()
    })

    it('When LoginWelcome is rendered, then should display decorative dots', () => {
      // Arrange & Act
      const { container } = render(<LoginWelcome />)
      
      // Assert
      const dots = container.querySelectorAll('.w-2.h-2.rounded-full')
      expect(dots).toHaveLength(3)
    })
  })
})