import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import renderResultadosInformacoes from '../renderResultadosInformacoes';

describe('renderResultadosInformacoes', () => {
  it('When personType is "fisica", then it renders dataRestricoesPlusFisica', () => {
    // Arrange
    const props = {
      personType: 'fisica',
      opcionalSelected: [],
    };

    // Act
    render(renderResultadosInformacoes(props));

    // Assert
    expect(screen.getByText('Cliente Premium:')).toBeInTheDocument();
    expect(screen.getByText('Não')).toBeInTheDocument();
  });

  it('When personType is "juridica", then it renders dataRestricoesPlusJuridica', () => {
    // Arrange
    const props = {
      personType: 'juridica',
      opcionalSelected: [],
    };

    // Act
    render(renderResultadosInformacoes(props));

    // Assert
    expect(screen.getByText('Atividade Social:')).toBeInTheDocument();
    expect(screen.getByText('Não informado')).toBeInTheDocument();
  });

  it('When opcionalSelected includes "rendaFamiliar", then it shows renda presumida section', () => {
    // Arrange
    const props = {
      personType: 'fisica',
      opcionalSelected: ['rendaFamiliar'],
    };

    // Act
    render(renderResultadosInformacoes(props));

    // Assert
    expect(screen.getByTestId('renda-presumida-container')).toBeInTheDocument();
    expect(screen.getByTestId('renda-presumida-value')).toHaveTextContent('R$ 5.500,00');
  });

  it('When opcionalSelected includes "SCR", then it shows SCR - Banco Central sections', () => {
    // Arrange
    const props = {
      personType: 'fisica',
      opcionalSelected: ['SCR'],
    };

    // Act
    render(renderResultadosInformacoes(props));

    // Assert
    expect(screen.getByText('SCR - Banco Central')).toBeInTheDocument();
    expect(screen.getAllByText('Resumo')).toHaveLength(2); // Two "Resumo" sections: SCR and Carteira de Crédito
    expect(screen.getAllByText('Detalhes')).toHaveLength(2); // Two "Detalhes" sections: SCR and Carteira de Crédito
    expect(screen.getAllByText('Score')).toHaveLength(2); // Two "Score" elements: header and table cell
    expect(screen.getByText('801 a 1000 Pontos')).toBeInTheDocument();
    expect(screen.getAllByText('Carteira de Crédito')).toHaveLength(2);
  });

  it('When opcionalSelected includes "acaoJudicial", then it shows Ações Judiciais section', () => {
    // Arrange
    const props = {
      personType: 'fisica',
      opcionalSelected: ['acaoJudicial'],
    };

    // Act
    render(renderResultadosInformacoes(props));

    // Assert
    expect(screen.getByText('Ações Judiciais')).toBeInTheDocument();
  });

  it('When opcionalSelected includes multiple opcional sections, then all are rendered', () => {
    // Arrange
    const props = {
      personType: 'fisica',
      opcionalSelected: ['acaoJudicial', 'SCR', 'cadin', 'obito'],
    };

    // Act
    render(renderResultadosInformacoes(props));

    // Assert
    expect(screen.getByText('Ações Judiciais')).toBeInTheDocument();
    expect(screen.getByText('SCR - Banco Central')).toBeInTheDocument();
    expect(screen.getByText('Cadin')).toBeInTheDocument();
    expect(screen.getByText('Óbito')).toBeInTheDocument();
  });

  it('When rendering default sections, then it renders Passagens Comerciais and Ações Cíveis', () => {
    // Arrange
    const props = {
      personType: 'fisica',
      opcionalSelected: [],
    };

    // Act
    render(renderResultadosInformacoes(props));

    // Assert
    expect(screen.getByText('Passagens Comerciais')).toBeInTheDocument();
    expect(screen.getByText('Ações Cíveis')).toBeInTheDocument();
  });
});
