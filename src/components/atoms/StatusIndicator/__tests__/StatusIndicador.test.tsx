import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import StatusIndicator from '../StatusIndicator'

// Mock do ícone do Lucide React
vi.mock('lucide-react', () => ({
  CheckCircle: vi.fn(({ size, className }) => (
    <svg data-testid="check-circle-icon" data-size={size} className={className}>
      CheckCircle
    </svg>
  ))
}))

describe('StatusIndicator', () => {
  describe('When status is online', () => {
    it('then displays green indicator without label', () => {
      // Arrange & Act
      render(<StatusIndicator status="online" />)

      // Assert
      const container = document.querySelector('.bg-green-50.border-green-200')
      expect(container).toBeInTheDocument()
      
      const statusDot = document.querySelector('.bg-green-500')
      expect(statusDot).toBeInTheDocument()
      expect(screen.getByTestId('check-circle-icon')).toBeInTheDocument()
      expect(screen.queryByText('Sistema Operacional')).not.toBeInTheDocument()
    })

    it('then displays green indicator with label when showLabel is true', () => {
      // Arrange & Act
      render(<StatusIndicator status="online" showLabel={true} />)

      // Assert
      expect(screen.getByText('Sistema Operacional')).toBeInTheDocument()
      expect(screen.getByText('Sistema Operacional')).toHaveClass('text-green-700')
      expect(screen.getByTestId('check-circle-icon')).toBeInTheDocument()
    })
  })

  describe('When status is warning', () => {
    it('then displays yellow indicator without label', () => {
      // Arrange & Act
      render(<StatusIndicator status="warning" />)

      // Assert
      const container = document.querySelector('.bg-green-50.border-green-200')
      expect(container).toBeInTheDocument()
      
      const statusDot = document.querySelector('.bg-yellow-500')
      expect(statusDot).toBeInTheDocument()
      expect(screen.queryByTestId('check-circle-icon')).not.toBeInTheDocument()
      expect(screen.queryByText('Atenção')).not.toBeInTheDocument()
    })

    it('then displays yellow indicator with label when showLabel is true', () => {
      // Arrange & Act
      render(<StatusIndicator status="warning" showLabel={true} />)

      // Assert
      expect(screen.getByText('Atenção')).toBeInTheDocument()
      expect(screen.getByText('Atenção')).toHaveClass('text-green-700')
    })
  })

  describe('When status is offline', () => {
    it('then displays red indicator without label', () => {
      // Arrange & Act
      render(<StatusIndicator status="offline" />)

      // Assert
      const container = document.querySelector('.bg-green-50.border-green-200')
      expect(container).toBeInTheDocument()
      
      const statusDot = document.querySelector('.bg-red-500')
      expect(statusDot).toBeInTheDocument()
      expect(screen.queryByTestId('check-circle-icon')).not.toBeInTheDocument()
      expect(screen.queryByText('Crítico')).not.toBeInTheDocument()
    })

    it('then displays red indicator with label when showLabel is true', () => {
      // Arrange & Act
      render(<StatusIndicator status="offline" showLabel={true} />)

      // Assert
      expect(screen.getByText('Crítico')).toBeInTheDocument()
      expect(screen.getByText('Crítico')).toHaveClass('text-green-700')
    })
  })

  describe('When showLabel prop is provided', () => {
    it('then toggles label visibility correctly', () => {
      // Arrange & Act - Without label
      const { rerender } = render(<StatusIndicator status="online" showLabel={false} />)

      // Assert
      expect(screen.queryByText('Sistema Operacional')).not.toBeInTheDocument()

      // Act - With label
      rerender(<StatusIndicator status="online" showLabel={true} />)

      // Assert
      expect(screen.getByText('Sistema Operacional')).toBeInTheDocument()
    })
  })

  describe('When check circle icon is displayed', () => {
    it('then has correct props for online status', () => {
      // Arrange & Act
      render(<StatusIndicator status="online" />)

      // Assert
      const icon = screen.getByTestId('check-circle-icon')
      expect(icon).toHaveAttribute('data-size', '10')
      expect(icon).toHaveClass('text-white')
    })
  })
})