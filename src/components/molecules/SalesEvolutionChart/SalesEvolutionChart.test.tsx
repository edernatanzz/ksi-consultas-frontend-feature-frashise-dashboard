import { render } from '@testing-library/react';
import SalesEvolutionChart from './SalesEvolutionChart';

describe('SalesEvolutionChart', () => {
  it('When given data, then renders a bar chart', () => {
    // Arrange
    const data = [
      { label: 'Jan', value: 10 },
      { label: 'Fev', value: 20 },
    ];

    // Act
    const { container } = render(<SalesEvolutionChart data={data} />);

    // Assert
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
}); 