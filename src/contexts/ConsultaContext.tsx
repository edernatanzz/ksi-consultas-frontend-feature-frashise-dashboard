'use client';

import React, { createContext, useContext, useState } from 'react';
import { consultarDocumento } from '../services/ConsultaService';
import { 
  ConsultaState,
  ResultadoConsulta,
  TipoDocumento
} from '../types/ConsultaTypes';

interface ConsultaContextType {
  consulta: ConsultaState;
  consultarPorDocumento: (tipo: TipoDocumento, documento: string) => Promise<ResultadoConsulta>;
  limparConsulta: () => void;
  formattedDocument: string | null;
}

type ConsultaProviderProps = {
  children: React.ReactNode;
};

const ConsultaContext = createContext<ConsultaContextType>({} as ConsultaContextType);

export const useConsulta = () => useContext(ConsultaContext);

export const ConsultaProvider: React.FC<ConsultaProviderProps> = ({ children }) => {
  const [consulta, setConsulta] = useState<ConsultaState>({
    loading: false,
    resultado: null,
    error: null
  });

  const [formattedDocument, setFormattedDocument] = useState<string | null>(null);

  const consultarPorDocumento = async (
    tipo: TipoDocumento,
    documento: string
  ): Promise<ResultadoConsulta> => {
    setConsulta({ loading: true, resultado: null, error: null });
    
    try {
      const resultado = await consultarDocumento(tipo, documento);
      
      if (resultado.success) {
        setFormattedDocument(documento);
        setConsulta({ 
          loading: false, 
          resultado: resultado, 
          error: null 
        });
      } else {
        setConsulta({ 
          loading: false, 
          resultado: null, 
          error: resultado.message || 'Erro na consulta' 
        });
      }
      
      return resultado;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      setConsulta({
        loading: false,
        resultado: null,
        error: errorMessage
      });
      
      return {
        success: false,
        message: errorMessage
      };
    }
  };

  const limparConsulta = () => {
    setConsulta({
      loading: false,
      resultado: null,
      error: null
    });
    setFormattedDocument(null);
  };

  const contextValue: ConsultaContextType = {
    consulta,
    consultarPorDocumento,
    limparConsulta,
    formattedDocument
  };

  return (
    <ConsultaContext.Provider value={contextValue}>
      {children}
    </ConsultaContext.Provider>
  );
};