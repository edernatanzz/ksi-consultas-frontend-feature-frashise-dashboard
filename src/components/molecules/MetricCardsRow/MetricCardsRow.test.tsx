import { render, screen } from '@testing-library/react';
import MetricCardsRow from './MetricCardsRow';
import React from 'react';

describe('MetricCardsRow', () => {
  it('When metrics are provided, then renders all MetricCards', () => {
    // Arrange
    const metrics = [
      { icon: <span>icon1</span>, label: 'Métrica 1', value: '10', valueColor: 'text-black' },
      { icon: <span>icon2</span>, label: 'Métrica 2', value: '20', valueColor: 'text-black' },
    ];

    // Act
    render(<MetricCardsRow metrics={metrics} />);

    // Assert
    expect(screen.getByText('Métrica 1')).toBeInTheDocument();
    expect(screen.getByText('Métrica 2')).toBeInTheDocument();
    expect(screen.getAllByText('10').length).toBeGreaterThan(0);
    expect(screen.getAllByText('20').length).toBeGreaterThan(0);
  });
}); 