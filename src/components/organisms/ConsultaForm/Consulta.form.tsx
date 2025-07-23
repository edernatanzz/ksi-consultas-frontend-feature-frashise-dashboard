'use client';

import EmptyState from '@/components/atoms/EmptyStates/EmptyState';
import { useConsulta } from '@/contexts/ConsultaContext';
import { TipoDocumento } from '@/types/ConsultaTypes';
import React, { useState } from 'react';


const ConsultaForm = () => {
  const { consulta, consultarPorDocumento } = useConsulta();
  
  const [documento, setDocumento] = useState('18930258883');
  const [tipoDocumento, setTipoDocumento] = useState<TipoDocumento>('cpf');
  const [erro, setErro] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!documento) {
      setErro('Por favor, informe um documento');
      return;
    }
    setErro(null);
    try {
      const resultado = await consultarPorDocumento(tipoDocumento, documento);
      if (!resultado.success) {
        setErro(resultado.message || 'Erro ao consultar o documento');
      }
    } catch (error) {
      console.error('Erro ao consultar:', error);
      setErro('Erro ao consultar o documento');
    }
  };

  return (
    <div>
      <h1>Consulta de Documentos</h1>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Tipo de Documento:
            <select 
              value={tipoDocumento} 
              onChange={(e) => setTipoDocumento(e.target.value as TipoDocumento)}
            >
              <option value="cpf">CPF</option>
              <option value="cnpj">CNPJ</option>
            </select>
          </label>
        </div>
        
        <div>
          <label>
            Número do Documento:
            <input
              type="text"
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
              placeholder={tipoDocumento === 'cpf' ? '000.000.000-00' : '00.000.000/0000-00'}
            />
          </label>
        </div>
        
        <button type="submit" disabled={consulta.loading}>
          {consulta.loading ? 'Consultando...' : 'Consultar'}
        </button>
      </form>
      
      {erro && <p className="erro">{erro}</p>}
      
      {consulta.error && <p className="erro">{consulta.error}</p>}
      
      {consulta.loading && (
        <EmptyState
          icon="search"
          message="Buscando informações do documento..."
          showAnimation={true}
        />
      )}
      
      {consulta.resultado && consulta.resultado.success && (
        <div className="resultado">
          <h2>Resultado da Consulta</h2>
          
          <pre>{JSON.stringify(consulta.resultado.data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ConsultaForm;