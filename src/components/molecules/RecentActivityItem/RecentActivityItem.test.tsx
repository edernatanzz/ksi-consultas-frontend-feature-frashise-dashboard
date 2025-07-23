import { render, screen } from '@testing-library/react';
import RecentActivityItem from './RecentActivityItem';

describe('RecentActivityItem', () => {
  it('When given all props, then renders text, detail and time', () => {
    // Arrange
    const props = {
      icon: <span>icon</span>,
      text: 'Atividade',
      detail: 'Detalhe',
      time: '1h atrás'
    };

    // Act
    render(<RecentActivityItem {...props} />);

    // Assert
    expect(screen.getByText('Atividade')).toBeInTheDocument();
    expect(screen.getByText('Detalhe')).toBeInTheDocument();
    expect(screen.getByText('1h atrás')).toBeInTheDocument();
  });
}); 