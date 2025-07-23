// __tests__/renderResultadosCreditos.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { renderResultadosCreditos } from '../renderResultadosCreditos';

describe('renderResultadosCreditos', () => {
  it('When component is rendered, then it displays "Resumo" and its table with correct rows', () => {
    // Arrange & Act
    render(renderResultadosCreditos());

    // Assert
    expect(screen.getByText('Resumo')).toBeInTheDocument();
    expect(screen.getByText('RGI do Brasil')).toBeInTheDocument();
    expect(screen.getByText('Cheque sem fundo')).toBeInTheDocument();
    expect(screen.getAllByText('Protesto Nacional Cenprot')).toHaveLength(2);
  });

  it('When component is rendered, then it displays "Detalhes" section with RGI title and rows', () => {
    // Arrange & Act
    render(renderResultadosCreditos());

    // Assert
    expect(screen.getByText('Detalhes')).toBeInTheDocument();
    expect(screen.getByText('RGI - Registro Geral de Inadimplente Do Brasil')).toBeInTheDocument();

    // Verifica um dos dados da tabela RGI
    expect(screen.getByText('NU FINANCEIRA S/A')).toBeInTheDocument();
    expect(screen.getByText('05/10/2022')).toBeInTheDocument();
    expect(screen.getByText('526.75')).toBeInTheDocument();
  });

  it('When Cheque Sem Fundo and Protesto Nacional are empty, then tables render without rows', () => {
    // Arrange & Act
    render(renderResultadosCreditos());

    // Assert
    const chequeSection = screen.getByText('Cheque Sem Fundo').closest('div');
    const protestoSection = screen.getByRole('heading', { name: 'Protesto Nacional Cenprot' }).closest('div');

    // Verifica se as tabelas existem nas seções
    const chequeTable = within(chequeSection as HTMLElement).queryByRole('table');
    const protestoTable = within(protestoSection as HTMLElement).queryByRole('table');

    // Se as tabelas existem, verifica se estão vazias; se não existem, está correto (seções vazias)
    if (chequeTable) {
      expect(chequeTable.querySelectorAll('tbody tr')).toHaveLength(0);
    }
    if (protestoTable) {
      expect(protestoTable.querySelectorAll('tbody tr')).toHaveLength(0);
    }
    
    // Verifica que as seções existem mesmo sem dados
    expect(chequeSection).toBeInTheDocument();
    expect(protestoSection).toBeInTheDocument();
  });
});
