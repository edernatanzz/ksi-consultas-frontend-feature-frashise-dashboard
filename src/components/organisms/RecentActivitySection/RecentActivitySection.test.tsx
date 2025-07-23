import { render, screen } from '@testing-library/react';
import RecentActivitySection from './RecentActivitySection';
import React from 'react';

describe('RecentActivitySection', () => {
  it('When rendered, then shows all recent activities', () => {
    // Arrange & Act
    render(<RecentActivitySection />);

    // Assert
    expect(screen.getByText('Novo parceiro adicionado')).toBeInTheDocument();
    expect(screen.getByText('Relatório gerado')).toBeInTheDocument();
    expect(screen.getByText('Créditos adicionados')).toBeInTheDocument();
  });
}); 