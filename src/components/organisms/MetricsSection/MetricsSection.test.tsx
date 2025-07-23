import { render, screen } from '@testing-library/react';
import MetricsSection from './MetricsSection';
import React from 'react';

describe('MetricsSection', () => {
  it('When rendered, then shows all metric cards', () => {
    // Arrange & Act
    render(<MetricsSection />);

    // Assert
    expect(screen.getByText('Saldo de Créditos')).toBeInTheDocument();
    expect(screen.getByText('Parceiros Ativos')).toBeInTheDocument();
    expect(screen.getByText('Faturamento Mensal')).toBeInTheDocument();
    expect(screen.getByText('Margem de Lucro')).toBeInTheDocument();
  });
}); 