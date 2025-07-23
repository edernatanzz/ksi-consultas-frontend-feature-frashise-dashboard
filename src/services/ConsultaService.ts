
import { ResultadoConsulta, TipoDocumento } from '../types/ConsultaTypes';
import api, { handleApiError } from './api.service';


export const consultarPorCPF = async (cpf: string): Promise<ResultadoConsulta> => {
  try {
    const cpfLimpo = cpf.replace(/[^\d]/g, '');
    if (cpfLimpo.length !== 11) {
      return { 
        success: false, 
        message: 'CPF inválido. O CPF deve conter 11 dígitos.' 
      };
    }
    const response = await api.get(`/consulta/cpf/${cpfLimpo}`);
    return {
      success: true,
      data: response.data.data
    };
  } catch (error) {
    return handleApiError(error);
  }
};


export const consultarPorCNPJ = async (cnpj: string): Promise<ResultadoConsulta> => {
  try {
    const cnpjLimpo = cnpj.replace(/[^\d]/g, '');
    if (cnpjLimpo.length !== 14) {
      return {
        success: false,
        message: 'CNPJ inválido. O CNPJ deve conter 14 dígitos.' 
      };
    }
    const response = await api.get(`/consulta/cnpj/${cnpjLimpo}`);
    return {
      success: true,
      data: response.data.data
    };
  } catch (error) {
    return handleApiError(error);
  }
};

export const consultarDocumento = async (
  tipo: TipoDocumento, 
  documento: string
): Promise<ResultadoConsulta> => {
  return tipo === 'cpf' 
    ? consultarPorCPF(documento) 
    : consultarPorCNPJ(documento);
};

export const formatarCPF = (cpf: string): string => {
  const cpfLimpo = cpf.replace(/[^\d]/g, '');
  return cpfLimpo.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

export const formatarCNPJ = (cnpj: string): string => {
  const cnpjLimpo = cnpj.replace(/[^\d]/g, '');
  return cnpjLimpo.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
};

export const formatarDocumento = (documento: string, tipo: TipoDocumento): string => {
  return tipo === 'cpf' ? formatarCPF(documento) : formatarCNPJ(documento);
};