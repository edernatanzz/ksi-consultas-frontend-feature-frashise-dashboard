import { render, screen } from '@testing-library/react';
import SalesEvolutionSection from './SalesEvolutionSection';

describe('SalesEvolutionSection', () => {
  it('When rendered, then shows title and chart', () => {
    // Arrange & Act
    render(<SalesEvolutionSection />);

    // Assert
    expect(screen.getByText('Evolução de Vendas')).toBeInTheDocument();
    expect(screen.getByText('Últimos 6 meses')).toBeInTheDocument();
    expect(screen.getByText('+60.3%')).toBeInTheDocument();
  });
}); 