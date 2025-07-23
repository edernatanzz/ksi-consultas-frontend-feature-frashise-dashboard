import { render, screen } from '@testing-library/react';
import ServiceDistributionBar from './ServiceDistributionBar';

describe('ServiceDistributionBar', () => {
  it('When given label, value and percent, then renders all info', () => {
    // Arrange
    const props = { label: 'Consulta CPF', value: 1234, percent: 12.3, color: 'bg-red-500' };

    // Act
    render(<ServiceDistributionBar {...props} />);

    // Assert
    expect(screen.getByText('Consulta CPF')).toBeInTheDocument();
    expect(screen.getByText('R$ 1,234')).toBeInTheDocument();
    expect(screen.getByText('12.3%')).toBeInTheDocument();
  });
}); 