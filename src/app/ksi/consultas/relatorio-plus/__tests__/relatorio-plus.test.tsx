import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RelatorioPlusPage from '../page'

describe('RelatorioPlusPage', () => {
  describe('When rendering the consult page', () => {
    it('then should show the consult form by default', () => {
      // Arrange
      render(<RelatorioPlusPage />)
      
      // Assert
      expect(screen.getByTestId('consulta-page')).toBeInTheDocument()
      expect(screen.getByTestId('form-consulta')).toBeInTheDocument()
      expect(screen.getByTestId('page-header')).toBeInTheDocument()
      expect(screen.getByTestId('page-title')).toBeInTheDocument()
      expect(screen.getByText('Relatório Plus')).toBeInTheDocument()
      expect(screen.getByText('Formulário de Consulta')).toBeInTheDocument()
    })

    it('then should show CPF input field', () => {
      // Arrange
      render(<RelatorioPlusPage />)
      
      // Assert
      expect(screen.getByTestId('form-consulta-input')).toBeInTheDocument()
      expect(screen.getByTestId('submit-button')).toBeInTheDocument()
    })
  })

  describe('When submitting a valid CPF', () => {
    it('then should show loading and then results page', async () => {
      // Arrange
      render(<RelatorioPlusPage />)
      const cpfInput = screen.getByTestId('form-consulta-input')
      const submitButton = screen.getByTestId('submit-button')
      
      // Act - Enter valid CPF and submit
      await userEvent.type(cpfInput, '52998224725')
      fireEvent.click(submitButton)
      
      // Assert - Loading should appear
      expect(screen.getByTestId('loading')).toBeInTheDocument()
      
      // Wait for results to load - using the actual data-testid from DOM
      await waitFor(() => {
        expect(screen.getByTestId('nova-consulta-button')).toBeInTheDocument()
      }, { timeout: 2000 })
      
      // Results page elements should be present
      expect(screen.getByText('Imprimir')).toBeInTheDocument()
      expect(screen.getByText('Nova Consulta')).toBeInTheDocument()
      expect(screen.getByText('Desde 2011 trabalhamos para você crescer')).toBeInTheDocument()
    })
  })

  describe('When clicking new consult from results page', () => {
    it('then should return to consult page', async () => {
      // Arrange
      render(<RelatorioPlusPage />)
      const cpfInput = screen.getByTestId('form-consulta-input')
      const submitButton = screen.getByTestId('submit-button')
      
      // Act - Go to results page first
      await userEvent.type(cpfInput, '52998224725')
      fireEvent.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByTestId('nova-consulta-button')).toBeInTheDocument()
      }, { timeout: 2000 })
      
      // Click new consult button
      const novaConsultaButton = screen.getByTestId('nova-consulta-button')
      fireEvent.click(novaConsultaButton)
      
      // Assert - Should return to consult page
      expect(screen.getByTestId('consulta-page')).toBeInTheDocument()
      expect(screen.getByTestId('form-consulta')).toBeInTheDocument()
    })
  })

  describe('When typing in CPF input', () => {
    it('then should format the input with mask', async () => {
      // Arrange
      render(<RelatorioPlusPage />)
      const cpfInput = screen.getByTestId('form-consulta-input')
      
      // Act - Type CPF
      await userEvent.type(cpfInput, '52998224725')
      
      // Assert - Should format with mask
      expect(cpfInput).toHaveValue('529.982.247-25')
    })

    it('then should format partial CPF input correctly', async () => {
      // Arrange
      render(<RelatorioPlusPage />)
      const cpfInput = screen.getByTestId('form-consulta-input')
      
      // Act - Type partial CPF
      await userEvent.type(cpfInput, '529982')
      
      // Assert - Should format partial input
      expect(cpfInput).toHaveValue('529.982')
    })

    it('then should handle clearing the input', async () => {
      // Arrange
      render(<RelatorioPlusPage />)
      const cpfInput = screen.getByTestId('form-consulta-input')
      
      // Act - Type and then clear
      await userEvent.type(cpfInput, '52998224725')
      await userEvent.clear(cpfInput)
      
      // Assert - Input should be empty
      expect(cpfInput).toHaveValue('')
    })

    it('then should handle different formatting stages', async () => {
      // Arrange
      render(<RelatorioPlusPage />)
      const cpfInput = screen.getByTestId('form-consulta-input')
      
      // Act & Assert - Test different formatting stages
      await userEvent.type(cpfInput, '5')
      expect(cpfInput).toHaveValue('5')
      
      await userEvent.type(cpfInput, '29')
      expect(cpfInput).toHaveValue('529')
      
      await userEvent.type(cpfInput, '98')
      expect(cpfInput).toHaveValue('529.98')
      
      await userEvent.type(cpfInput, '2247')
      expect(cpfInput).toHaveValue('529.982.247')
      
      await userEvent.type(cpfInput, '25')
      expect(cpfInput).toHaveValue('529.982.247-25')
    })
  })

  describe('When form is in loading state', () => {
    it('then should disable submit button', async () => {
      // Arrange
      render(<RelatorioPlusPage />)
      const cpfInput = screen.getByTestId('form-consulta-input')
      const submitButton = screen.getByTestId('submit-button')
      
      // Act - Submit form
      await userEvent.type(cpfInput, '52998224725')
      fireEvent.click(submitButton)
      
      // Assert - Submit button should be disabled during loading
      expect(submitButton).toBeDisabled()
    })
  })

  describe('When submitting form with invalid CPF', () => {
    it('then should handle empty CPF submission', async () => {
      // Arrange
      render(<RelatorioPlusPage />)
      const submitButton = screen.getByTestId('submit-button')
      
      // Act - Submit without entering CPF
      fireEvent.click(submitButton)
      
      // Assert - Should not proceed to loading state
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    })

    it('then should handle incomplete CPF submission', async () => {
      // Arrange
      render(<RelatorioPlusPage />)
      const cpfInput = screen.getByTestId('form-consulta-input')
      const submitButton = screen.getByTestId('submit-button')
      
      // Act - Submit with incomplete CPF
      await userEvent.type(cpfInput, '529982')
      fireEvent.click(submitButton)
      
      // Assert - Should not proceed to loading state
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    })

    it('then should handle CPF with only numbers', async () => {
      // Arrange
      render(<RelatorioPlusPage />)
      const cpfInput = screen.getByTestId('form-consulta-input')
      
      // Act - Type only numbers
      await userEvent.type(cpfInput, '123456789')
      
      // Assert - Should format correctly
      expect(cpfInput).toHaveValue('123.456.789')
    })
  })

  describe('When interacting with results page', () => {
    beforeEach(async () => {
      render(<RelatorioPlusPage />)
      const cpfInput = screen.getByTestId('form-consulta-input')
      const submitButton = screen.getByTestId('submit-button')
      
      await userEvent.type(cpfInput, '52998224725')
      fireEvent.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByTestId('nova-consulta-button')).toBeInTheDocument()
      }, { timeout: 2000 })
    })

    it('then should handle print button click', () => {
      // Arrange - Results page is already rendered
      const printButton = screen.getByText('Imprimir')
      
      // Act - Click print button
      fireEvent.click(printButton)
      
      // Assert - Print button should be clickable
      expect(printButton).toBeInTheDocument()
    })

    it('then should display all results page elements', () => {
      // Assert - All results page elements should be present
      expect(screen.getByText('Imprimir')).toBeInTheDocument()
      expect(screen.getByText('Nova Consulta')).toBeInTheDocument()
      expect(screen.getByText('Desde 2011 trabalhamos para você crescer')).toBeInTheDocument()
      expect(screen.getByTestId('nova-consulta-button')).toBeInTheDocument()
    })
  })

  describe('When handling form state transitions', () => {
    it('then should reset form after successful submission', async () => {
      // Arrange
      render(<RelatorioPlusPage />)
      const cpfInput = screen.getByTestId('form-consulta-input')
      const submitButton = screen.getByTestId('submit-button')
      
      // Act - Submit form and return to consult page
      await userEvent.type(cpfInput, '52998224725')
      fireEvent.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByTestId('nova-consulta-button')).toBeInTheDocument()
      }, { timeout: 2000 })
      
      const novaConsultaButton = screen.getByTestId('nova-consulta-button')
      fireEvent.click(novaConsultaButton)
      
      // Assert - Form should be reset
      const newCpfInput = screen.getByTestId('form-consulta-input')
      expect(newCpfInput).toHaveValue('')
    })
  })

  describe('When handling person type selection', () => {
    it('then should show person type selector', () => {
      // Arrange
      render(<RelatorioPlusPage />)
      
      // Assert
      expect(screen.getByTestId('person-type-selector')).toBeInTheDocument()
      expect(screen.getByText('Tipo de pessoa')).toBeInTheDocument()
    })

    it('then should have physical person selected by default', () => {
      // Arrange
      render(<RelatorioPlusPage />)
      
      // Assert
      const physicalPersonRadio = screen.getByRole('radio', { name: 'Física' })
      expect(physicalPersonRadio).toBeChecked()
    })

    it('then should allow selecting legal person', async () => {
      // Arrange
      render(<RelatorioPlusPage />)
      
      // Act
      const legalPersonRadio = screen.getByRole('radio', { name: 'Jurídica' })
      await userEvent.click(legalPersonRadio)
      
      // Assert
      expect(legalPersonRadio).toBeChecked()
    })

    it('then should switch between person types', async () => {
      // Arrange
      render(<RelatorioPlusPage />)
      const physicalPersonRadio = screen.getByRole('radio', { name: 'Física' })
      const legalPersonRadio = screen.getByRole('radio', { name: 'Jurídica' })
      
      // Act - Switch to legal person
      await userEvent.click(legalPersonRadio)
      
      // Assert - Legal person should be checked
      expect(legalPersonRadio).toBeChecked()
      expect(physicalPersonRadio).not.toBeChecked()
      
      // Act - Switch back to physical person
      await userEvent.click(physicalPersonRadio)
      
      // Assert - Physical person should be checked
      expect(physicalPersonRadio).toBeChecked()
      expect(legalPersonRadio).not.toBeChecked()
    })
  })

  describe('When handling checkbox interactions', () => {
    it('then should show new consultation checkbox', () => {
      // Arrange
      render(<RelatorioPlusPage />)
      
      // Assert
      const checkbox = screen.getByRole('checkbox', { name: 'Caso a consulta já tenha sido realizada, deseja consultar novamente?' })
      expect(checkbox).toBeInTheDocument()
      expect(checkbox).not.toBeChecked()
    })

    it('then should allow checking new consultation checkbox', async () => {
      // Arrange
      render(<RelatorioPlusPage />)
      const checkbox = screen.getByRole('checkbox', { name: 'Caso a consulta já tenha sido realizada, deseja consultar novamente?' })
      
      // Act
      await userEvent.click(checkbox)
      
      // Assert
      expect(checkbox).toBeChecked()
    })

    it('then should allow unchecking new consultation checkbox', async () => {
      // Arrange
      render(<RelatorioPlusPage />)
      const checkbox = screen.getByRole('checkbox', { name: 'Caso a consulta já tenha sido realizada, deseja consultar novamente?' })
      
      // Act - Check and then uncheck
      await userEvent.click(checkbox)
      await userEvent.click(checkbox)
      
      // Assert
      expect(checkbox).not.toBeChecked()
    })
  })

  describe('When handling form submission states', () => {
    it('then should have disabled submit button initially', () => {
      // Arrange
      render(<RelatorioPlusPage />)
      const submitButton = screen.getByTestId('submit-button')
      
      // Assert
      expect(submitButton).toBeDisabled()
    })

    it('then should enable submit button with valid CPF', async () => {
      // Arrange
      render(<RelatorioPlusPage />)
      const cpfInput = screen.getByTestId('form-consulta-input')
      const submitButton = screen.getByTestId('submit-button')
      
      // Act
      await userEvent.type(cpfInput, '52998224725')
      
      // Assert
      expect(submitButton).toBeEnabled()
    })

    it('then should disable submit button with incomplete CPF', async () => {
      // Arrange
      render(<RelatorioPlusPage />)
      const cpfInput = screen.getByTestId('form-consulta-input')
      const submitButton = screen.getByTestId('submit-button')
      
      // Act
      await userEvent.type(cpfInput, '52998')
      
      // Assert
      expect(submitButton).toBeDisabled()
    })
  })

  describe('When handling different input lengths', () => {
    it('then should handle single digit input', async () => {
      // Arrange
      render(<RelatorioPlusPage />)
      const cpfInput = screen.getByTestId('form-consulta-input')
      
      // Act
      await userEvent.type(cpfInput, '5')
      
      // Assert
      expect(cpfInput).toHaveValue('5')
    })

    it('then should handle two digit input', async () => {
      // Arrange
      render(<RelatorioPlusPage />)
      const cpfInput = screen.getByTestId('form-consulta-input')
      
      // Act
      await userEvent.type(cpfInput, '52')
      
      // Assert
      expect(cpfInput).toHaveValue('52')
    })

    it('then should handle three digit input', async () => {
      // Arrange
      render(<RelatorioPlusPage />)
      const cpfInput = screen.getByTestId('form-consulta-input')
      
      // Act
      await userEvent.type(cpfInput, '529')
      
      // Assert
      expect(cpfInput).toHaveValue('529')
    })

    it('then should handle four digit input with first dot', async () => {
      // Arrange
      render(<RelatorioPlusPage />)
      const cpfInput = screen.getByTestId('form-consulta-input')
      
      // Act
      await userEvent.type(cpfInput, '5299')
      
      // Assert
      expect(cpfInput).toHaveValue('529.9')
    })

    it('then should handle seven digit input with second dot', async () => {
      // Arrange
      render(<RelatorioPlusPage />)
      const cpfInput = screen.getByTestId('form-consulta-input')
      
      // Act
      await userEvent.type(cpfInput, '5299822')
      
      // Assert
      expect(cpfInput).toHaveValue('529.982.2')
    })
  })
})


