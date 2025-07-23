import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import IncidentsTimelinePanel from '../IncidentsTimelinePanel'
import { IncidentItem } from '../../../../../types/incident'

// Mock do console.log
const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

describe('IncidentsTimelinePanel', () => {
  const mockIncidents: IncidentItem[] = [
    {
      id: 1,
      api: 'Payment API',
      type: 'latency',
      message: 'Alta latência detectada',
      time: '14:30',
      duration: '5min'
    },
    {
      id: 2,
      api: 'User API',
      type: 'error',
      message: 'Erro de conexão',
      time: '13:15',
      duration: '2min'
    },
    {
      id: 3,
      api: 'Auth API',
      type: 'maintenance',
      message: 'Manutenção programada',
      time: '12:00',
      duration: '30min'
    }
  ]

  beforeEach(() => {
    consoleSpy.mockClear()
  })

  afterAll(() => {
    consoleSpy.mockRestore()
  })

  describe('When component renders', () => {
    it('then displays title and subtitle', () => {
      // Arrange & Act
      render(<IncidentsTimelinePanel incidents={mockIncidents} />)

      // Assert
      expect(screen.getByText('Histórico de Incidentes')).toBeInTheDocument()
      expect(screen.getByText('Últimas 24h')).toBeInTheDocument()
    })

    it('then displays all incident cards', () => {
      // Arrange & Act
      render(<IncidentsTimelinePanel incidents={mockIncidents} />)

      // Assert - Testa pelos textos visíveis dos incidentes
      expect(screen.getByText('Payment API')).toBeInTheDocument()
      expect(screen.getByText('User API')).toBeInTheDocument()
      expect(screen.getByText('Auth API')).toBeInTheDocument()
      expect(screen.getByText('Alta latência detectada')).toBeInTheDocument()
      expect(screen.getByText('Erro de conexão')).toBeInTheDocument()
      expect(screen.getByText('Manutenção programada')).toBeInTheDocument()
    })

    it('then displays the view full history button', () => {
      // Arrange & Act
      render(<IncidentsTimelinePanel incidents={mockIncidents} />)

      // Assert
      expect(screen.getByText('Ver Histórico Completo →')).toBeInTheDocument()
    })
  })

  describe('When incidents array is empty', () => {
    it('then renders without incident cards', () => {
      // Arrange & Act
      render(<IncidentsTimelinePanel incidents={[]} />)

      // Assert
      expect(screen.getByText('Histórico de Incidentes')).toBeInTheDocument()
      expect(screen.queryByText('Payment API')).not.toBeInTheDocument()
      expect(screen.queryByText('User API')).not.toBeInTheDocument()
    })
  })

  describe('When view full history button is clicked', () => {
    it('then calls console.log with correct message', () => {
      // Arrange
      render(<IncidentsTimelinePanel incidents={mockIncidents} />)

      // Act
      fireEvent.click(screen.getByText('Ver Histórico Completo →'))

      // Assert
      expect(consoleSpy).toHaveBeenCalledWith('Ver Histórico Completo')
    })
  })

  describe('When single incident is provided', () => {
    it('then renders only that incident', () => {
      // Arrange
      const singleIncident = [mockIncidents[0]]

      // Act
      render(<IncidentsTimelinePanel incidents={singleIncident} />)

      // Assert
      expect(screen.getByText('Payment API')).toBeInTheDocument()
      expect(screen.queryByText('User API')).not.toBeInTheDocument()
      expect(screen.queryByText('Auth API')).not.toBeInTheDocument()
    })
  })

  describe('When incidents with different types are provided', () => {
    it('then renders all incident messages correctly', () => {
      // Arrange & Act
      render(<IncidentsTimelinePanel incidents={mockIncidents} />)

      // Assert - Testa pelas mensagens que indicam os tipos
      expect(screen.getByText('Alta latência detectada')).toBeInTheDocument() // latency
      expect(screen.getByText('Erro de conexão')).toBeInTheDocument() // error
      expect(screen.getByText('Manutenção programada')).toBeInTheDocument() // maintenance
    })
  })
})