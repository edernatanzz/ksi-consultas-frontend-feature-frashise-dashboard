import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { DocumentoInput } from '../DocumentoInput';


describe('DocumentoInput', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  describe('Renderização inicial', () => {
    it('When personType is fisica, then should render CPF label and placeholder', () => {
      // Arrange
      const props = {
        value: '',
        onChange: mockOnChange,
        personType: 'fisica',
        dataTestId: 'documento-input'
      };

      // Act
      render(<DocumentoInput {...props} />);

      // Assert
      expect(screen.getByText('CPF')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Digite o CPF')).toBeInTheDocument();
    });

    it('When personType is juridica, then should render CNPJ label and placeholder', () => {
      // Arrange
      const props = {
        value: '',
        onChange: mockOnChange,
        personType: 'juridica',
        dataTestId: 'documento-input'
      };

      // Act
      render(<DocumentoInput {...props} />);

      // Assert
      expect(screen.getByText('CNPJ')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Digite o CNPJ')).toBeInTheDocument();
    });

  });

  describe('Formatação CPF', () => {
    it('When user types 3 digits for CPF, then should not add dots', () => {
      // Arrange
      const props = {
        value: '',
        onChange: mockOnChange,
        personType: 'fisica',
        dataTestId: 'documento-input'
      };
      render(<DocumentoInput {...props} />);
      const input = screen.getByRole('textbox');

      // Act
      fireEvent.change(input, { target: { value: '123' } });

      // Assert
      expect(input).toHaveValue('123');
      expect(mockOnChange).toHaveBeenCalledWith('123');
    });

    it('When user types 6 digits for CPF, then should format with first dot', () => {
      // Arrange
      const props = {
        value: '',
        onChange: mockOnChange,
        personType: 'fisica',
        dataTestId: 'documento-input'
      };
      render(<DocumentoInput {...props} />);
      const input = screen.getByRole('textbox');

      // Act
      fireEvent.change(input, { target: { value: '123456' } });

      // Assert
      expect(input).toHaveValue('123.456');
      expect(mockOnChange).toHaveBeenCalledWith('123.456');
    });

    it('When user types 9 digits for CPF, then should format with two dots', () => {
      // Arrange
      const props = {
        value: '',
        onChange: mockOnChange,
        personType: 'fisica',
        dataTestId: 'documento-input'
      };
      render(<DocumentoInput {...props} />);
      const input = screen.getByRole('textbox');

      // Act
      fireEvent.change(input, { target: { value: '123456789' } });

      // Assert
      expect(input).toHaveValue('123.456.789');
      expect(mockOnChange).toHaveBeenCalledWith('123.456.789');
    });

    it('When user types complete CPF, then should format with dots and dash', () => {
      // Arrange
      const props = {
        value: '',
        onChange: mockOnChange,
        personType: 'fisica',
        dataTestId: 'documento-input'
      };
      render(<DocumentoInput {...props} />);
      const input = screen.getByRole('textbox');

      // Act
      fireEvent.change(input, { target: { value: '12345678901' } });

      // Assert
      expect(input).toHaveValue('123.456.789-01');
      expect(mockOnChange).toHaveBeenCalledWith('123.456.789-01');
    });
  });

  describe('Formatação CNPJ', () => {
    it('When user types 2 digits for CNPJ, then should not add dots', () => {
      // Arrange
      const props = {
        value: '',
        onChange: mockOnChange,
        personType: 'juridica',
        dataTestId: 'documento-input'
      };
      render(<DocumentoInput {...props} />);
      const input = screen.getByRole('textbox');

      // Act
      fireEvent.change(input, { target: { value: '12' } });

      // Assert
      expect(input).toHaveValue('12');
      expect(mockOnChange).toHaveBeenCalledWith('12');
    });

    it('When user types 5 digits for CNPJ, then should format with first dot', () => {
      // Arrange
      const props = {
        value: '',
        onChange: mockOnChange,
        personType: 'juridica',
        dataTestId: 'documento-input'
      };
      render(<DocumentoInput {...props} />);
      const input = screen.getByRole('textbox');

      // Act
      fireEvent.change(input, { target: { value: '12345' } });

      // Assert
      expect(input).toHaveValue('12.345');
      expect(mockOnChange).toHaveBeenCalledWith('12.345');
    });

    it('When user types 8 digits for CNPJ, then should format with two dots', () => {
      // Arrange
      const props = {
        value: '',
        onChange: mockOnChange,
        personType: 'juridica',
        dataTestId: 'documento-input'
      };
      render(<DocumentoInput {...props} />);
      const input = screen.getByRole('textbox');

      // Act
      fireEvent.change(input, { target: { value: '12345678' } });

      // Assert
      expect(input).toHaveValue('12.345.678');
      expect(mockOnChange).toHaveBeenCalledWith('12.345.678');
    });

    it('When user types 12 digits for CNPJ, then should format with dots and slash', () => {
      // Arrange
      const props = {
        value: '',
        onChange: mockOnChange,
        personType: 'juridica',
        dataTestId: 'documento-input'
      };
      render(<DocumentoInput {...props} />);
      const input = screen.getByRole('textbox');

      // Act
      fireEvent.change(input, { target: { value: '123456789012' } });

      // Assert
      expect(input).toHaveValue('12.345.678/9012');
      expect(mockOnChange).toHaveBeenCalledWith('12.345.678/9012');
    });

    it('When user types complete CNPJ, then should format with dots, slash and dash', () => {
      // Arrange
      const props = {
        value: '',
        onChange: mockOnChange,
        personType: 'juridica',
        dataTestId: 'documento-input'
      };
      render(<DocumentoInput {...props} />);
      const input = screen.getByRole('textbox');

      // Act
      fireEvent.change(input, { target: { value: '12345678901234' } });

      // Assert
      expect(input).toHaveValue('12.345.678/9012-34');
      expect(mockOnChange).toHaveBeenCalledWith('12.345.678/9012-34');
    });
  });

  describe('Validação', () => {
    it('When CPF has less than 11 digits, then should show error message', async () => {
      // Arrange
      const props = {
        value: '',
        onChange: mockOnChange,
        personType: 'fisica',
        dataTestId: 'documento-input'
      };
      render(<DocumentoInput {...props} />);
      const input = screen.getByRole('textbox');

      // Act
      fireEvent.change(input, { target: { value: '123456789' } });

      // Assert
      await waitFor(() => {
        expect(screen.getByText('CPF deve conter 11 dígitos')).toBeInTheDocument();
      });
    });

    it('When CPF has exactly 11 digits, then should not show error message', async () => {
      // Arrange
      const props = {
        value: '',
        onChange: mockOnChange,
        personType: 'fisica',
        dataTestId: 'documento-input'
      };
      render(<DocumentoInput {...props} />);
      const input = screen.getByRole('textbox');

      // Act
      fireEvent.change(input, { target: { value: '12345678901' } });

      // Assert
      await waitFor(() => {
        expect(screen.queryByText('CPF deve conter 11 dígitos')).not.toBeInTheDocument();
      });
    });

    it('When CNPJ has less than 14 digits, then should show error message', async () => {
      // Arrange
      const props = {
        value: '',
        onChange: mockOnChange,
        personType: 'juridica',
        dataTestId: 'documento-input'
      };
      render(<DocumentoInput {...props} />);
      const input = screen.getByRole('textbox');

      // Act
      fireEvent.change(input, { target: { value: '123456789012' } });

      // Assert
      await waitFor(() => {
        expect(screen.getByText('CNPJ deve conter 14 dígitos')).toBeInTheDocument();
      });
    });

    it('When CNPJ has exactly 14 digits, then should not show error message', async () => {
      // Arrange
      const props = {
        value: '',
        onChange: mockOnChange,
        personType: 'juridica',
        dataTestId: 'documento-input'
      };
      render(<DocumentoInput {...props} />);
      const input = screen.getByRole('textbox');

      // Act
      fireEvent.change(input, { target: { value: '12345678901234' } });

      // Assert
      await waitFor(() => {
        expect(screen.queryByText('CNPJ deve conter 14 dígitos')).not.toBeInTheDocument();
      });
    });

    it('When input is empty, then should not show error message', () => {
      // Arrange
      const props = {
        value: '',
        onChange: mockOnChange,
        personType: 'fisica',
        dataTestId: 'documento-input'
      };
      render(<DocumentoInput {...props} />);
      const input = screen.getByRole('textbox');

      // Act
      fireEvent.change(input, { target: { value: '' } });

      // Assert
      expect(screen.queryByText('CPF deve conter 11 dígitos')).not.toBeInTheDocument();
    });

    it('When CPF is invalid (wrong format), then should show error message', async () => {
      // Arrange
      const props = {
        value: '',
        onChange: mockOnChange,
        personType: 'fisica',
        dataTestId: 'documento-input'
      };
      render(<DocumentoInput {...props} />);
      const input = screen.getByRole('textbox');

      // Act - Usando um CPF inválido mas com 11 dígitos
      fireEvent.change(input, { target: { value: '11111111111' } });

      // Assert
      await waitFor(() => {
        expect(screen.getByText('CPF ou CNPJ inválido')).toBeInTheDocument();
      });
    });

    it('When CPF is valid, then should not show error message', async () => {
      // Arrange
      const props = {
        value: '',
        onChange: mockOnChange,
        personType: 'fisica',
        dataTestId: 'documento-input'
      };
      render(<DocumentoInput {...props} />);
      const input = screen.getByRole('textbox');

      // Act - Usando um CPF válido
      fireEvent.change(input, { target: { value: '11144477735' } });

      // Assert
      await waitFor(() => {
        expect(screen.queryByText('CPF ou CNPJ inválido')).not.toBeInTheDocument();
      });
    });

    it('When CNPJ is invalid (wrong format), then should show error message', async () => {
      // Arrange
      const props = {
        value: '',
        onChange: mockOnChange,
        personType: 'juridica',
        dataTestId: 'documento-input'
      };
      render(<DocumentoInput {...props} />);
      const input = screen.getByRole('textbox');

      // Act - Usando um CNPJ inválido mas com 14 dígitos
      fireEvent.change(input, { target: { value: '11111111111111' } });

      // Assert
      await waitFor(() => {
        expect(screen.getByText('CPF ou CNPJ inválido')).toBeInTheDocument();
      });
    });

    it('When CNPJ is valid, then should not show error message', async () => {
      // Arrange
      const props = {
        value: '',
        onChange: mockOnChange,
        personType: 'juridica',
        dataTestId: 'documento-input'
      };
      render(<DocumentoInput {...props} />);
      const input = screen.getByRole('textbox');

      // Act - Usando um CNPJ válido
      fireEvent.change(input, { target: { value: '11222333000181' } });

      // Assert
      await waitFor(() => {
        expect(screen.queryByText('CPF ou CNPJ inválido')).not.toBeInTheDocument();
      });
    });
  });

  describe('Mudança de tipo de pessoa', () => {
    it('When personType changes from fisica to juridica, then should clear input and error', async () => {
      // Arrange
      const { rerender } = render(
        <DocumentoInput value="123.456.789" onChange={mockOnChange} personType="fisica" dataTestId="documento-input" />
      );

      // Act
      rerender(
        <DocumentoInput value="123.456.789" onChange={mockOnChange} personType="juridica" dataTestId="documento-input" />
      );

      // Assert
      await waitFor(() => {
        expect(screen.getByRole('textbox')).toHaveValue('');
        expect(mockOnChange).toHaveBeenCalledWith('');
      });
    });

    it('When personType changes from juridica to fisica, then should clear input and error', async () => {
      // Arrange
      const { rerender } = render(
        <DocumentoInput value="12.345.678/9012" onChange={mockOnChange} personType="juridica" dataTestId="documento-input" />
      );

      // Act
      rerender(
        <DocumentoInput value="12.345.678/9012" onChange={mockOnChange} personType="fisica" dataTestId="documento-input" />
      );

      // Assert
      await waitFor(() => {
        expect(screen.getByRole('textbox')).toHaveValue('');
        expect(mockOnChange).toHaveBeenCalledWith('');
      });
    });
  });

  describe('Sincronização com valor externo', () => {
    it('When external value changes, then should update local value', async () => {
      // Arrange
      const { rerender } = render(
        <DocumentoInput value="" onChange={mockOnChange} personType="fisica" dataTestId="documento-input" />
      );

      // Act
      rerender(
        <DocumentoInput value="12345678901" onChange={mockOnChange} personType="fisica" dataTestId="documento-input" />
      );

      // Assert
      await waitFor(() => {
        expect(screen.getByRole('textbox')).toHaveValue('12345678901');
      });
    });
  });

  describe('Filtro de caracteres', () => {
    it('When user types non-numeric characters, then should filter them out', () => {
      // Arrange
      const props = {
        value: '',
        onChange: mockOnChange,
        personType: 'fisica',
        dataTestId: 'documento-input'
      };
      render(<DocumentoInput {...props} />);
      const input = screen.getByRole('textbox');

      // Act
      fireEvent.change(input, { target: { value: 'abc123def456ghi789jkl01' } });

      // Assert
      expect(input).toHaveValue('123.456.789-01');
      expect(mockOnChange).toHaveBeenCalledWith('123.456.789-01');
    });

    it('When user types special characters with CNPJ, then should filter them out', () => {
      // Arrange
      const props = {
        value: '',
        onChange: mockOnChange,
        personType: 'juridica',
        dataTestId: 'documento-input'
      };
      render(<DocumentoInput {...props} />);
      const input = screen.getByRole('textbox');

      // Act
      fireEvent.change(input, { target: { value: '12@#345$%678&*901()234' } });

      // Assert
      expect(input).toHaveValue('12.345.678/9012-34');
      expect(mockOnChange).toHaveBeenCalledWith('12.345.678/9012-34');
    });
  });

  describe('Estados de erro', () => {
    it('When there is validation error, then input should have error styling', async () => {
      // Arrange
      const props = {
        value: '',
        onChange: mockOnChange,
        personType: 'fisica',
        dataTestId: 'documento-input'
      };
      render(<DocumentoInput {...props} />);
      const input = screen.getByRole('textbox');

      // Act
      fireEvent.change(input, { target: { value: '123456789' } });

      // Assert
      await waitFor(() => {
        expect(input).toHaveAttribute('aria-invalid', 'true');
      });
    });

    it('When there is no validation error, then input should not have error styling', async () => {
      // Arrange
      const props = {
        value: '',
        onChange: mockOnChange,
        personType: 'fisica',
        dataTestId: 'documento-input'
      };
      render(<DocumentoInput {...props} />);
      const input = screen.getByRole('textbox');

      // Act - Usando um CPF válido
      fireEvent.change(input, { target: { value: '11144477735' } });

      // Assert
      await waitFor(() => {
        expect(input).toHaveAttribute('aria-invalid', 'false');
      });
    });
  });
});