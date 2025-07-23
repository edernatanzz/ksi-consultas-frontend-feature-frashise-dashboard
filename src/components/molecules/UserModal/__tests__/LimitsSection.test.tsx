import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import LimitsSection from '../LimitsSection'

describe('LimitsSection', () => {
  const defaultProps = {
    formData: {
      allowedAPIs: {
        cpf: true,
        cnpj: false,
        vehicular: true,
        score: false,
        judicial: true
      },
      workingHours: {
        start: '08:00',
        end: '18:00'
      },
      allowedIPs: ['192.168.1.1', '10.0.0.1']
    },
    isReadOnly: false,
    onInputChange: vi.fn(),
    onAddIP: vi.fn(),
    onUpdateIP: vi.fn(),
    onRemoveIP: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('When component renders', () => {
    it('then displays all form sections', () => {
      // Arrange & Act
      render(<LimitsSection {...defaultProps} />)

      // Assert
      expect(screen.getByText('APIs Permitidas')).toBeInTheDocument()
      expect(screen.getByText('Horário de Acesso Permitido')).toBeInTheDocument()
      expect(screen.getByText('IPs Autorizados')).toBeInTheDocument()
    })
  })

  describe('When user toggles API permission', () => {
    it('then calls onInputChange with updated allowedAPIs object', () => {
      // Arrange
      render(<LimitsSection {...defaultProps} />)
      const cnpjCheckbox = screen.getByLabelText('CNPJ')

      // Act
      fireEvent.click(cnpjCheckbox)

      // Assert
      expect(defaultProps.onInputChange).toHaveBeenCalledWith('allowedAPIs', {
        cpf: true,
        cnpj: true,
        vehicular: true,
        score: false,
        judicial: true
      })
    })
  })

  describe('When user changes working hours start time', () => {
    it('then calls onInputChange with updated workingHours', () => {
      // Arrange
      render(<LimitsSection {...defaultProps} />)
      const startTimeInput = screen.getByDisplayValue('08:00')

      // Act
      fireEvent.change(startTimeInput, { target: { value: '09:00' } })

      // Assert
      expect(defaultProps.onInputChange).toHaveBeenCalledWith('workingHours', {
        start: '09:00',
        end: '18:00'
      })
    })
  })

  describe('When user changes working hours end time', () => {
    it('then calls onInputChange with updated workingHours', () => {
      // Arrange
      render(<LimitsSection {...defaultProps} />)
      const endTimeInput = screen.getByDisplayValue('18:00')

      // Act
      fireEvent.change(endTimeInput, { target: { value: '17:00' } })

      // Assert
      expect(defaultProps.onInputChange).toHaveBeenCalledWith('workingHours', {
        start: '08:00',
        end: '17:00'
      })
    })
  })

  describe('When user updates IP address', () => {
    it('then calls onUpdateIP with index and new value', () => {
      // Arrange
      render(<LimitsSection {...defaultProps} />)
      const firstIPInput = screen.getByDisplayValue('192.168.1.1')

      // Act
      fireEvent.change(firstIPInput, { target: { value: '192.168.1.100' } })

      // Assert
      expect(defaultProps.onUpdateIP).toHaveBeenCalledWith(0, '192.168.1.100')
    })
  })

  describe('When user clicks add IP button', () => {
    it('then calls onAddIP', () => {
      // Arrange
      render(<LimitsSection {...defaultProps} />)
      const addButton = screen.getByText('+ Adicionar IP')

      // Act
      fireEvent.click(addButton)

      // Assert
      expect(defaultProps.onAddIP).toHaveBeenCalledTimes(1)
    })
  })

  describe('When user clicks remove IP button', () => {
    it('then calls onRemoveIP with correct index', () => {
      // Arrange
      render(<LimitsSection {...defaultProps} />)
      const removeButtons = screen.getAllByRole('button').filter(btn => 
        btn.querySelector('svg')?.classList.contains('lucide-x')
      )

      // Act
      fireEvent.click(removeButtons[0])

      // Assert
      expect(defaultProps.onRemoveIP).toHaveBeenCalledWith(0)
    })
  })

  describe('When form is readonly', () => {
    it('then disables all inputs and hides action buttons', () => {
      // Arrange & Act
      render(<LimitsSection {...defaultProps} isReadOnly={true} />)

      // Assert
      expect(screen.getByDisplayValue('192.168.1.1')).toBeDisabled()
      expect(screen.getByDisplayValue('08:00')).toBeDisabled()
      expect(screen.getByDisplayValue('18:00')).toBeDisabled()
      expect(screen.queryByText('+ Adicionar IP')).not.toBeInTheDocument()
      expect(screen.queryByRole('button', { name: /remove/i })).not.toBeInTheDocument()
    })
  })

  describe('When there is only one IP', () => {
    it('then hides remove button', () => {
      // Arrange
      const propsWithOneIP = {
        ...defaultProps,
        formData: {
          ...defaultProps.formData,
          allowedIPs: ['192.168.1.1']
        }
      }

      // Act
      render(<LimitsSection {...propsWithOneIP} />)

      // Assert
      expect(screen.queryByRole('button', { name: /remove/i })).not.toBeInTheDocument()
    })
  })

  describe('When allowedAPIs is undefined', () => {
    it('then handles gracefully without errors', () => {
      // Arrange
      const propsWithoutAPIs = {
        ...defaultProps,
        formData: {
          ...defaultProps.formData,
          allowedAPIs: undefined
        }
      }

      // Act & Assert
      expect(() => render(<LimitsSection {...propsWithoutAPIs} />)).not.toThrow()
    })
  })

  describe('When workingHours is undefined', () => {
    it('then uses default values for time inputs', () => {
      // Arrange
      const propsWithoutWorkingHours = {
        ...defaultProps,
        formData: {
          ...defaultProps.formData,
          workingHours: undefined
        }
      }

      // Act
      render(<LimitsSection {...propsWithoutWorkingHours} />)
      const timeInputs = screen.getAllByDisplayValue('')

      // Act
      fireEvent.change(timeInputs[0], { target: { value: '10:00' } })

      // Assert
      expect(defaultProps.onInputChange).toHaveBeenCalledWith('workingHours', {
        start: '10:00',
        end: '00:00'
      })
    })
  })
})