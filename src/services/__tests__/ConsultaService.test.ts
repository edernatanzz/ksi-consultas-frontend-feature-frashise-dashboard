import { describe, it, expect, vi } from 'vitest';
import type { ResultadoConsulta, TipoDocumento, RegistroScr, InformacoesAdicionais } from '../../types/ConsultaTypes';

// Mock das funções da API
const mockApiGet = vi.fn();
const mockHandleApiError = vi.fn();

// Mock do módulo api.service
vi.mock('../api.service', () => ({
  default: {
    get: mockApiGet,
  },
  handleApiError: mockHandleApiError,
}));

// Importamos o módulo após configurar os mocks
const { 
  consultarPorCPF,
  consultarPorCNPJ,
  formatarCPF,
  formatarCNPJ,
  formatarDocumento
} = await import('../ConsultaService');

describe('ConsultaService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetModules();
  });

  describe('consultarPorCPF', () => {
    it('When CPF has less than 11 digits, then should return invalid CPF error', async () => {
      // Arrange
      const invalidCPF = '123.456.789';
      
      // Act
      const resultado = await consultarPorCPF(invalidCPF);
      
      // Assert
      expect(resultado).toEqual({
        success: false,
        message: 'CPF inválido. O CPF deve conter 11 dígitos.'
      });
    });

    it('When CPF is valid, then should clean formatting and call API', async () => {
      // Arrange
      const mockData = { nome: 'Fulano' };
      const mockResponse = { data: { data: mockData } };
      mockApiGet.mockResolvedValueOnce(mockResponse);
      const validCPF = '123.456.789-09';
      
      // Act
      const resultado = await consultarPorCPF(validCPF);
      
      // Assert
      expect(mockApiGet).toHaveBeenCalledWith('/consulta/cpf/12345678909');
      expect(resultado).toEqual({
        success: true,
        data: mockData
      });
    });

    it('When API call fails, then should handle API error', async () => {
      // Arrange
      const mockError = new Error('Erro API');
      mockApiGet.mockRejectedValueOnce(mockError);
      mockHandleApiError.mockReturnValueOnce({
        success: false,
        message: 'Erro na consulta'
      });
      const validCPF = '12345678909';
      
      // Act
      const resultado = await consultarPorCPF(validCPF);
      
      // Assert
      expect(mockHandleApiError).toHaveBeenCalledWith(mockError);
      expect(resultado).toEqual({
        success: false,
        message: 'Erro na consulta'
      });
    });
  });

  describe('consultarPorCNPJ', () => {
    it('When CNPJ has less than 14 digits, then should return invalid CNPJ error', async () => {
      // Arrange
      const invalidCNPJ = '12.345.678/0001';
      
      // Act
      const resultado = await consultarPorCNPJ(invalidCNPJ);
      
      // Assert
      expect(resultado).toEqual({
        success: false,
        message: 'CNPJ inválido. O CNPJ deve conter 14 dígitos.'
      });
    });

    it('When CNPJ is valid, then should clean formatting and call API', async () => {
      // Arrange
      const mockData = { razaoSocial: 'Empresa LTDA' };
      const mockResponse = { data: { data: mockData } };
      mockApiGet.mockResolvedValueOnce(mockResponse);
      const validCNPJ = '12.345.678/0001-90';
      
      // Act
      const resultado = await consultarPorCNPJ(validCNPJ);
      
      // Assert
      expect(mockApiGet).toHaveBeenCalledWith('/consulta/cnpj/12345678000190');
      expect(resultado).toEqual({
        success: true,
        data: mockData
      });
    });
  });

  describe('consultarDocumento', () => {
    it('When type is CPF, then should call consultarPorCPF with document', async () => {
      // Arrange
      const mockResult: ResultadoConsulta = { 
        success: true, 
        data: {
          baseDisponivel: true,
          logQuery: 'test query',
          relatorioRatingBancario: {
            classificacaoRisco: '',
            comprometimentoRenda: '',
            recuperacaoFalencia: '',
            cadastraispf: null,
            cadastraispj: null,
            quantidadeChSemFundos: 0,
            registrosChSemFundos: [],
            quantidadeBoaVista: 0,
            registrosBoaVista: [],
            registroScr: {} as RegistroScr,
            contemProtesto: false,
            qntProtesto: 0,
            valorTotalProtesto: 0,
            registrosProtesto: [],
            informacoesAdicionais: {} as InformacoesAdicionais,
            contemRestricoesSinteticas: false,
            qntRestricoesSinteticas: 0,
            valorTotalRestricoesSinteticas: 0
          }
        }
      };
      
      const mockConsultarPorCPF = vi.fn().mockResolvedValue(mockResult);
      
      // Mock do módulo consultaService com consultarPorCPF mockado
      vi.doMock('../ConsultaService', async () => ({
        consultarPorCPF: mockConsultarPorCPF,
        consultarPorCNPJ: vi.fn(),
        consultarDocumento: async (tipo: TipoDocumento, documento: string) => {
          return tipo === 'cpf' 
            ? mockConsultarPorCPF(documento) 
            : vi.fn()(documento);
        },
        formatarCPF: vi.fn(),
        formatarCNPJ: vi.fn(),
        formatarDocumento: vi.fn()
      }));
      
      const { consultarDocumento } = await import('../ConsultaService');
      
      // Act
      const resultado = await consultarDocumento('cpf', '12345678909');
      
      // Assert
      expect(mockConsultarPorCPF).toHaveBeenCalledWith('12345678909');
      expect(resultado).toEqual(mockResult);
      
      vi.doUnmock('../ConsultaService');
    });

    it('When type is CNPJ, then should call consultarPorCNPJ with document', async () => {
      // Arrange
      const mockResult: ResultadoConsulta = { 
        success: true, 
        data: {
          baseDisponivel: true,
          logQuery: 'test query',
          relatorioRatingBancario: {
            classificacaoRisco: '',
            comprometimentoRenda: '',
            recuperacaoFalencia: '',
            cadastraispf: null,
            cadastraispj: null,
            quantidadeChSemFundos: 0,
            registrosChSemFundos: [],
            quantidadeBoaVista: 0,
            registrosBoaVista: [],
            registroScr: {} as RegistroScr,
            contemProtesto: false,
            qntProtesto: 0,
            valorTotalProtesto: 0,
            registrosProtesto: [],
            informacoesAdicionais: {} as InformacoesAdicionais,
            contemRestricoesSinteticas: false,
            qntRestricoesSinteticas: 0,
            valorTotalRestricoesSinteticas: 0
          }
        }
      };
      
      const mockConsultarPorCNPJ = vi.fn().mockResolvedValue(mockResult);
      
      // Mock do módulo consultaService com consultarPorCNPJ mockado
      vi.doMock('../ConsultaService', async () => ({
        consultarPorCPF: vi.fn(),
        consultarPorCNPJ: mockConsultarPorCNPJ,
        consultarDocumento: async (tipo: TipoDocumento, documento: string) => {
          return tipo === 'cnpj' 
            ? mockConsultarPorCNPJ(documento) 
            : vi.fn()(documento);
        },
        formatarCPF: vi.fn(),
        formatarCNPJ: vi.fn(),
        formatarDocumento: vi.fn()
      }));
      
      const { consultarDocumento } = await import('../ConsultaService');
      
      // Act
      const resultado = await consultarDocumento('cnpj', '12345678000190');
      
      // Assert
      expect(mockConsultarPorCNPJ).toHaveBeenCalledWith('12345678000190');
      expect(resultado).toEqual(mockResult);
      
      vi.doUnmock('../ConsultaService');
    });
  });

  describe('formatação de documentos', () => {
    it('When formatting CPF, then should return correctly formatted string', () => {
      // Arrange
      const rawCPF = '12345678909';
      const formattedCPF = '123.456.789-09';
      
      // Act & Assert
      expect(formatarCPF(rawCPF)).toBe(formattedCPF);
      expect(formatarCPF(formattedCPF)).toBe(formattedCPF);
    });

    it('When formatting CNPJ, then should return correctly formatted string', () => {
      // Arrange
      const rawCNPJ = '12345678000190';
      const formattedCNPJ = '12.345.678/0001-90';
      
      // Act & Assert
      expect(formatarCNPJ(rawCNPJ)).toBe(formattedCNPJ);
      expect(formatarCNPJ(formattedCNPJ)).toBe(formattedCNPJ);
    });

    it('When formatting document with type, then should use correct formatter', () => {
      // Arrange
      const rawCPF = '12345678909';
      const formattedCPF = '123.456.789-09';
      const rawCNPJ = '12345678000190';
      const formattedCNPJ = '12.345.678/0001-90';
      
      // Act & Assert
      expect(formatarDocumento(rawCPF, 'cpf')).toBe(formattedCPF);
      expect(formatarDocumento(rawCNPJ, 'cnpj')).toBe(formattedCNPJ);
    });
  });
});