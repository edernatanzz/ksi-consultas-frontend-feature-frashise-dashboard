import { render, screen } from '@testing-library/react';
import FranchiseeMainPage from './page';

describe('FranchiseeMainPage', () => {
  it('When rendered, then shows all dashboard sections', () => {
    // Arrange & Act
    render(<FranchiseeMainPage />);

    // Assert
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Sistema de Gerenciamento de Franqueados')).toBeInTheDocument();
    expect(screen.getByText('Saldo de Créditos')).toBeInTheDocument();
    expect(screen.getByText('Evolução de Vendas')).toBeInTheDocument();
    expect(screen.getByText('Performance por Parceiro')).toBeInTheDocument();
    expect(screen.getByText('Distribuição de Serviços')).toBeInTheDocument();
    expect(screen.getByText('Ações Rápidas')).toBeInTheDocument();
    expect(screen.getByText('Atividade Recente')).toBeInTheDocument();
  });
}); 