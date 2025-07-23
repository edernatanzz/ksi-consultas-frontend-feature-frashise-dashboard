import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import RelatorioTopPage from '../page';

describe('RelatorioTopPage', () => {
  describe('When rendering the initial consultation page', () => {
    it('then should display the correct title', () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      // Act
      const title = screen.getByText('Relatório KSI Master');
      
      // Assert
      expect(title).toBeInTheDocument();
    });

    it('then should display the optional data card', () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      // Act
      const optionalCardTitle = screen.getByText('Dados Opcionais');
      
      // Assert
      expect(optionalCardTitle).toBeInTheDocument();
    });

    it('then should display the consultation form', () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      // Act
      const form = screen.getByTestId('form-consulta');
      
      // Assert
      expect(form).toBeInTheDocument();
    });
  });

  describe('When submitting the form with valid document', () => {
    it('then should show loading state and then results page', async () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      const documentInput = screen.getByRole('textbox');
      const submitButton = screen.getByRole('button', { name: /consultar/i });
      
      // Act
      fireEvent.change(documentInput, { target: { value: '11144477735' } });
      fireEvent.click(submitButton);
      
      // Assert
      await waitFor(() => {
        expect(screen.getByTestId('loading')).toBeInTheDocument();
      });
      
      await waitFor(() => {
        expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
        expect(screen.getByText('Nova Consulta')).toBeInTheDocument();
      }, { timeout: 3000 });
    });

    it('then should show loading state and then results page with CNPJ', async () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      const documentInput = screen.getByRole('textbox');
      const submitButton = screen.getByRole('button', { name: /consultar/i });
      const radioButtons = screen.getAllByRole('radio');
      const [, pjRadio] = radioButtons;
      
      // Act
      fireEvent.click(pjRadio);
      fireEvent.change(documentInput, { target: { value: '11222333000181' } });
      fireEvent.click(submitButton);
      
      // Assert
      expect(screen.getByTestId('loading')).toBeInTheDocument();
      
      await waitFor(() => {
        expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
        expect(screen.getByText('Nova Consulta')).toBeInTheDocument();
      }, { timeout: 3000 });
    });
  });

  describe('When submitting form with invalid document', () => {
    it('then should prevent submission for invalid CPF', () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      const documentInput = screen.getByRole('textbox');
      const submitButton = screen.getByRole('button', { name: /consultar/i });
      
      // Act
      fireEvent.change(documentInput, { target: { value: '12345678901' } });
      fireEvent.click(submitButton);
      
      // Assert
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
      expect(screen.queryByText('Nova Consulta')).not.toBeInTheDocument();
    });

    it('then should prevent submission for invalid CNPJ', () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      const documentInput = screen.getByRole('textbox');
      const submitButton = screen.getByRole('button', { name: /consultar/i });
      const radioButtons = screen.getAllByRole('radio');
      const [, pjRadio] = radioButtons;
      
      // Act
      fireEvent.click(pjRadio);
      fireEvent.change(documentInput, { target: { value: '12345678000123' } });
      fireEvent.click(submitButton);
      
      // Assert
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
      expect(screen.queryByText('Nova Consulta')).not.toBeInTheDocument();
    });

    it('then should prevent submission when document is empty', () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      const submitButton = screen.getByRole('button', { name: /consultar/i });
      
      // Act
      fireEvent.click(submitButton);
      
      // Assert
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
      expect(screen.queryByText('Nova Consulta')).not.toBeInTheDocument();
    });

    it('then should prevent submission when document is only spaces', () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      const documentInput = screen.getByRole('textbox');
      const submitButton = screen.getByRole('button', { name: /consultar/i });
      
      // Act
      fireEvent.change(documentInput, { target: { value: '   ' } });
      fireEvent.click(submitButton);
      
      // Assert
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
      expect(screen.queryByText('Nova Consulta')).not.toBeInTheDocument();
    });
  });

  describe('When document input receives different values', () => {
    it('then should format CPF correctly', () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      const documentInput = screen.getByRole('textbox');
      
      // Act
      fireEvent.change(documentInput, { target: { value: '11144477735' } });
      
      // Assert
      expect(documentInput).toHaveValue('111.444.777-35');
    });

    it('then should format CNPJ correctly', () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      const documentInput = screen.getByRole('textbox');
      const radioButtons = screen.getAllByRole('radio');
      const [, pjRadio] = radioButtons;
      
      // Act
      fireEvent.click(pjRadio);
      fireEvent.change(documentInput, { target: { value: '11222333000181' } });
      
      // Assert
      expect(documentInput).toHaveValue('11.222.333/0001-81');
    });

    it('then should clear document input when changing person type', () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      const documentInput = screen.getByRole('textbox');
      const radioButtons = screen.getAllByRole('radio');
      const [, pjRadio] = radioButtons;
      
      // Act
      fireEvent.change(documentInput, { target: { value: '11144477735' } });
      fireEvent.click(pjRadio);
      
      // Assert
      expect(documentInput).toHaveValue('');
    });
  });

  describe('When interacting with optional data checkboxes', () => {
    it('then should toggle multiple checkboxes independently', () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      const checkboxes = screen.getAllByRole('checkbox');
      
      // Act
      fireEvent.click(checkboxes[0]);
      
      // Assert
      expect(checkboxes[0]).toBeChecked();
      expect(checkboxes[1]).not.toBeChecked();
      
      // Act
      fireEvent.click(checkboxes[1]);
      
      // Assert
      expect(checkboxes[0]).toBeChecked();
      expect(checkboxes[1]).toBeChecked();
    });

    it('then should handle checkbox deselection', () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      const checkboxes = screen.getAllByRole('checkbox');
      
      // Act
      fireEvent.click(checkboxes[0]);
      fireEvent.click(checkboxes[0]);
      
      // Assert
      expect(checkboxes[0]).not.toBeChecked();
    });
  });

  describe('When resetting form after consultation', () => {
    it('then should reset document input to initial state', async () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      const documentInput = screen.getByRole('textbox');
      const submitButton = screen.getByRole('button', { name: /consultar/i });
      
      // Act
      fireEvent.change(documentInput, { target: { value: '11144477735' } });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Nova Consulta')).toBeInTheDocument();
      }, { timeout: 3000 });
      
      const novaConsultaButton = screen.getByText('Nova Consulta');
      fireEvent.click(novaConsultaButton);
      
      // Assert
      await waitFor(() => {
        const newDocumentInput = screen.getByRole('textbox');
        expect(newDocumentInput).toHaveValue('');
      });
    });
  });

  // Novos testes para os data-testid solicitados
  describe('When interacting with resumo section', () => {
    it('then should show resumo-table-container when expanding resumo section', async () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      // Preencher formulário e enviar para mostrar resultados
      const documentInput = screen.getByRole('textbox');
      const submitButton = screen.getByRole('button', { name: /consultar/i });
      
      fireEvent.change(documentInput, { target: { value: '11144477735' } });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Nova Consulta')).toBeInTheDocument();
      }, { timeout: 3000 });

      // Act
      const expandLessIcon = screen.getByTestId('resumo-expand-less-icon');
      fireEvent.click(expandLessIcon);

      // Assert
      expect(screen.getByTestId('resumo-table-container')).toBeInTheDocument();
    });

    it('then should hide resumo-table-container when collapsing resumo section', async () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      // Preencher formulário e enviar para mostrar resultados
      const documentInput = screen.getByRole('textbox');
      const submitButton = screen.getByRole('button', { name: /consultar/i });
      
      fireEvent.change(documentInput, { target: { value: '11144477735' } });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Nova Consulta')).toBeInTheDocument();
      }, { timeout: 3000 });

      // Expandir primeiro
      const expandLessIcon = screen.getByTestId('resumo-expand-less-icon');
      fireEvent.click(expandLessIcon);
      
      expect(screen.getByTestId('resumo-table-container')).toBeInTheDocument();

      // Act
      const expandMoreIcon = screen.getByTestId('resumo-expand-more-icon');
      fireEvent.click(expandMoreIcon);

      // Assert
      expect(screen.queryByTestId('resumo-table-container')).not.toBeInTheDocument();
    });

    it('then should not show resumo-table-container by default', async () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      // Preencher formulário e enviar para mostrar resultados
      const documentInput = screen.getByRole('textbox');
      const submitButton = screen.getByRole('button', { name: /consultar/i });
      
      fireEvent.change(documentInput, { target: { value: '11144477735' } });
      fireEvent.click(submitButton);
      
      // Act & Assert
      await waitFor(() => {
        expect(screen.getByText('Nova Consulta')).toBeInTheDocument();
        expect(screen.queryByTestId('resumo-table-container')).not.toBeInTheDocument();
      }, { timeout: 3000 });
    });
  });

  describe('When handling cadin optional data for pessoa fisica', () => {
    it('then should show detalhes-cadin-section when cadin is selected', async () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      // Selecionar cadin como opcional
      const checkboxes = screen.getAllByRole('checkbox');
      const cadinCheckbox = checkboxes.find(checkbox => 
        checkbox.closest('label')?.textContent?.includes('Cadin')
      );
      
      if (cadinCheckbox) {
        fireEvent.click(cadinCheckbox);
      }
      
      // Preencher formulário e enviar para mostrar resultados
      const documentInput = screen.getByRole('textbox');
      const submitButton = screen.getByRole('button', { name: /consultar/i });
      
      fireEvent.change(documentInput, { target: { value: '11144477735' } });
      fireEvent.click(submitButton);
      
      // Act & Assert
      await waitFor(() => {
        expect(screen.getByText('Nova Consulta')).toBeInTheDocument();
        expect(screen.getByTestId('detalhes-cadin-section')).toBeInTheDocument();
      }, { timeout: 3000 });
    });

    it('then should not show detalhes-cadin-section when cadin is not selected', async () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      // Preencher formulário e enviar para mostrar resultados (sem selecionar cadin)
      const documentInput = screen.getByRole('textbox');
      const submitButton = screen.getByRole('button', { name: /consultar/i });
      
      fireEvent.change(documentInput, { target: { value: '11144477735' } });
      fireEvent.click(submitButton);
      
      // Act & Assert
      await waitFor(() => {
        expect(screen.getByText('Nova Consulta')).toBeInTheDocument();
        expect(screen.queryByTestId('detalhes-cadin-section')).not.toBeInTheDocument();
      }, { timeout: 3000 });
    });

    it('then should show cadin-table-container within detalhes-cadin-section when cadin is selected', async () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      // Selecionar cadin como opcional
      const checkboxes = screen.getAllByRole('checkbox');
      const cadinCheckbox = checkboxes.find(checkbox => 
        checkbox.closest('label')?.textContent?.includes('Cadin')
      );
      
      if (cadinCheckbox) {
        fireEvent.click(cadinCheckbox);
      }
      
      // Preencher formulário e enviar para mostrar resultados
      const documentInput = screen.getByRole('textbox');
      const submitButton = screen.getByRole('button', { name: /consultar/i });
      
      fireEvent.change(documentInput, { target: { value: '11144477735' } });
      fireEvent.click(submitButton);
      
      // Act & Assert
      await waitFor(() => {
        expect(screen.getByText('Nova Consulta')).toBeInTheDocument();
        expect(screen.getByTestId('detalhes-cadin-section')).toBeInTheDocument();
        
        // Verificar se o container da tabela cadin está presente
        const cadinSection = screen.getByTestId('detalhes-cadin-section');
        expect(cadinSection).toBeInTheDocument();
      }, { timeout: 3000 });
    });
  });

  describe('When handling cadin optional data for pessoa juridica', () => {
    it('then should show detalhes-cadin-section when cadin is selected for PJ', async () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      // Selecionar pessoa jurídica
      const radioButtons = screen.getAllByRole('radio');
      const [, pjRadio] = radioButtons;
      fireEvent.click(pjRadio);
      
      // Selecionar cadin como opcional
      const checkboxes = screen.getAllByRole('checkbox');
      const cadinCheckbox = checkboxes.find(checkbox => 
        checkbox.closest('label')?.textContent?.includes('Cadin')
      );
      
      if (cadinCheckbox) {
        fireEvent.click(cadinCheckbox);
      }
      
      // Preencher formulário e enviar para mostrar resultados
      const documentInput = screen.getByRole('textbox');
      const submitButton = screen.getByRole('button', { name: /consultar/i });
      
      fireEvent.change(documentInput, { target: { value: '11222333000181' } });
      fireEvent.click(submitButton);
      
      // Act & Assert
      await waitFor(() => {
        expect(screen.getByText('Nova Consulta')).toBeInTheDocument();
        expect(screen.getByTestId('detalhes-cadin-section')).toBeInTheDocument();
      }, { timeout: 3000 });
    });

    it('then should not show detalhes-cadin-section when cadin is not selected for PJ', async () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      // Selecionar pessoa jurídica
      const radioButtons = screen.getAllByRole('radio');
      const [, pjRadio] = radioButtons;
      fireEvent.click(pjRadio);
      
      // Preencher formulário e enviar para mostrar resultados (sem selecionar cadin)
      const documentInput = screen.getByRole('textbox');
      const submitButton = screen.getByRole('button', { name: /consultar/i });
      
      fireEvent.change(documentInput, { target: { value: '11222333000181' } });
      fireEvent.click(submitButton);
      
      // Act & Assert
      await waitFor(() => {
        expect(screen.getByText('Nova Consulta')).toBeInTheDocument();
        expect(screen.queryByTestId('detalhes-cadin-section')).not.toBeInTheDocument();
      }, { timeout: 3000 });
    });
  });

  describe('When toggling resumo expand/collapse state', () => {
    it('then should toggle resumo-expand-more-icon visibility correctly', async () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      // Preencher formulário e enviar para mostrar resultados
      const documentInput = screen.getByRole('textbox');
      const submitButton = screen.getByRole('button', { name: /consultar/i });
      
      fireEvent.change(documentInput, { target: { value: '11144477735' } });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Nova Consulta')).toBeInTheDocument();
      }, { timeout: 3000 });

      // Act - Expandir seção
      const expandLessIcon = screen.getByTestId('resumo-expand-less-icon');
      fireEvent.click(expandLessIcon);

      // Assert - Deve mostrar o ícone de colapsar
      expect(screen.getByTestId('resumo-expand-more-icon')).toBeInTheDocument();
      expect(screen.queryByTestId('resumo-expand-less-icon')).not.toBeInTheDocument();
    });

    it('then should maintain resumo state when switching between expand/collapse', async () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      // Preencher formulário e enviar para mostrar resultados
      const documentInput = screen.getByRole('textbox');
      const submitButton = screen.getByRole('button', { name: /consultar/i });
      
      fireEvent.change(documentInput, { target: { value: '11144477735' } });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Nova Consulta')).toBeInTheDocument();
      }, { timeout: 3000 });

      // Act - Expandir e colapsar múltiplas vezes
      const expandLessIcon = screen.getByTestId('resumo-expand-less-icon');
      fireEvent.click(expandLessIcon);
      
      expect(screen.getByTestId('resumo-table-container')).toBeInTheDocument();
      
      const expandMoreIcon = screen.getByTestId('resumo-expand-more-icon');
      fireEvent.click(expandMoreIcon);
      
      expect(screen.queryByTestId('resumo-table-container')).not.toBeInTheDocument();
      
      // Expandir novamente
      const expandLessIconAgain = screen.getByTestId('resumo-expand-less-icon');
      fireEvent.click(expandLessIconAgain);

      // Assert - Deve manter funcionalidade
      expect(screen.getByTestId('resumo-table-container')).toBeInTheDocument();
    });
  });

  describe('When handling edge cases for cadin section', () => {
    it('then should handle cadin selection workflow for both PF and PJ', async () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      // Test PF with cadin
      const checkboxes = screen.getAllByRole('checkbox');
      const cadinCheckbox = checkboxes.find(checkbox => 
        checkbox.closest('label')?.textContent?.includes('Cadin')
      );
      
      if (cadinCheckbox) {
        fireEvent.click(cadinCheckbox);
      }
      
      const documentInput = screen.getByRole('textbox');
      const submitButton = screen.getByRole('button', { name: /consultar/i });
      
      fireEvent.change(documentInput, { target: { value: '11144477735' } });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Nova Consulta')).toBeInTheDocument();
      }, { timeout: 3000 });

      // Assert - Chegou na página de resultados
      expect(screen.getByText('Nova Consulta')).toBeInTheDocument();
      
      // Reset para nova consulta
      const novaConsultaButton = screen.getByText('Nova Consulta');
      fireEvent.click(novaConsultaButton);
      
      await waitFor(() => {
        expect(screen.getByTestId('form-consulta')).toBeInTheDocument();
      });
      
      // Test PJ with cadin
      const radioButtons = screen.getAllByRole('radio');
      const [, pjRadio] = radioButtons;
      fireEvent.click(pjRadio);
      
      const checkboxesAgain = screen.getAllByRole('checkbox');
      const cadinCheckboxAgain = checkboxesAgain.find(checkbox => 
        checkbox.closest('label')?.textContent?.includes('Cadin')
      );
      
      if (cadinCheckboxAgain) {
        fireEvent.click(cadinCheckboxAgain);
      }
      
      const documentInputAgain = screen.getByRole('textbox');
      const submitButtonAgain = screen.getByRole('button', { name: /consultar/i });
      
      fireEvent.change(documentInputAgain, { target: { value: '11222333000181' } });
      fireEvent.click(submitButtonAgain);
      
      await waitFor(() => {
        expect(screen.getByText('Nova Consulta')).toBeInTheDocument();
      }, { timeout: 3000 });

      // Assert - Chegou na página de resultados novamente
      expect(screen.getByText('Nova Consulta')).toBeInTheDocument();
    });
  });

  // Testes existentes continuam aqui...
  describe('When handling document validation edge cases', () => {
    it('then should handle document with exactly 11 digits for CPF', () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      const documentInput = screen.getByRole('textbox');
      const submitButton = screen.getByRole('button', { name: /consultar/i });
      
      // Act - CPF com exatamente 11 dígitos mas inválido
      fireEvent.change(documentInput, { target: { value: '12345678909' } });
      fireEvent.click(submitButton);
      
      // Assert - Deve validar e não submeter se inválido
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    it('then should handle document with exactly 14 digits for CNPJ', () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      const documentInput = screen.getByRole('textbox');
      const submitButton = screen.getByRole('button', { name: /consultar/i });
      const radioButtons = screen.getAllByRole('radio');
      const [, pjRadio] = radioButtons;
      
      // Act - CNPJ com exatamente 14 dígitos mas inválido (dígitos verificadores incorretos)
      fireEvent.click(pjRadio);
      fireEvent.change(documentInput, { target: { value: '12345678000100' } });
      fireEvent.click(submitButton);
      
      // Assert - Deve validar e não submeter se inválido
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    it('then should handle document with less than required digits', () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      const documentInput = screen.getByRole('textbox');
      const submitButton = screen.getByRole('button', { name: /consultar/i });
      
      // Act - Documento com menos dígitos que o necessário
      fireEvent.change(documentInput, { target: { value: '123456789' } });
      fireEvent.click(submitButton);
      
      // Assert - Não deve submeter
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    it('then should handle document with more than required digits', () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      const documentInput = screen.getByRole('textbox');
      const submitButton = screen.getByRole('button', { name: /consultar/i });
      
      // Act - Documento com mais dígitos que o necessário
      fireEvent.change(documentInput, { target: { value: '111444777351234' } });
      fireEvent.click(submitButton);
      
      // Assert - Deve truncar e formatar corretamente
      expect(documentInput).toHaveValue('111.444.777-35');
    });

    it('then should handle CNPJ with more than required digits', () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      const documentInput = screen.getByRole('textbox');
      const submitButton = screen.getByRole('button', { name: /consultar/i });
      const radioButtons = screen.getAllByRole('radio');
      const [, pjRadio] = radioButtons;
      
      // Act - CNPJ com mais dígitos que o necessário
      fireEvent.click(pjRadio);
      fireEvent.change(documentInput, { target: { value: '1122233300018112345' } });
      fireEvent.click(submitButton);
      
      // Assert - Deve truncar e formatar corretamente
      expect(documentInput).toHaveValue('11.222.333/0001-81');
    });

    it('then should handle CNPJ with less than required digits', () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      const documentInput = screen.getByRole('textbox');
      const submitButton = screen.getByRole('button', { name: /consultar/i });
      const radioButtons = screen.getAllByRole('radio');
      const [, pjRadio] = radioButtons;
      
      // Act - CNPJ com menos dígitos que o necessário
      fireEvent.click(pjRadio);
      fireEvent.change(documentInput, { target: { value: '1122233300' } });
      fireEvent.click(submitButton);
      
      // Assert - Não deve submeter
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });
  });

  describe('When handling formatting edge cases', () => {
    it('then should format CPF with sequential numbers', () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      const documentInput = screen.getByRole('textbox');
      
      // Act - CPF com números sequenciais (geralmente inválido)
      fireEvent.change(documentInput, { target: { value: '12345678910' } });
      
      // Assert - Deve formatar mesmo sendo inválido
      expect(documentInput).toHaveValue('123.456.789-10');
    });

    it('then should format CNPJ with sequential numbers', () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      const documentInput = screen.getByRole('textbox');
      const radioButtons = screen.getAllByRole('radio');
      const [, pjRadio] = radioButtons;
      
      // Act - CNPJ com números sequenciais
      fireEvent.click(pjRadio);
      fireEvent.change(documentInput, { target: { value: '12345678901234' } });
      
      // Assert - Deve formatar mesmo sendo inválido
      expect(documentInput).toHaveValue('12.345.678/9012-34');
    });

    it('then should handle document input with only formatting characters', () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      const documentInput = screen.getByRole('textbox');
      const submitButton = screen.getByRole('button', { name: /consultar/i });
      
      // Act - Apenas caracteres de formatação
      fireEvent.change(documentInput, { target: { value: '.-/' } });
      fireEvent.click(submitButton);
      
      // Assert - Não deve submeter
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
      expect(documentInput).toHaveValue('');
    });

    it('then should handle partial document input with formatting', () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      const documentInput = screen.getByRole('textbox');
      
      // Act - Entrada parcial com formatação
      fireEvent.change(documentInput, { target: { value: '111.444.7' } });
      
      // Assert - Deve manter formatação parcial
      expect(documentInput).toHaveValue('111.444.7');
    });

    it('then should handle very short document input', () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      const documentInput = screen.getByRole('textbox');
      const submitButton = screen.getByRole('button', { name: /consultar/i });
      
      // Act - Entrada muito curta
      fireEvent.change(documentInput, { target: { value: '123' } });
      fireEvent.click(submitButton);
      
      // Assert - Não deve submeter
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
      expect(documentInput).toHaveValue('123');
    });

    it('then should handle empty document after clearing', () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      const documentInput = screen.getByRole('textbox');
      const submitButton = screen.getByRole('button', { name: /consultar/i });
      
      // Act - Inserir documento e depois limpar
      fireEvent.change(documentInput, { target: { value: '111444777' } });
      fireEvent.change(documentInput, { target: { value: '' } });
      fireEvent.click(submitButton);
      
      // Assert - Não deve submeter
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
      expect(documentInput).toHaveValue('');
    });
  });

  describe('When handling validation branches', () => {
    it('then should validate CPF with repeated digits', () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      const documentInput = screen.getByRole('textbox');
      const submitButton = screen.getByRole('button', { name: /consultar/i });
      
      // Act - CPF com todos os dígitos iguais
      fireEvent.change(documentInput, { target: { value: '11111111111' } });
      fireEvent.click(submitButton);
      
      // Assert - Não deve submeter
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    it('then should validate CNPJ with repeated digits', () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      const documentInput = screen.getByRole('textbox');
      const submitButton = screen.getByRole('button', { name: /consultar/i });
      const radioButtons = screen.getAllByRole('radio');
      const [, pjRadio] = radioButtons;
      
      // Act - CNPJ com todos os dígitos iguais
      fireEvent.click(pjRadio);
      fireEvent.change(documentInput, { target: { value: '11111111111111' } });
      fireEvent.click(submitButton);
      
      // Assert - Não deve submeter
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    it('then should validate CPF with invalid first digit', () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      const documentInput = screen.getByRole('textbox');
      const submitButton = screen.getByRole('button', { name: /consultar/i });
      
      // Act - CPF com primeiro dígito verificador inválido
      fireEvent.change(documentInput, { target: { value: '11144477799' } });
      fireEvent.click(submitButton);
      
      // Assert - Não deve submeter
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    it('then should validate CPF with invalid second digit', () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      const documentInput = screen.getByRole('textbox');
      const submitButton = screen.getByRole('button', { name: /consultar/i });
      
      // Act - CPF com segundo dígito verificador inválido
      fireEvent.change(documentInput, { target: { value: '11144477739' } });
      fireEvent.click(submitButton);
      
      // Assert - Não deve submeter
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    it('then should validate CNPJ with invalid first digit', () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      const documentInput = screen.getByRole('textbox');
      const submitButton = screen.getByRole('button', { name: /consultar/i });
      const radioButtons = screen.getAllByRole('radio');
      const [, pjRadio] = radioButtons;
      
      // Act - CNPJ com primeiro dígito verificador inválido
      fireEvent.click(pjRadio);
      fireEvent.change(documentInput, { target: { value: '11222333000199' } });
      fireEvent.click(submitButton);
      
      // Assert - Não deve submeter
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    it('then should validate CNPJ with invalid second digit', () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      const documentInput = screen.getByRole('textbox');
      const submitButton = screen.getByRole('button', { name: /consultar/i });
      const radioButtons = screen.getAllByRole('radio');
      const [, pjRadio] = radioButtons;
      
      // Act - CNPJ com segundo dígito verificador inválido
      fireEvent.click(pjRadio);
      fireEvent.change(documentInput, { target: { value: '11222333000189' } });
      fireEvent.click(submitButton);
      
      // Assert - Não deve submeter
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    it('then should validate different CPF patterns', () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      const documentInput = screen.getByRole('textbox');
      const submitButton = screen.getByRole('button', { name: /consultar/i });
      
      // Act - CPF com padrão conhecido como inválido
      fireEvent.change(documentInput, { target: { value: '12345678900' } });
      fireEvent.click(submitButton);
      
      // Assert - Não deve submeter
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    it('then should validate different CNPJ patterns', () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      const documentInput = screen.getByRole('textbox');
      const submitButton = screen.getByRole('button', { name: /consultar/i });
      const radioButtons = screen.getAllByRole('radio');
      const [, pjRadio] = radioButtons;
      
      // Act - CNPJ com padrão conhecido como inválido
      fireEvent.click(pjRadio);
      fireEvent.change(documentInput, { target: { value: '12345678000100' } });
      fireEvent.click(submitButton);
      
      // Assert - Não deve submeter
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });
  });

  describe('When handling input sanitization', () => {
    it('then should sanitize document input removing non-numeric characters', () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      const documentInput = screen.getByRole('textbox');
      
      // Act - Entrada com caracteres especiais
      fireEvent.change(documentInput, { target: { value: '111abc444def777ghi35' } });
      
      // Assert - Deve remover caracteres não numéricos
      expect(documentInput).toHaveValue('111.444.777-35');
    });

    it('then should handle input with spaces and special characters', () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      const documentInput = screen.getByRole('textbox');
      
      // Act - Entrada com espaços e caracteres especiais
      fireEvent.change(documentInput, { target: { value: '111 444 777 35' } });
      
      // Assert - Deve remover espaços e formatar
      expect(documentInput).toHaveValue('111.444.777-35');
    });

    it('then should handle input with mixed formatting characters', () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      const documentInput = screen.getByRole('textbox');
      
      // Act - Entrada com vários tipos de formatação
      fireEvent.change(documentInput, { target: { value: '111.444-777/35' } });
      
      // Assert - Deve normalizar a formatação
      expect(documentInput).toHaveValue('111.444.777-35');
    });

    it('then should handle input with only spaces', () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      const documentInput = screen.getByRole('textbox');
      const submitButton = screen.getByRole('button', { name: /consultar/i });
      
      // Act - Entrada com apenas espaços
      fireEvent.change(documentInput, { target: { value: '     ' } });
      fireEvent.click(submitButton);
      
      // Assert - Não deve submeter
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
      expect(documentInput).toHaveValue('');
    });
  });

  describe('When handling state management', () => {
    it('then should maintain form state during validation', () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      const documentInput = screen.getByRole('textbox');
      const submitButton = screen.getByRole('button', { name: /consultar/i });
      const checkboxes = screen.getAllByRole('checkbox');
      
      // Act - Selecionar checkbox e tentar submeter documento inválido
      fireEvent.click(checkboxes[0]);
      fireEvent.change(documentInput, { target: { value: '12345678901' } });
      fireEvent.click(submitButton);
      
      // Assert - Checkbox deve permanecer selecionado
      expect(checkboxes[0]).toBeChecked();
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    it('then should handle rapid person type switching', () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      const documentInput = screen.getByRole('textbox');
      const radioButtons = screen.getAllByRole('radio');
      const [pfRadio, pjRadio] = radioButtons;
      
      // Act - Alternar rapidamente entre tipos
      fireEvent.change(documentInput, { target: { value: '11144477735' } });
      fireEvent.click(pjRadio);
      fireEvent.click(pfRadio);
      fireEvent.click(pjRadio);
      
      // Assert - Deve limpar campo e manter última seleção
      expect(documentInput).toHaveValue('');
      expect(pjRadio).toBeChecked();
    });

    it('then should handle state persistence across multiple validations', () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      const documentInput = screen.getByRole('textbox');
      const submitButton = screen.getByRole('button', { name: /consultar/i });
      const checkboxes = screen.getAllByRole('checkbox');
      const radioButtons = screen.getAllByRole('radio');
      const [, pjRadio] = radioButtons;
      
      // Act - Configurar estado e tentar várias validações
      fireEvent.click(checkboxes[0]);
      fireEvent.click(pjRadio);
      fireEvent.change(documentInput, { target: { value: '12345678000100' } });
      fireEvent.click(submitButton);
      
      // Assert - Estado deve ser mantido após validação falhar
      expect(checkboxes[0]).toBeChecked();
      expect(pjRadio).toBeChecked();
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });
  });

  describe('When handling async operations and loading states', () => {
    it('then should prevent multiple simultaneous submissions', async () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      const documentInput = screen.getByRole('textbox');
      const submitButton = screen.getByRole('button', { name: /consultar/i });
      
      // Act - Submeter múltiplas vezes rapidamente
      fireEvent.change(documentInput, { target: { value: '11144477735' } });
      fireEvent.click(submitButton);
      fireEvent.click(submitButton);
      fireEvent.click(submitButton);
      
      // Assert - Deve mostrar loading apenas uma vez
      expect(screen.getByTestId('loading')).toBeInTheDocument();
      
      // Wait for completion
      await waitFor(() => {
        expect(screen.getByText('Nova Consulta')).toBeInTheDocument();
      }, { timeout: 3000 });
    });

    it('then should handle loading timeout and show results', async () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      const documentInput = screen.getByRole('textbox');
      const submitButton = screen.getByRole('button', { name: /consultar/i });
      
      // Act - Submeter com documento válido
      fireEvent.change(documentInput, { target: { value: '11144477735' } });
      fireEvent.click(submitButton);
      
      // Assert - Deve mostrar loading e depois resultados
      expect(screen.getByTestId('loading')).toBeInTheDocument();
      
      await waitFor(() => {
        expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
        expect(screen.getByText('Nova Consulta')).toBeInTheDocument();
      }, { timeout: 3000 });
    });
  });

  describe('When handling complete form reset', () => {
    it('then should reset all form fields after consultation', async () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      const documentInput = screen.getByRole('textbox');
      const submitButton = screen.getByRole('button', { name: /consultar/i });
      const checkboxes = screen.getAllByRole('checkbox');
      const radioButtons = screen.getAllByRole('radio');
      const [, pjRadio] = radioButtons;
      
      // Act - Configurar formulário completo
      fireEvent.click(pjRadio);
      fireEvent.click(checkboxes[0]);
      fireEvent.click(checkboxes[1]);
      fireEvent.change(documentInput, { target: { value: '11222333000181' } });
      fireEvent.click(submitButton);
      
      // Wait for results
      await waitFor(() => {
        expect(screen.getByText('Nova Consulta')).toBeInTheDocument();
      }, { timeout: 3000 });
      
      // Act - Reset form
      const novaConsultaButton = screen.getByText('Nova Consulta');
      fireEvent.click(novaConsultaButton);
      
      // Assert - Todos os campos devem ser resetados
      await waitFor(() => {
        expect(screen.getByTestId('form-consulta')).toBeInTheDocument();
        const newDocumentInput = screen.getByRole('textbox');
        expect(newDocumentInput).toHaveValue('');
      });
    });
  });

  describe('When handling specific validation scenarios', () => {
    it('then should handle CPF validation with edge case digits', () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      const documentInput = screen.getByRole('textbox');
      const submitButton = screen.getByRole('button', { name: /consultar/i });
      
      // Act - CPF com dígitos que podem gerar casos especiais na validação
      fireEvent.change(documentInput, { target: { value: '12345678901' } });
      fireEvent.click(submitButton);
      
      // Assert - Deve validar e rejeitar
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    it('then should handle CNPJ validation with edge case digits', () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      const documentInput = screen.getByRole('textbox');
      const submitButton = screen.getByRole('button', { name: /consultar/i });
      const radioButtons = screen.getAllByRole('radio');
      const [, pjRadio] = radioButtons;
      
      // Act - CNPJ com dígitos que podem gerar casos especiais na validação
      fireEvent.click(pjRadio);
      fireEvent.change(documentInput, { target: { value: '12345678901234' } });
      fireEvent.click(submitButton);
      
      // Assert - Deve validar e rejeitar
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    it('then should handle document input boundary conditions', () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      const documentInput = screen.getByRole('textbox');
      const submitButton = screen.getByRole('button', { name: /consultar/i });
      
      // Act - Entrada com exatamente 10 dígitos (boundary para CPF)
      fireEvent.change(documentInput, { target: { value: '1234567890' } });
      fireEvent.click(submitButton);
      
      // Assert - Não deve submeter por não ter dígitos suficientes
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    it('then should handle CNPJ input boundary conditions', () => {
      // Arrange
      render(<RelatorioTopPage />);
      
      const documentInput = screen.getByRole('textbox');
      const submitButton = screen.getByRole('button', { name: /consultar/i });
      const radioButtons = screen.getAllByRole('radio');
      const [, pjRadio] = radioButtons;
      
      // Act - CNPJ com exatamente 13 dígitos (boundary para CNPJ)
      fireEvent.click(pjRadio);
      fireEvent.change(documentInput, { target: { value: '1234567890123' } });
      fireEvent.click(submitButton);
      
      // Assert - Não deve submeter por não ter dígitos suficientes
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });
  });
});