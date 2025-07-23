import { InputLabel, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { validateCPF, validateCNPJ, getDocumentValidationError } from "@/utils/Validator";

interface DocumentoInputProps {
  value: string;
  onChange: (value: string) => void;
  personType: string;
  dataTestId: string;
}

export function DocumentoInput({ value, onChange, personType, dataTestId }: DocumentoInputProps) {
  const [localValue, setLocalValue] = useState(value);
  const [error, setError] = useState<string>("");

  // Efeito para sincronizar com o valor externo
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Efeito para limpar o input quando o tipo de pessoa mudar
  useEffect(() => {
    setLocalValue("");
    onChange("");
    setError("");
  }, [personType, onChange]);

  const formatDocument = (value: string, type: string) => {
    const numbers = value.replace(/\D/g, "");

    if (type === "fisica") {
      // Formata CPF: 000.000.000-00
      if (numbers.length <= 3) return numbers;
      if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
      if (numbers.length <= 9) return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;
      return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`;
    } else {
      // Formata CNPJ: 00.000.000/0000-00
      if (numbers.length <= 2) return numbers;
      if (numbers.length <= 5) return `${numbers.slice(0, 2)}.${numbers.slice(2)}`;
      if (numbers.length <= 8) return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5)}`;
      if (numbers.length <= 12) return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8)}`;
      return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8, 12)}-${numbers.slice(12, 14)}`;
    }
  };

  const validateDocumentInput = (formattedValue: string, type: string) => {
    const numbers = formattedValue.replace(/\D/g, "");
    
    // Validação básica de comprimento
    if (type === "fisica") {
      if (numbers.length > 0 && numbers.length < 11) {
        return "CPF deve conter 11 dígitos";
      }
      if (numbers.length === 11) {
        // Usar validação do cpfValidator
        if (!validateCPF(formattedValue)) {
          const validationError = getDocumentValidationError(formattedValue);
          return validationError || "CPF inválido";
        }
      }
    } else {
      if (numbers.length > 0 && numbers.length < 14) {
        return "CNPJ deve conter 14 dígitos";
      }
      if (numbers.length === 14) {
        // Usar validação do cpfValidator
        if (!validateCNPJ(formattedValue)) {
          const validationError = getDocumentValidationError(formattedValue);
          return validationError || "CNPJ inválido";
        }
      }
    }
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const formattedValue = formatDocument(newValue, personType);
    const validationError = validateDocumentInput(formattedValue, personType);
    
    setLocalValue(formattedValue);
    setError(validationError);
    onChange(formattedValue);
  };

  useEffect(() => {
    setError(validateDocumentInput(localValue, personType));
  }, [localValue, personType]);

  return (
    <div data-testid={dataTestId}>
      <InputLabel htmlFor="document" className="text-sm font-medium mb-2 block">
        {personType === "fisica" ? "CPF" : "CNPJ"}
      </InputLabel>
      <TextField
        id="document"
        placeholder={personType === "fisica" ? "Digite o CPF" : "Digite o CNPJ"}
        value={localValue}
        onChange={handleChange}
        fullWidth
        error={!!error}
        helperText={error}
        inputProps={{ className: error ? "border-red-500" : undefined, 'data-testid': 'form-consulta-input' }}
      />
    </div>
  );
}