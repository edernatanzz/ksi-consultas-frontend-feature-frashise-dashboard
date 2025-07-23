import { render, screen } from '@testing-library/react';
import QuickActionsList from './QuickActionsList';
import { Plus } from 'lucide-react';

describe('QuickActionsList', () => {
  it('When actions are provided, then renders all ActionButtons', () => {
    // Arrange
    const actions = [
      { icon: Plus, label: 'Ação 1', variant: 'primary' as const, onClick: () => {} },
      { icon: Plus, label: 'Ação 2', variant: 'secondary' as const, onClick: () => {} },
    ];

    // Act
    render(<QuickActionsList actions={actions} />);

    // Assert
    expect(screen.getByText('Ação 1')).toBeInTheDocument();
    expect(screen.getByText('Ação 2')).toBeInTheDocument();
  });
}); 