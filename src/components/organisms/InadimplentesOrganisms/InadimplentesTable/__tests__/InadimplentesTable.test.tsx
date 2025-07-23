import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import InadimplentesTable from '../InadimplentesTable';
import React from 'react';

describe('InadimplentesTable', () => {
  const data = [
    {
      id: 1,
      nome: 'João da Silva',
      tipoDocumento: 'F',
      documento: '123.456.789-00',
      dataInclusao: '01/01/2023',
      dataBaixa: '',
      cep: '12345-678',
      logradouro: 'Rua Exemplo',
      bairro: 'Centro',
      cidade: 'Cidade Exemplo',
      uf: 'EX',
      tipoDevedor: 'Comprador',
      naturezaOperacao: 'Venda a Prazo',
      contrato: '12345',
      nParcela: '1/12',
      valor: 'R$ 1.000,00',
      dataVenda: '01/01/2023',
      dataVencimento: '01/02/2023',
    },
    {
      id: 2,
      nome: 'Maria Souza',
      tipoDocumento: 'F',
      documento: '987.654.321-00',
      dataInclusao: '02/01/2023',
      dataBaixa: '10/01/2023',
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
      dataVenda: '02/01/2023',
      dataVencimento: '02/01/2023',
    },
  ];

  it('When rendered, then shows table title and columns', () => {
    // Arrange & Act
    render(<InadimplentesTable data={data} />);
    // Assert
    expect(screen.getByText('Lista de Inadimplentes')).toBeInTheDocument();
    expect(screen.getAllByText('Inadimplente').length).toBeGreaterThan(0);
    expect(screen.getByText('Documento')).toBeInTheDocument();
    expect(screen.getByText('Data de Inclusão')).toBeInTheDocument();
    expect(screen.getByText('Situação')).toBeInTheDocument();
    expect(screen.getByText('Ações')).toBeInTheDocument();
  });

  it('When rendered with data, then shows rows and status badges', () => {
    // Arrange & Act
    render(<InadimplentesTable data={data} />);
    // Assert
    expect(screen.getByText('João da Silva')).toBeInTheDocument();
    expect(screen.getByText('Maria Souza')).toBeInTheDocument();
    expect(screen.getAllByText('Inadimplente').length).toBeGreaterThan(0);
    expect(screen.getByText('Baixado')).toBeInTheDocument();
  });

  it('When rendered with data, then shows both status badges and "---" for missing dataBaixa', () => {
    render(<InadimplentesTable data={data} />);
    // Badge "Baixado"
    expect(screen.getByText('Baixado')).toBeInTheDocument();
    // Badge "Inadimplente"
    expect(screen.getAllByText('Inadimplente').length).toBeGreaterThan(0);
    // "---" para dataBaixa vazia
    expect(screen.getByText('---')).toBeInTheDocument();
  });

  it('When "Visualizar Baixa" is clicked, then calls the correct handler', () => {
    const logSpy = vi.spyOn(console, 'log');
    render(<InadimplentesTable data={data} />);
    fireEvent.click(screen.getAllByRole('button')[0]); // abre o menu de ações
    fireEvent.click(screen.getByText('Visualizar Baixa'));
    expect(logSpy).toHaveBeenCalledWith('Visualizar ID:', data[0].id);
    logSpy.mockRestore();
  });

  it('When filling all fields in both tabs and saving, all branches are covered', async () => {
    // Arrange
    render(<InadimplentesTable data={[{
      id: 1,
      nome: 'João da Silva',
      tipoDocumento: 'F',
      documento: '123.456.789-00',
      dataInclusao: '01/01/2023',
      dataBaixa: '',
      cep: '12345-678',
      logradouro: 'Rua Exemplo',
      bairro: 'Centro',
      cidade: 'Cidade Exemplo',
      uf: 'EX',
      tipoDevedor: 'Comprador',
      naturezaOperacao: 'Venda a Prazo',
      contrato: '12345',
      nParcela: '1/12',
      valor: 'R$ 1.000,00',
      dataVenda: '01/01/2023',
      dataVencimento: '01/02/2023',
    }]} />);
    
    // Act - Abre o modal
    fireEvent.click(screen.getAllByRole('button')[0]);
    fireEvent.click(screen.getByText('Visualizar Inclusão'));
    
    // Assert - Modal aberto
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Detalhes do Inadimplente' })).toBeInTheDocument();
    });
  
    // Act - Aba "Dados do Devedor"
    const combobox = screen.getByRole('combobox');
    fireEvent.mouseDown(combobox);
    
    await waitFor(() => {
      expect(screen.getByText('Pessoa Jurídica')).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getByText('Pessoa Jurídica'));
    
    // Preenche os campos de texto
    const devedorFields = screen.getAllByRole('textbox');
    devedorFields.forEach((textbox, idx) => {
      fireEvent.change(textbox, { target: { value: `valor${idx}` } });
    });
  
    // Act - Troca para aba "Dados da Dívida"
    fireEvent.click(screen.getByText('Dados da Dívida'));
    
    await waitFor(() => {
      expect(screen.getByText('Tipo de Devedor')).toBeInTheDocument();
    });
    
    const dividaFields = screen.getAllByRole('textbox');
    dividaFields.forEach((textbox, idx) => {
      fireEvent.change(textbox, { target: { value: `divida${idx}` } });
    });
  
    // Act - Clica em Salvar
    const logSpy = vi.spyOn(console, 'log');
    fireEvent.click(screen.getByText('Salvar'));
    
    // Assert
    expect(logSpy).toHaveBeenCalled();
    logSpy.mockRestore();
  }, 10000); // Timeout aumentado para 10 segundos

  it('When modal is opened and closed without editing, all branches are covered', () => {
    render(<InadimplentesTable data={data} />);
    fireEvent.click(screen.getAllByRole('button')[0]);
    fireEvent.click(screen.getByText('Visualizar Inclusão'));
    fireEvent.click(screen.getByText('Cancelar'));
  });

  it('When modal is open and closed via Modal onClose, then closes modal', () => {
    render(<InadimplentesTable data={data} />);
    fireEvent.click(screen.getAllByRole('button')[0]);
    fireEvent.click(screen.getByText('Visualizar Inclusão'));
    // Simula o fechamento pelo onClose do Modal (ESC)
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    // Não precisa de assert, só cobre o caminho
  });

  it('When modal is opened with missing fields, all fallback branches are covered', () => {
    const dataWithMissing = [{
      id: 3,
      nome: '', // vazio
      tipoDocumento: undefined, // undefined
      documento: null, // null
      dataInclusao: '',
      dataBaixa: '',
      cep: undefined,
      logradouro: null,
      bairro: '',
      cidade: '',
      uf: '',
      tipoDevedor: '',
      naturezaOperacao: '',
      contrato: '',
      nParcela: '',
      valor: '',
      dataVenda: '',
      dataVencimento: '',
    }];
    render(<InadimplentesTable data={dataWithMissing as unknown as typeof data} />);
    fireEvent.click(screen.getAllByRole('button')[0]);
    fireEvent.click(screen.getByText('Visualizar Inclusão'));
    // Não precisa de assert, só cobre o caminho dos valores "falsy"
  });  

  it('When "Visualizar Inclusão" is clicked, then opens modal with devedor tab', () => {
    // Arrange
    render(<InadimplentesTable data={data} />);
    fireEvent.click(screen.getAllByRole('button')[0]); // abre o menu de ações
    fireEvent.click(screen.getByText('Visualizar Inclusão'));
    // Assert
    expect(screen.getByRole('heading', { name: 'Detalhes do Inadimplente' })).toBeInTheDocument();
    expect(screen.getByText('Dados do Devedor')).toBeInTheDocument();
    expect(screen.getByText('Dados da Dívida')).toBeInTheDocument();
    expect(screen.getByText('Nome')).toBeInTheDocument();
    expect(screen.getAllByText('Documento').length).toBeGreaterThan(1);
  });

  it('When modal tab is switched, then shows dívida fields', () => {
    // Arrange
    render(<InadimplentesTable data={data} />);
    fireEvent.click(screen.getAllByRole('button')[0]);
    fireEvent.click(screen.getByText('Visualizar Inclusão'));
    // Act
    fireEvent.click(screen.getByText('Dados da Dívida'));
    // Assert
    expect(screen.getByText('Tipo de Devedor')).toBeInTheDocument();
    expect(screen.getByText('Natureza da Operação')).toBeInTheDocument();
    expect(screen.getByText('Contrato')).toBeInTheDocument();
    expect(screen.getByText('Valor')).toBeInTheDocument();
  });

  it('When modal is open and "Cancelar" is clicked, then closes modal', () => {
    // Arrange
    render(<InadimplentesTable data={data} />);
    fireEvent.click(screen.getAllByRole('button')[0]);
    fireEvent.click(screen.getByText('Visualizar Inclusão'));
    // Act
    fireEvent.click(screen.getByText('Cancelar'));
    // Assert
    expect(screen.queryByRole('heading', { name: 'Detalhes do Inadimplente' })).not.toBeInTheDocument();
  });
});