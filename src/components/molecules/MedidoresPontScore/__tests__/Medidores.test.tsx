import { render, screen } from '@testing-library/react';
import Medidores from '../MedidoresPontScore';
import { vi } from 'vitest';

// Mock do componente Medidor
vi.mock('@/components/atoms/RelatorioKSIMaster/Medidor/Medidor', () => ({
  default: ({ value, max }: { value: number; max: number }) => (
    <div data-testid="mock-medidor">{`Valor: ${value}, Máximo: ${max}`}</div>
  ),
}));

describe('Medidores', () => {
  const defaultProps = {
    Score: 750,
    Pontualidade: 90,
  };

  // it('When rendered, then displays Score section correctly', () => {
  //   // Arrange
  //   render(<Medidores {...defaultProps} />);

  //   // Act
  //   const scoreTitle = screen.getByTestId('medidores-score-title');
  //   const scoreIcon = screen.getByTestId('medidores-score-icon');
  //   const scoreDescription = screen.getByTestId('medidores-score-description');
  //   const scoreMedidor = screen.getByTestId('medidores-score-medidor-container');

  //   // Assert
  //   expect(scoreTitle).toHaveTextContent('Score Positivo: Fonte de dados Bacen');
  //   expect(scoreIcon).toBeInTheDocument();
  //   expect(scoreDescription).toHaveTextContent(/O score é baseado nas informações do BACEN/i);
  //   expect(scoreMedidor).toHaveTextContent('Valor: 750, Máximo: 1000');
  // });

  // it('When rendered, then displays Pontualidade section correctly', () => {
  //   // Arrange
  //   render(<Medidores {...defaultProps} />);

  //   // Act
  //   const pontualidadeTitle = screen.getByTestId('medidores-pontualidade-title');
  //   const pontualidadeIcon = screen.getByTestId('medidores-pontualidade-icon');
  //   const pontualidadeDescription = screen.getByTestId('medidores-pontualidade-description');
  //   const pontualidadeMedidor = screen.getByTestId('medidores-pontualidade-medidor-container');

  //   // Assert
  //   expect(pontualidadeTitle).toHaveTextContent('Pontualidade de Pagamento');
  //   expect(pontualidadeIcon).toBeInTheDocument();
  //   expect(pontualidadeDescription).toHaveTextContent('O consumidor realiza pagamento de 90% dos seus compromissos financeiros até a data do vencimento.');
  //   expect(pontualidadeMedidor).toHaveTextContent('Valor: 90, Máximo: 100');
  // });

  it('When rendered, then container elements are present', () => {
    // Arrange
    render(<Medidores {...defaultProps} />);

    // Act & Assert
    expect(screen.getByTestId('medidores-container')).toBeInTheDocument();
    expect(screen.getByTestId('medidores-score-container')).toBeInTheDocument();
    expect(screen.getByTestId('medidores-pontualidade-container')).toBeInTheDocument();
  });
});
