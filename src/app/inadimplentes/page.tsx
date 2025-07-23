'use client';

import { useState } from 'react';
import { RouteGuard } from '@/components/template/RouteGuard/RouteGuard';
import InadimplentesHeader from '@/components/organisms/InadimplentesOrganisms/InadimplentesHeader';
import InadimplentesTable from '@/components/organisms/InadimplentesOrganisms/InadimplentesTable';
import { UserRole } from '@/types/auth';

export type Inadimplente = {
  id: number;
  nome: string;
  tipoDocumento?: string;
  documento: string;
  dataInclusao: string;
  dataBaixa?: string;
  cep?: string;
  logradouro?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
  tipoDevedor?: string;
  naturezaOperacao?: string;
  contrato?: string;
  nParcela?: string;
  valor?: string;
  dataVenda?: string;
  dataVencimento?: string;
};

const data = [
  {
    id: 123,
    nome: 'João da Silva',
    tipoDocumento: 'F',
    documento: '123.456.789-00',
    dataInclusao: '01/11/2020',
    dataBaixa: '15/11/2020',

    cep: '12345-678',
    logradouro: 'Rua Exemplo',
    bairro: 'Bairro Exemplo',
    cidade: 'Cidade Exemplo',
    uf: 'EX',

    tipoDevedor: 'Comprador',
    naturezaOperacao: 'Venda a Prazo',
    contrato: '12345',
    nParcela: '1/12',
    valor: 'R$ 1.000,00',
    dataVenda: '01/11/2020',
    dataVencimento: '01/12/2020',
  },
  {
    id: 456,
    nome: 'Maria Souza',
    tipoDocumento: 'F',
    documento: '987.654.321-00',
    dataInclusao: '20/06/2023',
    dataBaixa: '05/07/2023',

    cep: '87654-321',
    logradouro: 'Avenida Teste',
    bairro: 'Bairro Teste',
    cidade: 'Cidade Teste',
    uf: 'TS',

    tipoDevedor: 'Comprador',
    naturezaOperacao: 'Venda à Vista',
    contrato: '67890',
    nParcela: 'À Vista',
    valor: 'R$ 500,00',
    dataVenda: '20/06/2023',
    dataVencimento: '20/06/2023',
  },
  {
    id: 789,
    nome: 'Carlos Oliveira',
    tipoDocumento: 'J',
    documento: '12.345.678/0001-90',
    dataInclusao: '10/02/2022',

    cep: '54321-098',
    logradouro: 'Travessa Exemplo',
    bairro: 'Bairro Exemplo',
    cidade: 'Cidade Exemplo',
    uf: 'EX',

    tipoDevedor: 'Empresa',
    naturezaOperacao: 'Compra a Prazo',
    contrato: '54321',
    nParcela: '3/6',
    valor: 'R$ 2.500,00',
    dataVenda: '10/02/2022',
    dataVencimento: '10/08/2022',
  },
  {
    id: 101,
    nome: 'Ana Costa',
    tipoDocumento: 'F',
    documento: '555.666.777-88',
    dataInclusao: '15/08/2021',
    dataBaixa: '30/08/2021',

    cep: '32165-432',
    logradouro: 'Rua Teste',
    bairro: 'Bairro Teste',
    cidade: 'Cidade Teste',
    uf: 'TS',

    tipoDevedor: 'Comprador',
    naturezaOperacao: 'Cheque cobrança devolvido',
    contrato: '98765',
    nParcela: '2/10',
    valor: 'R$ 750,00',
    dataVenda: '15/08/2021',
    dataVencimento: '15/09/2021',
  },
];

export default function InadimplentesPage() {
  const [message, setMessage] = useState('');

  return (
    <RouteGuard allowedRoles={[UserRole.ADMIN, UserRole.DEVS]}>
      <div style={{ padding: 32 }}>
        <InadimplentesHeader
          searchQuery={message}
          onSearchChange={setMessage}
          onSearchClear={() => setMessage('')}
          resultCount={0}
          isSearchActive={!!message}
          navigationItems={[{ label: 'Inadimplentes', isActive: true }]}
          pageTitle="Inadimplentes"
          pageSubtitle="Gerenciamento de Registros de Inadimplência"
        />
        <InadimplentesTable data={data} />
      </div>
    </RouteGuard>
  );
}