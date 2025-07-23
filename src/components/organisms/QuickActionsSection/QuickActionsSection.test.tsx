import { render, screen } from '@testing-library/react';
import QuickActionsSection from './QuickActionsSection';

describe('QuickActionsSection', () => {
  it('When rendered, then shows all quick actions', () => {
    // Arrange & Act
    render(<QuickActionsSection />);

    // Assert
    expect(screen.getByText('Ações Rápidas')).toBeInTheDocument();
    expect(screen.getByText('Adicionar Novo Parceiro')).toBeInTheDocument();
    expect(screen.getByText('Comprar Mais Créditos')).toBeInTheDocument();
    expect(screen.getByText('Relatório Executivo')).toBeInTheDocument();
    expect(screen.getByText('Suporte Técnico')).toBeInTheDocument();
  });
}); 