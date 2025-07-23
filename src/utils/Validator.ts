import { cpf, cnpj } from 'cpf-cnpj-validator';
import * as z from "zod";

// Schema para validar CPF
export const cpfSchema = z
  .string()
  .min(1, "CPF é obrigatório")
  .refine((value) => {
    // Remove formatação (pontos, hífens, espaços)
    const cleanValue = value.replace(/[^\d]/g, '');
    
    // Verifica se tem exatamente 11 dígitos
    if (cleanValue.length !== 11) {
      return false;
    }
    
    // Verifica se não são todos os dígitos iguais (ex: 111.111.111-11)
    if (/^(\d)\1{10}$/.test(cleanValue)) {
      return false;
    }
    
    // Valida usando a biblioteca cpf-cnpj-validator
    return cpf.isValid(cleanValue);
  }, {
    message: "CPF inválido"
  });

// Schema para validar CNPJ
export const cnpjSchema = z
  .string()
  .min(1, "CNPJ é obrigatório")
  .refine((value) => {
    // Remove formatação (pontos, hífens, barras, espaços)
    const cleanValue = value.replace(/[^\d]/g, '');
    
    // Verifica se tem exatamente 14 dígitos
    if (cleanValue.length !== 14) {
      return false;
    }
    
    // Verifica se não são todos os dígitos iguais (ex: 11.111.111/1111-11)
    if (/^(\d)\1{13}$/.test(cleanValue)) {
      return false;
    }
    
    // Valida usando a biblioteca cpf-cnpj-validator
    return cnpj.isValid(cleanValue);
  }, {
    message: "CNPJ inválido"
  });

// Schema que aceita tanto CPF quanto CNPJ
export const documentSchema = z
  .string()
  .min(1, "Documento é obrigatório")
  .refine((value) => {
    const cleanValue = value.replace(/[^\d]/g, '');
    
    // Verifica se é CPF (11 dígitos) ou CNPJ (14 dígitos)
    if (cleanValue.length === 11) {
      // Verifica CPF
      if (/^(\d)\1{10}$/.test(cleanValue)) {
        return false;
      }
      return cpf.isValid(cleanValue);
    } else if (cleanValue.length === 14) {
      // Verifica CNPJ
      if (/^(\d)\1{13}$/.test(cleanValue)) {
        return false;
      }
      return cnpj.isValid(cleanValue);
    }
    
    return false;
  }, {
    message: "CPF ou CNPJ inválido"
  });

// Função utilitária para validar CPF
export const validateCPF = (cpfValue: string): boolean => {
  try {
    cpfSchema.parse(cpfValue);
    return true;
  } catch {
    return false;
  }
};

// Função utilitária para validar CNPJ
export const validateCNPJ = (cnpjValue: string): boolean => {
  try {
    cnpjSchema.parse(cnpjValue);
    return true;
  } catch {
    return false;
  }
};

// Função utilitária para validar documento (CPF ou CNPJ)
export const validateDocument = (documentValue: string): boolean => {
  try {
    documentSchema.parse(documentValue);
    return true;
  } catch {
    return false;
  }
};

// Função para obter o tipo de documento
export const getDocumentType = (documentValue: string): 'cpf' | 'cnpj' | 'invalid' => {
  const cleanValue = documentValue.replace(/[^\d]/g, '');
  
  if (cleanValue.length === 11 && validateCPF(documentValue)) {
    return 'cpf';
  } else if (cleanValue.length === 14 && validateCNPJ(documentValue)) {
    return 'cnpj';
  }
  
  return 'invalid';
};

// Função para obter mensagem de erro detalhada
export const getDocumentValidationError = (documentValue: string): string | null => {
  try {
    documentSchema.parse(documentValue);
    return null;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.errors[0]?.message || "Documento inválido";
    }
    return "Erro na validação do documento";
  }
};

// Funções de formatação para diferentes tipos de campos

// Formatar telefone: (11) 99999-9999 ou (11) 9999-9999
export const formatPhone = (value: string): string => {
  const numbers = value.replace(/\D/g, '');
  
  if (numbers.length <= 2) {
    return numbers;
  } else if (numbers.length <= 3) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  } else if (numbers.length <= 7) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 3)} ${numbers.slice(3)}`;
  } else if (numbers.length <= 11) {
    if (numbers.length === 10) {
      // Telefone fixo: (11) 9999-9999
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6, 10)}`;
    } else {
      // Celular: (11) 99999-9999
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
    }
  }
  
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
};

// Formatar CEP: 12345-678
export const formatCEP = (value: string): string => {
  const numbers = value.replace(/\D/g, '');
  
  if (numbers.length <= 5) {
    return numbers;
  }
  
  return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
};

// Formatar CPF: 123.456.789-01
export const formatCPF = (value: string): string => {
  const numbers = value.replace(/\D/g, '');
  
  if (numbers.length <= 3) {
    return numbers;
  } else if (numbers.length <= 6) {
    return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
  } else if (numbers.length <= 9) {
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;
  }
  
  return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`;
};

// Formatar CNPJ: 12.345.678/0001-90
export const formatCNPJ = (value: string): string => {
  const numbers = value.replace(/\D/g, '');
  
  if (numbers.length <= 2) {
    return numbers;
  } else if (numbers.length <= 5) {
    return `${numbers.slice(0, 2)}.${numbers.slice(2)}`;
  } else if (numbers.length <= 8) {
    return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5)}`;
  } else if (numbers.length <= 12) {
    return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8)}`;
  }
  
  return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8, 12)}-${numbers.slice(12, 14)}`;
};

// Validar formato de telefone
export const validatePhone = (value: string): boolean => {
  const numbers = value.replace(/\D/g, '');
  return numbers.length === 10 || numbers.length === 11;
};

// Validar formato de CEP
export const validateCEPFormat = (value: string): boolean => {
  const numbers = value.replace(/\D/g, '');
  return numbers.length === 8;
};

// Validar email
export const validateEmail = (email: string): boolean => {
  // Verificações básicas
  if (!email || email.trim() === '') return false;
  if (email.includes('..')) return false; // Pontos consecutivos não são permitidos
  if (email.startsWith('.') || email.endsWith('.')) return false; // Não pode começar ou terminar com ponto
  if (email.includes('@.') || email.includes('.@')) return false; // Ponto imediatamente antes ou depois do @
  
  // Regex mais flexível que permite caracteres comuns em emails
  const emailRegex = /^[a-zA-Z0-9]([a-zA-Z0-9._+-]*[a-zA-Z0-9])?@[a-zA-Z0-9]([a-zA-Z0-9.-]*[a-zA-Z0-9])?\.[a-zA-Z]{2,}$/;
  
  return emailRegex.test(email);
};

// Função para aplicar formatação baseada no tipo de campo
export const applyFieldFormat = (value: string, fieldType: 'phone' | 'cep' | 'cpf' | 'cnpj' | 'email'): string => {
  switch (fieldType) {
    case 'phone':
      return formatPhone(value);
    case 'cep':
      return formatCEP(value);
    case 'cpf':
      return formatCPF(value);
    case 'cnpj':
      return formatCNPJ(value);
    case 'email':
      return value.toLowerCase().trim();
    default:
      return value;
  }
};

// Função para validar campo baseado no tipo
export const validateField = (value: string, fieldType: 'phone' | 'cep' | 'cpf' | 'cnpj' | 'email'): { isValid: boolean; message: string } => {
  if (!value.trim()) {
    return { isValid: false, message: 'Campo obrigatório' };
  }

  switch (fieldType) {
    case 'phone':
      return { 
        isValid: validatePhone(value), 
        message: validatePhone(value) ? '' : 'Telefone deve ter 10 ou 11 dígitos' 
      };
    case 'cep':
      return { 
        isValid: validateCEPFormat(value), 
        message: validateCEPFormat(value) ? '' : 'CEP deve ter 8 dígitos' 
      };
    case 'cpf':
      return { 
        isValid: validateCPF(value), 
        message: validateCPF(value) ? '' : 'CPF inválido' 
      };
    case 'cnpj':
      return { 
        isValid: validateCNPJ(value), 
        message: validateCNPJ(value) ? '' : 'CNPJ inválido' 
      };
    case 'email':
      return { 
        isValid: validateEmail(value), 
        message: validateEmail(value) ? '' : 'Email inválido' 
      };
    default:
      return { isValid: true, message: '' };
  }
};


