'use client'

import { Card, CardContent, CardHeader } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface ResultadoConsultaProps {
  dataTestId?: string;
}

export function ResultadoConsulta({ dataTestId }: ResultadoConsultaProps) {
  return (
    <Card data-testid={dataTestId} className="bg-[#FFFCF9] h-full">
      <CardHeader
        title={
          <span className="text-[#112331] text-lg md:text-xl">
            Resultado da Consulta
          </span>
        }
        subheader={
          <span className="text-[#112331] text-sm md:text-base">
            Os resultados da sua consulta aparecerão aqui
          </span>
        }
      />
      <CardContent className="flex flex-col items-center justify-center py-8 md:py-12">
        <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <SearchIcon className="text-gray-400 w-6 h-6 md:w-8 md:h-8" />
        </div>
        <h3 className="text-base md:text-lg font-medium text-[#112331] mb-2">Nenhuma consulta realizada</h3>
        <p className="text-xs md:text-sm text-gray-600 text-center max-w-sm px-4">
          Preencha o formulário ao lado e clique em Consultar para visualizar os resultados
        </p>
      </CardContent>
    </Card>
  );
}