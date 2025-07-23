import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useState } from 'react';
import RelatorioGoldPage from '../page';
import { FormularioConsulta } from '@/components/molecules/FormConsulta/FormConsulta';
import { validateDocument } from '@/utils/Validator';
import CardOptionalData from '@/components/molecules/CardOptionalData/CardOptionalData';
import { ResultadosTemplate } from '@/components/template/ResultadosTemplate/ResultadosTemplate';
// Mock dos componentes filhos para isolar os testes
vi.mock('@/components/molecules/FormConsulta/FormConsulta', () => ({
  FormularioConsulta: vi.fn(({ onSubmit }) => (
    <div data-testid="mock-form-consulta">
      <button onClick={onSubmit} data-testid="mock-submit-button">
        Consultar
      </button>
    </div>
  ))
}));

vi.mock('@/components/molecules/CardOptionalData/CardOptionalData', () => ({
  default: vi.fn(() => <div data-testid="mock-card-optional-data" />)
}));

vi.mock('@/components/molecules/CardDescription/CardDescription', () => ({
  default: vi.fn(() => <div data-testid="mock-card-description" />)
}));

vi.mock('@/components/template/ResultadosTemplate/ResultadosTemplate', () => ({
  ResultadosTemplate: vi.fn(({ children }) => (
    <div data-testid="mock-resultados-template">
      {children}
    </div>
  ))
}));

// Mock da função de validação de documento
vi.mock('@/utils/Validator', () => ({
  validateDocument: vi.fn(() => true)
}));

// Mock do RatingProvider
vi.mock('@/contexts/RatingContext/RatingContext', () => ({
  RatingProvider: vi.fn(({ children }) => (
    <div data-testid="mock-rating-provider">
      {children}
    </div>
  ))
}));

// Mock do useState
vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useState: vi.fn()
  };
});

describe('RelatorioGoldPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Reset useState mock (versão simplificada)
    const mockUseState = vi.mocked(useState) as Mock;
    mockUseState.mockImplementation((initial: unknown) => {
      const value = typeof initial === 'function' ? initial() : initial;
      return [value, vi.fn()];
    });
  });

  describe('When rendering the consulta page', () => {
    it('then should show the consulta form by default', () => {
      render(<RelatorioGoldPage />);
      
      expect(screen.getByTestId('consulta-page')).toBeInTheDocument();
      expect(screen.getByTestId('mock-form-consulta')).toBeInTheDocument();
      expect(screen.getByTestId('mock-card-optional-data')).toBeInTheDocument();
      expect(screen.getByTestId('mock-card-description')).toBeInTheDocument();
    });
  });

  describe('When loading state is active', () => {
    it('then should show loading message', () => {
      // Arrange: Mock useState para retornar isLoading = true
      vi.mocked(useState)
        .mockReturnValueOnce(['fisica', vi.fn()]) // personType
        .mockReturnValueOnce(['', vi.fn()]) // documentState
        .mockReturnValueOnce([false, vi.fn()]) // newConsultation
        .mockReturnValueOnce([false, vi.fn()]) // showResults
        .mockReturnValueOnce([true, vi.fn()]) // isLoading
        .mockReturnValueOnce([[], vi.fn()]); // opcionalSelected
      
      render(<RelatorioGoldPage />);
      
      // Assert
      expect(screen.getByTestId('loading')).toBeInTheDocument();
      expect(screen.getByText('Carregando...')).toBeInTheDocument();
    });
  });

  describe('When submitting form with valid document', () => {
    it('then should transition to results page', async () => {
      // Arrange
      const mockSetIsLoading = vi.fn();
      const mockSetShowResults = vi.fn();
      
      vi.mocked(useState)
        .mockReturnValueOnce(['fisica', vi.fn()]) // personType
        .mockReturnValueOnce(['12345678901', vi.fn()]) // documentState
        .mockReturnValueOnce([false, vi.fn()]) // newConsultation
        .mockReturnValueOnce([false, mockSetShowResults]) // showResults
        .mockReturnValueOnce([false, mockSetIsLoading]) // isLoading
        .mockReturnValueOnce([[], vi.fn()]); // opcionalSelected
      
      vi.mocked(validateDocument).mockReturnValue(true);
      
      render(<RelatorioGoldPage />);
      
      // Act
      fireEvent.click(screen.getByTestId('mock-submit-button'));
      
      // Assert
      expect(mockSetIsLoading).toHaveBeenCalledWith(true);
      expect(validateDocument).toHaveBeenCalledWith('12345678901');
    });
  });

  describe('When submitting form with invalid document', () => {
    it('then should not transition to results page', async () => {
      // Arrange
      const mockSetIsLoading = vi.fn();
      
      vi.mocked(useState)
        .mockReturnValueOnce(['fisica', vi.fn()]) // personType
        .mockReturnValueOnce(['invalid', vi.fn()]) // documentState
        .mockReturnValueOnce([false, vi.fn()]) // newConsultation
        .mockReturnValueOnce([false, vi.fn()]) // showResults
        .mockReturnValueOnce([false, mockSetIsLoading]) // isLoading
        .mockReturnValueOnce([[], vi.fn()]); // opcionalSelected
      
      vi.mocked(validateDocument).mockReturnValue(false);
      
      render(<RelatorioGoldPage />);
      
      // Act
      fireEvent.click(screen.getByTestId('mock-submit-button'));
      
      // Assert
      expect(mockSetIsLoading).not.toHaveBeenCalled();
      expect(screen.getByTestId('consulta-page')).toBeInTheDocument();
    });
  });

  describe('When submitting form with empty document', () => {
    it('then should not transition to results page', async () => {
      // Arrange
      const mockSetIsLoading = vi.fn();
      
      vi.mocked(useState)
        .mockReturnValueOnce(['fisica', vi.fn()]) // personType
        .mockReturnValueOnce(['', vi.fn()]) // documentState
        .mockReturnValueOnce([false, vi.fn()]) // newConsultation
        .mockReturnValueOnce([false, vi.fn()]) // showResults
        .mockReturnValueOnce([false, mockSetIsLoading]) // isLoading
        .mockReturnValueOnce([[], vi.fn()]); // opcionalSelected
      
      render(<RelatorioGoldPage />);
      
      // Act
      fireEvent.click(screen.getByTestId('mock-submit-button'));
      
      // Assert
      expect(mockSetIsLoading).not.toHaveBeenCalled();
      expect(screen.getByTestId('consulta-page')).toBeInTheDocument();
    });
  });

  describe('When person type changes', () => {
    it('then should update person type state', () => {
      // Arrange
      const mockSetPersonType = vi.fn();
      
      vi.mocked(useState)
        .mockReturnValueOnce(['fisica', mockSetPersonType]) // personType
        .mockReturnValue([null, vi.fn()]); // outros estados
      
      vi.mocked(FormularioConsulta).mockImplementation(({ onPersonTypeChange }) => (
        <div data-testid="mock-form-consulta">
          <button 
            onClick={() => onPersonTypeChange('juridica')} 
            data-testid="mock-person-type-button"
          >
            Trocar para Jurídica
          </button>
        </div>
      ));
      
      render(<RelatorioGoldPage />);
      
      // Act
      fireEvent.click(screen.getByTestId('mock-person-type-button'));
      
      // Assert
      expect(mockSetPersonType).toHaveBeenCalledWith('juridica');
    });
  });

  describe('When document value changes', () => {
    it('then should update document state', () => {
      // Arrange
      const mockSetDocument = vi.fn();
      
      vi.mocked(useState)
        .mockReturnValueOnce(['fisica', vi.fn()]) // personType
        .mockReturnValueOnce(['', mockSetDocument]) // documentState
        .mockReturnValue([null, vi.fn()]); // outros estados
      
      vi.mocked(FormularioConsulta).mockImplementation(({ onDocumentChange }) => (
        <div data-testid="mock-form-consulta">
          <button 
            onClick={() => onDocumentChange('12345678901')} 
            data-testid="mock-document-button"
          >
            Definir Documento
          </button>
        </div>
      ));
      
      render(<RelatorioGoldPage />);
      
      // Act
      fireEvent.click(screen.getByTestId('mock-document-button'));
      
      // Assert
      expect(mockSetDocument).toHaveBeenCalledWith('12345678901');
    });
  });

  describe('When showing results', () => {
    it('then should render results template', () => {
      // Arrange: Mock useState para mostrar resultados
      vi.mocked(useState)
        .mockReturnValueOnce(['fisica', vi.fn()]) // personType
        .mockReturnValueOnce(['12345678901', vi.fn()]) // documentState
        .mockReturnValueOnce([false, vi.fn()]) // newConsultation
        .mockReturnValueOnce([true, vi.fn()]) // showResults
        .mockReturnValueOnce([false, vi.fn()]) // isLoading
        .mockReturnValueOnce([[], vi.fn()]); // opcionalSelected
      
      render(<RelatorioGoldPage />);
      
      // Assert
      expect(screen.getByTestId('mock-resultados-template')).toBeInTheDocument();
    });
  });

  describe('When warning message is displayed', () => {
    it('then should show optional data warning', () => {
      render(<RelatorioGoldPage />);
      
      // Assert
      expect(screen.getByTestId('warning-message')).toBeInTheDocument();
      expect(screen.getByText(/OS OPCIONAIS SERÃO COBRADOS/)).toBeInTheDocument();
    });
  });

  describe('When page header is rendered', () => {
    it('then should display title and icon', () => {
      render(<RelatorioGoldPage />);
      
      // Assert
      expect(screen.getByTestId('page-header')).toBeInTheDocument();
      expect(screen.getByTestId('page-title')).toBeInTheDocument();
      expect(screen.getByText('Relatório Gold')).toBeInTheDocument();
    });
  });

  describe('When form container is rendered', () => {
    it('then should display form container', () => {
      render(<RelatorioGoldPage />);
      
      // Assert
      expect(screen.getByTestId('form-container')).toBeInTheDocument();
    });
  });

  describe('When description card is rendered', () => {
    it('then should display description card', () => {
      render(<RelatorioGoldPage />);
      
      // Assert
      expect(screen.getByTestId('mock-card-description')).toBeInTheDocument();
    });
  });

  describe('When component initializes with default states', () => {
    it('then should have correct initial state values', () => {
      // Arrange
      vi.mocked(FormularioConsulta).mockImplementation(({ 
        personType, 
        document: documentProp, 
        newConsultation, 
        isLoading 
      }) => (
        <div data-testid="mock-form-consulta">
          <span data-testid="initial-person-type">{personType}</span>
          <span data-testid="initial-document">{documentProp}</span>
          <span data-testid="initial-new-consultation">{newConsultation.toString()}</span>
          <span data-testid="initial-loading">{isLoading.toString()}</span>
        </div>
      ));
      
      render(<RelatorioGoldPage />);
      
      // Assert
      expect(screen.getByTestId('initial-person-type')).toHaveTextContent('fisica');
      expect(screen.getByTestId('initial-document')).toHaveTextContent('');
      expect(screen.getByTestId('initial-new-consultation')).toHaveTextContent('false');
      expect(screen.getByTestId('initial-loading')).toHaveTextContent('false');
    });
  });

  describe('When CardOptionalData receives props', () => {
    it('then should pass correct props to CardOptionalData', () => {
      // Arrange
      vi.mocked(CardOptionalData).mockImplementation((props) => (
        <div data-testid="mock-card-optional-data">
          <div data-testid="optional-props">
            {JSON.stringify({ 
              title: props.title,
              hasData: Array.isArray(props.data),
              hasOpcionalSelected: Array.isArray(props.opcionalSelected),
              hasSetOpcionalSelected: typeof props.setOpcionalSelected === 'function'
            })}
          </div>
        </div>
      ));
      
      render(<RelatorioGoldPage />);
      
      // Assert
      const optionalProps = screen.getByTestId('optional-props');
      expect(optionalProps).toHaveTextContent('"title":"Dados Opcionais"');
      expect(optionalProps).toHaveTextContent('"hasData":true');
      expect(optionalProps).toHaveTextContent('"hasSetOpcionalSelected":true');
    });
  });

  describe('When all props are passed to FormularioConsulta', () => {
    it('then should receive all required props', () => {
      // Arrange
      vi.mocked(FormularioConsulta).mockImplementation((props) => (
        <div data-testid="mock-form-consulta">
          <div data-testid="props-check">
            {Object.keys(props).join(',')}
          </div>
        </div>
      ));
      
      render(<RelatorioGoldPage />);
      
      // Assert
      const propsCheck = screen.getByTestId('props-check');
      expect(propsCheck).toHaveTextContent('personType');
      expect(propsCheck).toHaveTextContent('document');
      expect(propsCheck).toHaveTextContent('newConsultation');
      expect(propsCheck).toHaveTextContent('isLoading');
      expect(propsCheck).toHaveTextContent('onPersonTypeChange');
      expect(propsCheck).toHaveTextContent('onDocumentChange');
      expect(propsCheck).toHaveTextContent('onNewConsultationChange');
      expect(propsCheck).toHaveTextContent('onSubmit');
    });
  });

  describe('When handleNovaConsulta is called', () => {
    it('then should reset showResults, document and set newConsultation to true', () => {
      // Arrange
      const mockSetShowResults = vi.fn();
      const mockSetDocument = vi.fn();
      const mockSetNewConsultation = vi.fn();
      
      vi.mocked(useState)
        .mockReturnValueOnce(['fisica', vi.fn()]) // personType
        .mockReturnValueOnce(['12345678901', mockSetDocument]) // documentState
        .mockReturnValueOnce([false, mockSetNewConsultation]) // newConsultation
        .mockReturnValueOnce([true, mockSetShowResults]) // showResults
        .mockReturnValueOnce([false, vi.fn()]) // isLoading
        .mockReturnValueOnce([[], vi.fn()]); // opcionalSelected

      vi.mocked(ResultadosTemplate).mockImplementation(({ onNovaConsulta, children }) => (
        <div data-testid="mock-resultados-template">
          <button onClick={onNovaConsulta} data-testid="nova-consulta-button">
            Nova Consulta
          </button>
          {children}
        </div>
      ));

      render(<RelatorioGoldPage />);

      // Act
      fireEvent.click(screen.getByTestId('nova-consulta-button'));

      // Assert
      expect(mockSetShowResults).toHaveBeenCalledWith(false);
      expect(mockSetDocument).toHaveBeenCalledWith('');
      expect(mockSetNewConsultation).toHaveBeenCalledWith(true);
    });
  });

  describe('When handleConsultar is called with empty document', () => {
    it('then should not trigger loading state', () => {
      // Arrange
      const mockSetIsLoading = vi.fn();
      
      vi.mocked(useState)
        .mockReturnValueOnce(['fisica', vi.fn()]) // personType
        .mockReturnValueOnce(['   ', vi.fn()]) // documentState with whitespace
        .mockReturnValueOnce([false, vi.fn()]) // newConsultation
        .mockReturnValueOnce([false, vi.fn()]) // showResults
        .mockReturnValueOnce([false, mockSetIsLoading]) // isLoading
        .mockReturnValueOnce([[], vi.fn()]); // opcionalSelected

      // Resetar o mock para incluir o botão
      vi.mocked(FormularioConsulta).mockImplementation(({ onSubmit }) => (
        <div data-testid="mock-form-consulta">
          <button onClick={onSubmit} data-testid="mock-submit-button">
            Consultar
          </button>
        </div>
      ));

      render(<RelatorioGoldPage />);

      // Act
      fireEvent.click(screen.getByTestId('mock-submit-button'));

      // Assert
      expect(mockSetIsLoading).not.toHaveBeenCalled();
    });
  });

  describe('When handleConsultar is called with valid document and triggers timeout', () => {
    it('then should set loading false and showResults true after timeout', async () => {
      // Arrange
      const mockSetIsLoading = vi.fn();
      const mockSetShowResults = vi.fn();
      
      vi.mocked(useState)
        .mockReturnValueOnce(['fisica', vi.fn()]) // personType
        .mockReturnValueOnce(['12345678901', vi.fn()]) // documentState
        .mockReturnValueOnce([false, vi.fn()]) // newConsultation
        .mockReturnValueOnce([false, mockSetShowResults]) // showResults
        .mockReturnValueOnce([false, mockSetIsLoading]) // isLoading
        .mockReturnValueOnce([[], vi.fn()]); // opcionalSelected

      vi.mocked(validateDocument).mockReturnValue(true);

      // Resetar o mock para incluir o botão
      vi.mocked(FormularioConsulta).mockImplementation(({ onSubmit }) => (
        <div data-testid="mock-form-consulta">
          <button onClick={onSubmit} data-testid="mock-submit-button">
            Consultar
          </button>
        </div>
      ));

      render(<RelatorioGoldPage />);

      // Act
      fireEvent.click(screen.getByTestId('mock-submit-button'));

      // Assert - primeiro deve chamar setIsLoading(true)
      expect(mockSetIsLoading).toHaveBeenCalledWith(true);

      // Wait for timeout
      await waitFor(() => {
        expect(mockSetIsLoading).toHaveBeenCalledWith(false);
        expect(mockSetShowResults).toHaveBeenCalledWith(true);
      }, { timeout: 2000 });
    });
  });

  describe('When personType is juridica', () => {
    it('then should render with juridica person type', () => {
      // Arrange
      vi.mocked(useState)
        .mockReturnValueOnce(['juridica', vi.fn()]) // personType
        .mockReturnValueOnce(['12345678901', vi.fn()]) // documentState
        .mockReturnValueOnce([false, vi.fn()]) // newConsultation
        .mockReturnValueOnce([true, vi.fn()]) // showResults
        .mockReturnValueOnce([false, vi.fn()]) // isLoading
        .mockReturnValueOnce([[], vi.fn()]); // opcionalSelected

      vi.mocked(ResultadosTemplate).mockImplementation(({ personType, children }) => (
        <div data-testid="mock-resultados-template">
          <span data-testid="person-type-display">{personType}</span>
          {children}
        </div>
      ));

      render(<RelatorioGoldPage />);

      // Assert
      expect(screen.getByTestId('person-type-display')).toHaveTextContent('juridica');
    });
  });

  describe('When document is passed to ResultadosTemplate', () => {
    it('then should receive correct document prop', () => {
      // Arrange
      const testDocument = '12345678901';
      
      vi.mocked(useState)
        .mockReturnValueOnce(['fisica', vi.fn()]) // personType
        .mockReturnValueOnce([testDocument, vi.fn()]) // documentState
        .mockReturnValueOnce([false, vi.fn()]) // newConsultation
        .mockReturnValueOnce([true, vi.fn()]) // showResults
        .mockReturnValueOnce([false, vi.fn()]) // isLoading
        .mockReturnValueOnce([[], vi.fn()]); // opcionalSelected

      vi.mocked(ResultadosTemplate).mockImplementation(({ document, children }) => (
        <div data-testid="mock-resultados-template">
          <span data-testid="document-display">{document}</span>
          {children}
        </div>
      ));

      render(<RelatorioGoldPage />);

      // Assert
      expect(screen.getByTestId('document-display')).toHaveTextContent(testDocument);
    });
  });

  describe('When newConsultation change handler is called', () => {
    it('then should update newConsultation state', () => {
      // Arrange
      const mockSetNewConsultation = vi.fn();
      
      vi.mocked(useState)
        .mockReturnValueOnce(['fisica', vi.fn()]) // personType
        .mockReturnValueOnce(['', vi.fn()]) // documentState
        .mockReturnValueOnce([false, mockSetNewConsultation]) // newConsultation
        .mockReturnValue([null, vi.fn()]); // outros estados

      vi.mocked(FormularioConsulta).mockImplementation(({ onNewConsultationChange }) => (
        <div data-testid="mock-form-consulta">
          <button 
            onClick={() => onNewConsultationChange(true)} 
            data-testid="mock-new-consultation-button"
          >
            Nova Consulta
          </button>
        </div>
      ));

      render(<RelatorioGoldPage />);

      // Act
      fireEvent.click(screen.getByTestId('mock-new-consultation-button'));

      // Assert
      expect(mockSetNewConsultation).toHaveBeenCalledWith(true);
    });
  });

  describe('When opcionalSelected state changes', () => {
    it('then should update opcionalSelected state correctly', () => {
      // Arrange
      const mockSetOpcionalSelected = vi.fn();
      
      vi.mocked(useState)
        .mockReturnValueOnce(['fisica', vi.fn()]) // personType
        .mockReturnValueOnce(['', vi.fn()]) // documentState
        .mockReturnValueOnce([false, vi.fn()]) // newConsultation
        .mockReturnValueOnce([false, vi.fn()]) // showResults
        .mockReturnValueOnce([false, vi.fn()]) // isLoading
        .mockReturnValueOnce([[], mockSetOpcionalSelected]); // opcionalSelected

      vi.mocked(CardOptionalData).mockImplementation(({ setOpcionalSelected }) => (
        <div data-testid="mock-card-optional-data">
          <button 
            onClick={() => setOpcionalSelected(['cadin'])} 
            data-testid="mock-opcional-button"
          >
            Select Optional
          </button>
        </div>
      ));

      render(<RelatorioGoldPage />);

      // Act
      fireEvent.click(screen.getByTestId('mock-opcional-button'));

      // Assert
      expect(mockSetOpcionalSelected).toHaveBeenCalledWith(['cadin']);
    });
  });

  describe('When RatingProvider wraps the component', () => {
    it('then should render RatingProvider context', () => {
      render(<RelatorioGoldPage />);

      // Assert
      expect(screen.getByTestId('mock-rating-provider')).toBeInTheDocument();
    });
  });

  describe('When all data-testid attributes are present', () => {
    it('then should have all required test identifiers', () => {
      render(<RelatorioGoldPage />);

      // Assert
      expect(screen.getByTestId('consulta-page')).toBeInTheDocument();
      expect(screen.getByTestId('page-header')).toBeInTheDocument();
      expect(screen.getByTestId('page-title')).toBeInTheDocument();
      expect(screen.getByTestId('warning-message')).toBeInTheDocument();
      expect(screen.getByTestId('form-container')).toBeInTheDocument();
    });
  });

  describe('When document has only whitespace', () => {
    it('then should not call setIsLoading when submitted', () => {
      // Arrange
      const mockSetIsLoading = vi.fn();
      
      vi.mocked(useState)
        .mockReturnValueOnce(['fisica', vi.fn()]) // personType
        .mockReturnValueOnce(['   \n   ', vi.fn()]) // documentState with whitespace and newlines
        .mockReturnValueOnce([false, vi.fn()]) // newConsultation
        .mockReturnValueOnce([false, vi.fn()]) // showResults
        .mockReturnValueOnce([false, mockSetIsLoading]) // isLoading
        .mockReturnValueOnce([[], vi.fn()]); // opcionalSelected

      // Resetar o mock para incluir o botão
      vi.mocked(FormularioConsulta).mockImplementation(({ onSubmit }) => (
        <div data-testid="mock-form-consulta">
          <button onClick={onSubmit} data-testid="mock-submit-button">
            Consultar
          </button>
        </div>
      ));

      render(<RelatorioGoldPage />);

      // Act
      fireEvent.click(screen.getByTestId('mock-submit-button'));

      // Assert
      expect(mockSetIsLoading).not.toHaveBeenCalled();
    });
  });

  describe('When document is valid but validateDocument returns false', () => {
    it('then should not proceed with submission', () => {
      // Arrange
      const mockSetIsLoading = vi.fn();
      
      vi.mocked(useState)
        .mockReturnValueOnce(['fisica', vi.fn()]) // personType
        .mockReturnValueOnce(['12345678901', vi.fn()]) // documentState
        .mockReturnValueOnce([false, vi.fn()]) // newConsultation
        .mockReturnValueOnce([false, vi.fn()]) // showResults
        .mockReturnValueOnce([false, mockSetIsLoading]) // isLoading
        .mockReturnValueOnce([[], vi.fn()]); // opcionalSelected

      vi.mocked(validateDocument).mockReturnValue(false);

      // Resetar o mock para incluir o botão
      vi.mocked(FormularioConsulta).mockImplementation(({ onSubmit }) => (
        <div data-testid="mock-form-consulta">
          <button onClick={onSubmit} data-testid="mock-submit-button">
            Consultar
          </button>
        </div>
      ));

      render(<RelatorioGoldPage />);

      // Act
      fireEvent.click(screen.getByTestId('mock-submit-button'));

      // Assert
      expect(validateDocument).toHaveBeenCalledWith('12345678901');
      expect(mockSetIsLoading).not.toHaveBeenCalled();
    });
  });

  describe('When both document.trim() and validateDocument conditions are met', () => {
    it('then should call setIsLoading with true', () => {
      // Arrange
      const mockSetIsLoading = vi.fn();
      
      vi.mocked(useState)
        .mockReturnValueOnce(['fisica', vi.fn()]) // personType
        .mockReturnValueOnce(['  12345678901  ', vi.fn()]) // documentState with surrounding whitespace
        .mockReturnValueOnce([false, vi.fn()]) // newConsultation
        .mockReturnValueOnce([false, vi.fn()]) // showResults
        .mockReturnValueOnce([false, mockSetIsLoading]) // isLoading
        .mockReturnValueOnce([[], vi.fn()]); // opcionalSelected

      vi.mocked(validateDocument).mockReturnValue(true);

      // Resetar o mock para incluir o botão
      vi.mocked(FormularioConsulta).mockImplementation(({ onSubmit }) => (
        <div data-testid="mock-form-consulta">
          <button onClick={onSubmit} data-testid="mock-submit-button">
            Consultar
          </button>
        </div>
      ));

      render(<RelatorioGoldPage />);

      // Act
      fireEvent.click(screen.getByTestId('mock-submit-button'));

      // Assert
      expect(validateDocument).toHaveBeenCalledWith('  12345678901  ');
      expect(mockSetIsLoading).toHaveBeenCalledWith(true);
    });
  });

  describe('When component renders with different initial states', () => {
    it('then should handle personType as juridica initially', () => {
      // Arrange
      vi.mocked(useState)
        .mockReturnValueOnce(['juridica', vi.fn()]) // personType
        .mockReturnValueOnce(['', vi.fn()]) // documentState
        .mockReturnValueOnce([false, vi.fn()]) // newConsultation
        .mockReturnValueOnce([false, vi.fn()]) // showResults
        .mockReturnValueOnce([false, vi.fn()]) // isLoading
        .mockReturnValueOnce([[], vi.fn()]); // opcionalSelected

      vi.mocked(FormularioConsulta).mockImplementation(({ personType }) => (
        <div data-testid="mock-form-consulta">
          <span data-testid="person-type-value">{personType}</span>
        </div>
      ));

      render(<RelatorioGoldPage />);

      // Assert
      expect(screen.getByTestId('person-type-value')).toHaveTextContent('juridica');
    });
  });

  describe('When component renders with newConsultation as true', () => {
    it('then should pass newConsultation true to FormularioConsulta', () => {
      // Arrange
      vi.mocked(useState)
        .mockReturnValueOnce(['fisica', vi.fn()]) // personType
        .mockReturnValueOnce(['', vi.fn()]) // documentState
        .mockReturnValueOnce([true, vi.fn()]) // newConsultation
        .mockReturnValueOnce([false, vi.fn()]) // showResults
        .mockReturnValueOnce([false, vi.fn()]) // isLoading
        .mockReturnValueOnce([[], vi.fn()]); // opcionalSelected

      vi.mocked(FormularioConsulta).mockImplementation(({ newConsultation }) => (
        <div data-testid="mock-form-consulta">
          <span data-testid="new-consultation-value">{newConsultation.toString()}</span>
        </div>
      ));

      render(<RelatorioGoldPage />);

      // Assert
      expect(screen.getByTestId('new-consultation-value')).toHaveTextContent('true');
    });
  });

  describe('When component renders with opcionalSelected having values', () => {
    it('then should pass opcionalSelected array to CardOptionalData', () => {
      // Arrange
      const testOpcionalSelected = ['cadin', 'obito'];
      
      vi.mocked(useState)
        .mockReturnValueOnce(['fisica', vi.fn()]) // personType
        .mockReturnValueOnce(['', vi.fn()]) // documentState
        .mockReturnValueOnce([false, vi.fn()]) // newConsultation
        .mockReturnValueOnce([false, vi.fn()]) // showResults
        .mockReturnValueOnce([false, vi.fn()]) // isLoading
        .mockReturnValueOnce([testOpcionalSelected, vi.fn()]); // opcionalSelected

      vi.mocked(CardOptionalData).mockImplementation(({ opcionalSelected }) => (
        <div data-testid="mock-card-optional-data">
          <span data-testid="opcional-selected-value">{JSON.stringify(opcionalSelected)}</span>
        </div>
      ));

      render(<RelatorioGoldPage />);

      // Assert
      expect(screen.getByTestId('opcional-selected-value')).toHaveTextContent('["cadin","obito"]');
    });
  });
});
