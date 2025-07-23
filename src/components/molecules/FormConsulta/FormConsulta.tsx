"use client"

import { Search } from "lucide-react"
import { Card, CardContent, CardHeader } from "@mui/material"
import { Checkbox } from "@mui/material"
import FormLabel from "@mui/material/FormLabel"
import { PersonTypeSelector } from "@/components/molecules/PersonTypeSelector/PersonTypeSelector"
import { DocumentoInput } from "@/components/atoms/DocumentoInput/DocumentoInput"
import { Button } from "@/components/atoms/Button/Button"
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import { validateDocument } from "@/utils/Validator";

interface FormularioConsultaProps {
  personType: string
  document: string
  newConsultation: boolean
  isLoading: boolean
  onPersonTypeChange: (value: string) => void
  onDocumentChange: (value: string) => void
  onNewConsultationChange: (checked: boolean) => void
  onSubmit: () => void
  dataTestId?: string
}

export function FormularioConsulta({
  personType,
  document,
  newConsultation,
  isLoading,
  onPersonTypeChange,
  onDocumentChange,
  onNewConsultationChange,
  onSubmit,
  dataTestId,
}: FormularioConsultaProps) {
  
  // Validação usando as funções do cpfValidator
  const isDocumentValid = () => {
    if (!document.trim()) return false;
    return validateDocument(document);
  };

  const isSubmitDisabled = isLoading || !document.trim() || !isDocumentValid();

  return (
    <Card className="bg-gray-100 h-full" data-testid={dataTestId}>
      <CardHeader 
        title={
          <span className="text-lg md:text-xl text-[#112331]">
            Formulário de Consulta
          </span>
        } 
        subheader={
          <span className="text-sm md:text-base text-gray-600">
            Preencha os dados para realizar a consulta
          </span>
        }
      />
      <CardContent className="space-y-4 md:space-y-6">
        <PersonTypeSelector value={personType} onChange={onPersonTypeChange} dataTestId="person-type-selector" />

        <DocumentoInput personType={personType} value={document} onChange={onDocumentChange} dataTestId="documento-input" />

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="new-consultation" 
            checked={newConsultation} 
            onChange={(_, checked) => onNewConsultationChange(checked)}
            className="mt-1"
            data-testid="new-consultation-checkbox"
          />
          <FormLabel htmlFor="new-consultation" className="text-xs md:text-sm text-gray-600">
            Caso a consulta já tenha sido realizada, deseja consultar novamente?
          </FormLabel>
        </div>

        <Button
          className="w-full bg-primary-500 hover:bg-red-700 text-white text-sm md:text-base py-2 md:py-3"
          onClick={onSubmit}
          disabled={isSubmitDisabled}
          data-testid="submit-button"
        >
          {isLoading ? (
            <>
              <svg role="progressbar" aria-label="Carregando resultados" data-testid="loading-icon" className="animate-spin mr-2 md:mr-3 h-4 w-4 border-2 border-white border-t-transparent rounded-full" viewBox="0 0 24 24"><AutorenewOutlinedIcon /></svg>
              Consultando...
            </>
          ) : (
            <>
              <Search aria-label="Consultar" data-testid="search-icon" className="w-4 h-4 mr-2" />
              Consultar
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
