import { render, screen } from '@testing-library/react';
import ServiceDistributionSection from './ServiceDistributionSection';
import React from 'react';

describe('ServiceDistributionSection', () => {
  it('When rendered, then shows all service bars', () => {
    // Arrange & Act
    render(<ServiceDistributionSection />);

    // Assert
    expect(screen.getByText('Consulta CPF')).toBeInTheDocument();
    expect(screen.getByText('Consulta CNPJ')).toBeInTheDocument();
    expect(screen.getByText('Consulta Veicular')).toBeInTheDocument();
    expect(screen.getByText('Consulta Criminal')).toBeInTheDocument();
    expect(screen.getByText('Consulta Endereço')).toBeInTheDocument();
    expect(screen.getByText('Consulta Telefone')).toBeInTheDocument();
  });
}); 