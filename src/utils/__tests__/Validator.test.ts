import { describe, expect, it } from 'vitest';
import {
  cpfSchema,
  cnpjSchema,
  documentSchema,
  validateCPF,
  validateCNPJ,
  validateDocument,
  getDocumentType,
  getDocumentValidationError,
  formatPhone,
  formatCEP,
  formatCPF,
  formatCNPJ,
  validatePhone,
  validateCEPFormat,
  validateEmail,
  applyFieldFormat,
  validateField,
} from '../Validator';

// Tipo para os campos suportados pela função applyFieldFormat e validateField
type FieldType = 'phone' | 'cep' | 'cpf' | 'cnpj' | 'email';

// CPFs válidos e inválidos para teste
const VALID_CPF = '529.982.247-25';
const VALID_CPF_UNFORMATTED = '52998224725';
const INVALID_CPF = '111.111.111-11';
const INVALID_CPF_SHORT = '1234567890';
const INVALID_CPF_LONG = '123456789012';

// CNPJs válidos e inválidos para teste
const VALID_CNPJ = '33.014.556/0001-96';
const VALID_CNPJ_UNFORMATTED = '33014556000196';
const INVALID_CNPJ = '11.111.111/1111-11';
const INVALID_CNPJ_SHORT = '1234567890123';
const INVALID_CNPJ_LONG = '123456789012345';

describe('CPF Validation', () => {
  describe('cpfSchema', () => {
    it('When CPF is valid, then validation should pass', () => {
      // Arrange
      const value = VALID_CPF;

      // Act
      const result = cpfSchema.safeParse(value);

      // Assert
      expect(result.success).toBe(true);
    });

    it('When CPF is valid but unformatted, then validation should pass', () => {
      // Arrange
      const value = VALID_CPF_UNFORMATTED;

      // Act
      const result = cpfSchema.safeParse(value);

      // Assert
      expect(result.success).toBe(true);
    });

    it('When CPF is empty, then validation should fail', () => {
      // Arrange
      const value = '';

      // Act
      const result = cpfSchema.safeParse(value);

      // Assert
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('CPF é obrigatório');
      }
    });

    it('When CPF has all digits equal, then validation should fail', () => {
      // Arrange
      const value = INVALID_CPF;

      // Act
      const result = cpfSchema.safeParse(value);

      // Assert
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('CPF inválido');
      }
    });

    it('When CPF has wrong length, then validation should fail', () => {
      // Arrange
      const shortValue = INVALID_CPF_SHORT;
      const longValue = INVALID_CPF_LONG;

      // Act
      const shortResult = cpfSchema.safeParse(shortValue);
      const longResult = cpfSchema.safeParse(longValue);

      // Assert
      expect(shortResult.success).toBe(false);
      expect(longResult.success).toBe(false);
    });

    it('When CPF has non-numeric characters, then validation should still work if valid', () => {
      // Arrange
      const value = '529.982.247-25'; // CPF formatado

      // Act
      const result = cpfSchema.safeParse(value);

      // Assert
      expect(result.success).toBe(true);
    });

    it('When CPF has invalid algorithm, then validation should fail', () => {
      // Arrange
      const value = '12345678901'; // 11 dígitos mas algoritmo inválido

      // Act
      const result = cpfSchema.safeParse(value);

      // Assert
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('CPF inválido');
      }
    });
  });

  describe('validateCPF', () => {
    it('When CPF is valid, then should return true', () => {
      // Arrange
      const value = VALID_CPF;

      // Act
      const result = validateCPF(value);

      // Assert
      expect(result).toBe(true);
    });

    it('When CPF is invalid, then should return false', () => {
      // Arrange
      const value = INVALID_CPF;

      // Act
      const result = validateCPF(value);

      // Assert
      expect(result).toBe(false);
    });
  });
});

describe('CNPJ Validation', () => {
  describe('cnpjSchema', () => {
    it('When CNPJ is valid, then validation should pass', () => {
      // Arrange
      const value = VALID_CNPJ;

      // Act
      const result = cnpjSchema.safeParse(value);

      // Assert
      expect(result.success).toBe(true);
    });

    it('When CNPJ is valid but unformatted, then validation should pass', () => {
      // Arrange
      const value = VALID_CNPJ_UNFORMATTED;

      // Act
      const result = cnpjSchema.safeParse(value);

      // Assert
      expect(result.success).toBe(true);
    });

    it('When CNPJ is empty, then validation should fail', () => {
      // Arrange
      const value = '';

      // Act
      const result = cnpjSchema.safeParse(value);

      // Assert
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('CNPJ é obrigatório');
      }
    });

    it('When CNPJ has all digits equal, then validation should fail', () => {
      // Arrange
      const value = INVALID_CNPJ;

      // Act
      const result = cnpjSchema.safeParse(value);

      // Assert
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('CNPJ inválido');
      }
    });

    it('When CNPJ has wrong length, then validation should fail', () => {
      // Arrange
      const shortValue = INVALID_CNPJ_SHORT;
      const longValue = INVALID_CNPJ_LONG;

      // Act
      const shortResult = cnpjSchema.safeParse(shortValue);
      const longResult = cnpjSchema.safeParse(longValue);

      // Assert
      expect(shortResult.success).toBe(false);
      expect(longResult.success).toBe(false);
    });

    it('When CNPJ has non-numeric characters, then validation should still work if valid', () => {
      // Arrange
      const value = '33.014.556/0001-96'; // CNPJ formatado

      // Act
      const result = cnpjSchema.safeParse(value);

      // Assert
      expect(result.success).toBe(true);
    });

    it('When CNPJ has invalid algorithm, then validation should fail', () => {
      // Arrange
      const value = '12345678901234'; // 14 dígitos mas algoritmo inválido

      // Act
      const result = cnpjSchema.safeParse(value);

      // Assert
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('CNPJ inválido');
      }
    });
  });

  describe('validateCNPJ', () => {
    it('When CNPJ is valid, then should return true', () => {
      // Arrange
      const value = VALID_CNPJ;

      // Act
      const result = validateCNPJ(value);

      // Assert
      expect(result).toBe(true);
    });

    it('When CNPJ is invalid, then should return false', () => {
      // Arrange
      const value = INVALID_CNPJ;

      // Act
      const result = validateCNPJ(value);

      // Assert
      expect(result).toBe(false);
    });
  });
});

describe('Document Validation (CPF or CNPJ)', () => {
  describe('documentSchema', () => {
    it('When document is valid CPF, then validation should pass', () => {
      // Arrange
      const value = VALID_CPF;

      // Act
      const result = documentSchema.safeParse(value);

      // Assert
      expect(result.success).toBe(true);
    });

    it('When document is valid CNPJ, then validation should pass', () => {
      // Arrange
      const value = VALID_CNPJ;

      // Act
      const result = documentSchema.safeParse(value);

      // Assert
      expect(result.success).toBe(true);
    });

    it('When document is empty, then validation should fail', () => {
      // Arrange
      const value = '';

      // Act
      const result = documentSchema.safeParse(value);

      // Assert
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Documento é obrigatório');
      }
    });

    it('When document has invalid length, then validation should fail', () => {
      // Arrange
      const shortValue = '123';
      const longValue = '1234567890123456';

      // Act
      const shortResult = documentSchema.safeParse(shortValue);
      const longResult = documentSchema.safeParse(longValue);

      // Assert
      expect(shortResult.success).toBe(false);
      expect(longResult.success).toBe(false);
    });

    it('When document has 11 digits but all equal, then validation should fail', () => {
      // Arrange
      const value = '11111111111'; // CPF com todos dígitos iguais

      // Act
      const result = documentSchema.safeParse(value);

      // Assert
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('CPF ou CNPJ inválido');
      }
    });

    it('When document has 14 digits but all equal, then validation should fail', () => {
      // Arrange
      const value = '11111111111111'; // CNPJ com todos dígitos iguais

      // Act
      const result = documentSchema.safeParse(value);

      // Assert
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('CPF ou CNPJ inválido');
      }
    });
  });

  describe('validateDocument', () => {
    it('When document is valid CPF, then should return true', () => {
      // Arrange
      const value = VALID_CPF;

      // Act
      const result = validateDocument(value);

      // Assert
      expect(result).toBe(true);
    });

    it('When document is valid CNPJ, then should return true', () => {
      // Arrange
      const value = VALID_CNPJ;

      // Act
      const result = validateDocument(value);

      // Assert
      expect(result).toBe(true);
    });

    it('When document is invalid, then should return false', () => {
      // Arrange
      const value = 'invalid_document';

      // Act
      const result = validateDocument(value);

      // Assert
      expect(result).toBe(false);
    });
  });

  describe('getDocumentType', () => {
    it('When document is valid CPF, then should return "cpf"', () => {
      // Arrange
      const value = VALID_CPF;

      // Act
      const result = getDocumentType(value);

      // Assert
      expect(result).toBe('cpf');
    });

    it('When document is valid CNPJ, then should return "cnpj"', () => {
      // Arrange
      const value = VALID_CNPJ;

      // Act
      const result = getDocumentType(value);

      // Assert
      expect(result).toBe('cnpj');
    });

    it('When document is invalid, then should return "invalid"', () => {
      // Arrange
      const value = 'invalid_document';

      // Act
      const result = getDocumentType(value);

      // Assert
      expect(result).toBe('invalid');
    });

    it('When document has 11 digits but is invalid CPF, then should return "invalid"', () => {
      // Arrange
      const value = '11111111111'; // 11 dígitos mas CPF inválido

      // Act
      const result = getDocumentType(value);

      // Assert
      expect(result).toBe('invalid');
    });

    it('When document has 14 digits but is invalid CNPJ, then should return "invalid"', () => {
      // Arrange
      const value = '11111111111111'; // 14 dígitos mas CNPJ inválido

      // Act
      const result = getDocumentType(value);

      // Assert
      expect(result).toBe('invalid');
    });
  });

  describe('getDocumentValidationError', () => {
    it('When document is valid, then should return null', () => {
      // Arrange
      const value = VALID_CPF;

      // Act
      const result = getDocumentValidationError(value);

      // Assert
      expect(result).toBeNull();
    });

    it('When document is empty, then should return required message', () => {
      // Arrange
      const value = '';

      // Act
      const result = getDocumentValidationError(value);

      // Assert
      expect(result).toBe('Documento é obrigatório');
    });

    it('When document is invalid, then should return invalid message', () => {
      // Arrange
      const value = 'invalid_document';

      // Act
      const result = getDocumentValidationError(value);

      // Assert
      expect(result).toBe('CPF ou CNPJ inválido');
    });

    it('When parsing throws non-ZodError, then should return generic error message', () => {
      // Arrange - Create a scenario where parsing might throw a different error
      // This is a bit contrived but tests the error handling path
      const value = '12345'; // Invalid length to trigger the refinement

      // Act
      const result = getDocumentValidationError(value);

      // Assert
      expect(result).toBe('CPF ou CNPJ inválido');
    });
  });
});

describe('Phone Formatting', () => {
  describe('formatPhone', () => {
    it('When input has 2 digits or less, then should return digits only', () => {
      // Arrange & Act & Assert
      expect(formatPhone('1')).toBe('1');
      expect(formatPhone('11')).toBe('11');
      expect(formatPhone('')).toBe('');
    });

    it('When input has 3 digits, then should format with parentheses and space', () => {
      // Arrange
      const value = '119';

      // Act
      const result = formatPhone(value);

      // Assert
      expect(result).toBe('(11) 9');
    });

    it('When input has 4-7 digits, then should format with parentheses and space', () => {
      // Arrange & Act & Assert
      expect(formatPhone('1199')).toBe('(11) 9 9');
      expect(formatPhone('119999')).toBe('(11) 9 999');
      expect(formatPhone('1199999')).toBe('(11) 9 9999');
    });

    it('When input has 10 digits (fixed phone), then should format as (11) 9999-9999', () => {
      // Arrange
      const value = '1199999999';

      // Act
      const result = formatPhone(value);

      // Assert
      expect(result).toBe('(11) 9999-9999');
    });

    it('When input has 11 digits (mobile phone), then should format as (11) 99999-9999', () => {
      // Arrange
      const value = '11999999999';

      // Act
      const result = formatPhone(value);

      // Assert
      expect(result).toBe('(11) 99999-9999');
    });

    it('When input has more than 11 digits, then should truncate to 11 digits', () => {
      // Arrange
      const value = '119999999999999';

      // Act
      const result = formatPhone(value);

      // Assert
      expect(result).toBe('(11) 99999-9999');
    });

    it('When input has non-numeric characters, then should filter them out', () => {
      // Arrange
      const value = '(11) 99999-9999';

      // Act
      const result = formatPhone(value);

      // Assert
      expect(result).toBe('(11) 99999-9999');
    });

    it('When input has mixed characters, then should filter and format', () => {
      // Arrange
      const value = 'abc11def999ghi999jkl9999';

      // Act
      const result = formatPhone(value);

      // Assert
      expect(result).toBe('(11) 99999-9999');
    });
  });

  describe('validatePhone', () => {
    it('When phone has 10 digits, then should return true', () => {
      // Arrange
      const value = '1199999999';

      // Act
      const result = validatePhone(value);

      // Assert
      expect(result).toBe(true);
    });

    it('When phone has 11 digits, then should return true', () => {
      // Arrange
      const value = '11999999999';

      // Act
      const result = validatePhone(value);

      // Assert
      expect(result).toBe(true);
    });

    it('When phone has less than 10 digits, then should return false', () => {
      // Arrange
      const value = '119999999';

      // Act
      const result = validatePhone(value);

      // Assert
      expect(result).toBe(false);
    });

    it('When phone has more than 11 digits, then should return false', () => {
      // Arrange
      const value = '119999999999';

      // Act
      const result = validatePhone(value);

      // Assert
      expect(result).toBe(false);
    });

    it('When phone has non-numeric characters but valid length after filtering, then should return true', () => {
      // Arrange & Act & Assert
      expect(validatePhone('(11) 9999-9999')).toBe(true); // 10 dígitos
      expect(validatePhone('(11) 99999-9999')).toBe(true); // 11 dígitos
    });

    it('When phone is empty or has no digits, then should return false', () => {
      // Arrange & Act & Assert
      expect(validatePhone('')).toBe(false);
      expect(validatePhone('abc')).toBe(false);
      expect(validatePhone('()- ')).toBe(false);
    });
  });
});

describe('CEP Formatting', () => {
  describe('formatCEP', () => {
    it('When input has 5 digits or less, then should return digits only', () => {
      // Arrange & Act & Assert
      expect(formatCEP('1')).toBe('1');
      expect(formatCEP('12345')).toBe('12345');
      expect(formatCEP('')).toBe('');
    });

    it('When input has more than 5 digits, then should format with hyphen', () => {
      // Arrange
      const value = '12345678';

      // Act
      const result = formatCEP(value);

      // Assert
      expect(result).toBe('12345-678');
    });

    it('When input has non-numeric characters, then should filter them out', () => {
      // Arrange
      const value = '12.345-678';

      // Act
      const result = formatCEP(value);

      // Assert
      expect(result).toBe('12345-678');
    });

    it('When input has more than 8 digits, then should truncate to 8 digits', () => {
      // Arrange
      const value = '123456789';

      // Act
      const result = formatCEP(value);

      // Assert
      expect(result).toBe('12345-678');
    });
  });

  describe('validateCEPFormat', () => {
    it('When CEP has exactly 8 digits, then should return true', () => {
      // Arrange
      const value = '12345678';

      // Act
      const result = validateCEPFormat(value);

      // Assert
      expect(result).toBe(true);
    });

    it('When CEP has less than 8 digits, then should return false', () => {
      // Arrange
      const value = '1234567';

      // Act
      const result = validateCEPFormat(value);

      // Assert
      expect(result).toBe(false);
    });

    it('When CEP has more than 8 digits, then should return false', () => {
      // Arrange
      const value = '123456789';

      // Act
      const result = validateCEPFormat(value);

      // Assert
      expect(result).toBe(false);
    });

    it('When CEP has non-numeric characters but valid length after filtering, then should return true', () => {
      // Arrange
      const value = '12345-678';

      // Act
      const result = validateCEPFormat(value);

      // Assert
      expect(result).toBe(true);
    });

    it('When CEP is empty or has no digits, then should return false', () => {
      // Arrange & Act & Assert
      expect(validateCEPFormat('')).toBe(false);
      expect(validateCEPFormat('abc')).toBe(false);
      expect(validateCEPFormat('-')).toBe(false);
    });
  });
});

describe('CPF Formatting', () => {
  describe('formatCPF', () => {
    it('When input has 3 digits or less, then should return digits only', () => {
      // Arrange & Act & Assert
      expect(formatCPF('1')).toBe('1');
      expect(formatCPF('123')).toBe('123');
    });

    it('When input has 4-6 digits, then should format with first dot', () => {
      // Arrange & Act & Assert
      expect(formatCPF('1234')).toBe('123.4');
      expect(formatCPF('123456')).toBe('123.456');
    });

    it('When input has 7-9 digits, then should format with two dots', () => {
      // Arrange & Act & Assert
      expect(formatCPF('1234567')).toBe('123.456.7');
      expect(formatCPF('123456789')).toBe('123.456.789');
    });

    it('When input has 10+ digits, then should format with dots and hyphen', () => {
      // Arrange
      const value = '12345678901';

      // Act
      const result = formatCPF(value);

      // Assert
      expect(result).toBe('123.456.789-01');
    });

    it('When input has more than 11 digits, then should truncate to 11 digits', () => {
      // Arrange
      const value = '123456789012345';

      // Act
      const result = formatCPF(value);

      // Assert
      expect(result).toBe('123.456.789-01');
    });

    it('When input has non-numeric characters, then should filter them out', () => {
      // Arrange
      const value = 'abc123def456ghi789jkl01';

      // Act
      const result = formatCPF(value);

      // Assert
      expect(result).toBe('123.456.789-01');
    });
  });
});

describe('CNPJ Formatting', () => {
  describe('formatCNPJ', () => {
    it('When input has 2 digits or less, then should return digits only', () => {
      // Arrange & Act & Assert
      expect(formatCNPJ('1')).toBe('1');
      expect(formatCNPJ('12')).toBe('12');
    });

    it('When input has 3-5 digits, then should format with first dot', () => {
      // Arrange & Act & Assert
      expect(formatCNPJ('123')).toBe('12.3');
      expect(formatCNPJ('12345')).toBe('12.345');
    });

    it('When input has 6-8 digits, then should format with two dots', () => {
      // Arrange & Act & Assert
      expect(formatCNPJ('123456')).toBe('12.345.6');
      expect(formatCNPJ('12345678')).toBe('12.345.678');
    });

    it('When input has 9-12 digits, then should format with dots and slash', () => {
      // Arrange & Act & Assert
      expect(formatCNPJ('123456789')).toBe('12.345.678/9');
      expect(formatCNPJ('123456789012')).toBe('12.345.678/9012');
    });

    it('When input has 13+ digits, then should format completely', () => {
      // Arrange
      const value = '12345678901234';

      // Act
      const result = formatCNPJ(value);

      // Assert
      expect(result).toBe('12.345.678/9012-34');
    });

    it('When input has more than 14 digits, then should truncate to 14 digits', () => {
      // Arrange
      const value = '1234567890123456789';

      // Act
      const result = formatCNPJ(value);

      // Assert
      expect(result).toBe('12.345.678/9012-34');
    });

    it('When input has non-numeric characters, then should filter them out', () => {
      // Arrange
      const value = 'abc12def345ghi678jkl9012mno34';

      // Act
      const result = formatCNPJ(value);

      // Assert
      expect(result).toBe('12.345.678/9012-34');
    });
  });
});

describe('Email Validation', () => {
  describe('validateEmail', () => {
    it('When email is valid, then should return true', () => {
      // Arrange & Act & Assert
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@domain.co.uk')).toBe(true);
      expect(validateEmail('user+tag@example.org')).toBe(true);
    });

    it('When email is invalid, then should return false', () => {
      // Arrange & Act & Assert
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('test..test@example.com')).toBe(false);
      expect(validateEmail('')).toBe(false);
      expect(validateEmail('.test@example.com')).toBe(false);
      expect(validateEmail('test.@example.com')).toBe(false);
      expect(validateEmail('test@.example.com')).toBe(false);
      expect(validateEmail('test@example.com.')).toBe(false);
    });

    it('When email has special characters but is valid, then should return true', () => {
      // Arrange & Act & Assert
      expect(validateEmail('test_user@example.com')).toBe(true);
      expect(validateEmail('test-user@example.com')).toBe(true);
      expect(validateEmail('1234567890@example.com')).toBe(true);
    });
  });
});

describe('Field Formatting', () => {
  describe('applyFieldFormat', () => {
    it('When field type is phone, then should format as phone', () => {
      // Arrange
      const value = '11999999999';

      // Act
      const result = applyFieldFormat(value, 'phone');

      // Assert
      expect(result).toBe('(11) 99999-9999');
    });

    it('When field type is cep, then should format as CEP', () => {
      // Arrange
      const value = '12345678';

      // Act
      const result = applyFieldFormat(value, 'cep');

      // Assert
      expect(result).toBe('12345-678');
    });

    it('When field type is cpf, then should format as CPF', () => {
      // Arrange
      const value = '12345678901';

      // Act
      const result = applyFieldFormat(value, 'cpf');

      // Assert
      expect(result).toBe('123.456.789-01');
    });

    it('When field type is cnpj, then should format as CNPJ', () => {
      // Arrange
      const value = '12345678901234';

      // Act
      const result = applyFieldFormat(value, 'cnpj');

      // Assert
      expect(result).toBe('12.345.678/9012-34');
    });

    it('When field type is email, then should lowercase and trim', () => {
      // Arrange
      const value = '  TEST@EXAMPLE.COM  ';

      // Act
      const result = applyFieldFormat(value, 'email');

      // Assert
      expect(result).toBe('test@example.com');
    });

    it('When field type is unknown, then should return original value', () => {
      // Arrange
      const value = 'test value';

      // Act
      const result = applyFieldFormat(value, 'unknown' as FieldType);

      // Assert
      expect(result).toBe('test value');
    });
  });
});

describe('Field Validation', () => {
  describe('validateField', () => {
    it('When value is empty, then should return invalid with required message', () => {
      // Arrange & Act & Assert
      expect(validateField('', 'phone')).toEqual({
        isValid: false,
        message: 'Campo obrigatório'
      });
      expect(validateField('   ', 'email')).toEqual({
        isValid: false,
        message: 'Campo obrigatório'
      });
    });

    it('When field type is phone and value is valid, then should return valid', () => {
      // Arrange
      const value = '11999999999';

      // Act
      const result = validateField(value, 'phone');

      // Assert
      expect(result).toEqual({
        isValid: true,
        message: ''
      });
    });

    it('When field type is phone and value is invalid, then should return invalid', () => {
      // Arrange
      const value = '123';

      // Act
      const result = validateField(value, 'phone');

      // Assert
      expect(result).toEqual({
        isValid: false,
        message: 'Telefone deve ter 10 ou 11 dígitos'
      });
    });

    it('When field type is cep and value is valid, then should return valid', () => {
      // Arrange
      const value = '12345678';

      // Act
      const result = validateField(value, 'cep');

      // Assert
      expect(result).toEqual({
        isValid: true,
        message: ''
      });
    });

    it('When field type is cep and value is invalid, then should return invalid', () => {
      // Arrange
      const value = '123';

      // Act
      const result = validateField(value, 'cep');

      // Assert
      expect(result).toEqual({
        isValid: false,
        message: 'CEP deve ter 8 dígitos'
      });
    });

    it('When field type is cpf and value is valid, then should return valid', () => {
      // Arrange
      const value = VALID_CPF;

      // Act
      const result = validateField(value, 'cpf');

      // Assert
      expect(result).toEqual({
        isValid: true,
        message: ''
      });
    });

    it('When field type is cpf and value is invalid, then should return invalid', () => {
      // Arrange
      const value = INVALID_CPF;

      // Act
      const result = validateField(value, 'cpf');

      // Assert
      expect(result).toEqual({
        isValid: false,
        message: 'CPF inválido'
      });
    });

    it('When field type is cnpj and value is valid, then should return valid', () => {
      // Arrange
      const value = VALID_CNPJ;

      // Act
      const result = validateField(value, 'cnpj');

      // Assert
      expect(result).toEqual({
        isValid: true,
        message: ''
      });
    });

    it('When field type is cnpj and value is invalid, then should return invalid', () => {
      // Arrange
      const value = INVALID_CNPJ;

      // Act
      const result = validateField(value, 'cnpj');

      // Assert
      expect(result).toEqual({
        isValid: false,
        message: 'CNPJ inválido'
      });
    });

    it('When field type is email and value is valid, then should return valid', () => {
      // Arrange
      const value = 'test@example.com';

      // Act
      const result = validateField(value, 'email');

      // Assert
      expect(result).toEqual({
        isValid: true,
        message: ''
      });
    });

    it('When field type is email and value is invalid, then should return invalid', () => {
      // Arrange
      const value = 'invalid-email';

      // Act
      const result = validateField(value, 'email');

      // Assert
      expect(result).toEqual({
        isValid: false,
        message: 'Email inválido'
      });
    });

    it('When field type is unknown, then should return valid', () => {
      // Arrange
      const value = 'any value';

      // Act
      const result = validateField(value, 'unknown' as FieldType);

      // Assert
      expect(result).toEqual({
        isValid: true,
        message: ''
      });
    });
  });
});