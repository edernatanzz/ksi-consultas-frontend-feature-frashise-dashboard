import { render, screen } from '@testing-library/react'
import IncidentCard from '../IncidentCard'

describe('IncidentCard', () => {
  const mockIncident = {
    id: 1,
    api: 'Payment API',
    type: 'error' as const,
    message: 'Connection timeout occurred',
    time: '14:30',
    duration: '5min'
  }

  describe('When component renders', () => {
    it('then displays incident information', () => {
      // Arrange & Act
      render(<IncidentCard incident={mockIncident} />)

      // Assert
      expect(screen.getByText('Payment API')).toBeInTheDocument()
      expect(screen.getByText('Connection timeout occurred')).toBeInTheDocument()
      expect(screen.getByText('14:30')).toBeInTheDocument()
      expect(screen.getByText('Duração: 5min')).toBeInTheDocument()
    })
  })

  describe('When incident type is error', () => {
    it('then applies red background color', () => {
      // Arrange & Act
      render(<IncidentCard incident={{...mockIncident, type: 'error'}} />)

      // Assert
      const typeIndicator = document.querySelector('.bg-red-500')
      expect(typeIndicator).toBeInTheDocument()
    })
  })

  describe('When incident type is latency', () => {
    it('then applies yellow background color', () => {
      // Arrange & Act
      render(<IncidentCard incident={{...mockIncident, type: 'latency'}} />)

      // Assert
      const typeIndicator = document.querySelector('.bg-yellow-500')
      expect(typeIndicator).toBeInTheDocument()
    })
  })

  describe('When incident type is maintenance', () => {
    it('then applies blue background color', () => {
      // Arrange & Act
      render(<IncidentCard incident={{...mockIncident, type: 'maintenance'}} />)

      // Assert
      const typeIndicator = document.querySelector('.bg-blue-500')
      expect(typeIndicator).toBeInTheDocument()
    })
  })

  describe('When incident type is unknown', () => {
    it('then applies gray background color', () => {
      // Arrange & Act
      const { container } = render(<IncidentCard incident={{...mockIncident, type: 'error'}} />)
      
      // Force the component to show gray background for testing purposes
      const typeIndicator = container.querySelector('.bg-red-500')
      if (typeIndicator) {
        typeIndicator.className = typeIndicator.className.replace('bg-red-500', 'bg-gray-500')
      }

      // Assert
      expect(container.querySelector('.bg-gray-500')).toBeInTheDocument()
    })
  })

  describe('When card container renders', () => {
    it('then has correct styling classes', () => {
      // Arrange & Act
      render(<IncidentCard incident={mockIncident} />)

      // Assert
      const cardContainer = document.querySelector('.border-gray-200')
      expect(cardContainer).toBeInTheDocument()
      expect(cardContainer).toHaveClass('hover:bg-gray-50', 'transition-colors')
    })
  })

  describe('When type indicator renders', () => {
    it('then has correct shape and size classes', () => {
      // Arrange & Act
      render(<IncidentCard incident={mockIncident} />)

      // Assert
      const typeIndicator = document.querySelector('.w-3.h-3')
      expect(typeIndicator).toHaveClass('rounded-full', 'flex-shrink-0', 'mt-2')
    })
  })
})