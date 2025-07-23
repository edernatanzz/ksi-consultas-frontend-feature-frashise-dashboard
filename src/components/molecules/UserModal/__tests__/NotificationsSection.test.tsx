import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import NotificationsSection from '../NotificationsSection'

describe('NotificationsSection', () => {
  const defaultProps = {
    formData: {
      notifications: {
        quotaReached: true,
        apiDown: false,
        newReport: false,
        systemUpdates: false
      },
      notificationMethod: 'email' as const
    },
    isReadOnly: false,
    onInputChange: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('When component renders', () => {
    it('then displays notification sections', () => {
      // Arrange & Act
      render(<NotificationsSection {...defaultProps} />)

      // Assert
      expect(screen.getByText('Tipos de Notificação')).toBeInTheDocument()
      expect(screen.getByText('Método de Envio')).toBeInTheDocument()
      expect(screen.getByText('Email')).toBeInTheDocument()
      expect(screen.getByText('SMS')).toBeInTheDocument()
    })
  })

  describe('When user toggles notification', () => {
    it('then calls onInputChange', () => {
      // Arrange
      render(<NotificationsSection {...defaultProps} />)
      const checkbox = screen.getByLabelText('API fora do ar')

      // Act
      fireEvent.click(checkbox)

      // Assert
      expect(defaultProps.onInputChange).toHaveBeenCalledWith('notifications', expect.objectContaining({
        apiDown: true
      }))
    })
  })

  describe('When user selects SMS method', () => {
    it('then calls onInputChange with sms', () => {
      // Arrange
      render(<NotificationsSection {...defaultProps} />)
      const smsRadio = screen.getByLabelText('SMS')

      // Act
      fireEvent.click(smsRadio)

      // Assert
      expect(defaultProps.onInputChange).toHaveBeenCalledWith('notificationMethod', 'sms')
    })
  })
})