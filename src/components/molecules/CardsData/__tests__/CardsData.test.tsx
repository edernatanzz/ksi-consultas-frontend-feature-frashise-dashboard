import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import { CardsData } from '../CardsData';
import type { DashboardCard } from '@/data/dashboard';

// Mock de dados
const mockDataCards: DashboardCard[] = [
  {
    id: '1',
    path: '/star',
    icon: 'star',
    title: 'Título 1',
    subtitle: 'Subtítulo 1',
  },
  {
    id: '2',
    path: '/analytics',
    icon: 'analytics',
    title: 'Título 2',
    subtitle: 'Subtítulo 2',
  },
];

describe('CardsData', () => {
  it('When rendered with dataCards, then it shows all cards with correct content', () => {
    // Arrange
    render(<CardsData dataCards={mockDataCards} />);

    // Assert
    const container = screen.getByTestId('cards-data-container');
    expect(container).toBeInTheDocument();

    mockDataCards.forEach((card, idx) => {
      expect(screen.getByTestId(`dashboard-card-${idx}`)).toBeInTheDocument();
      expect(screen.getByTestId(`card-content-${idx}`)).toBeInTheDocument();
      expect(screen.getByTestId(`card-inner-${idx}`)).toBeInTheDocument();
      expect(screen.getByTestId(`card-icon-container-${idx}`)).toBeInTheDocument();
      expect(screen.getByTestId(`card-icon-${idx}`)).toHaveTextContent(card.icon);
      expect(screen.getByTestId(`card-text-container-${idx}`)).toBeInTheDocument();
      expect(screen.getByTestId(`card-title-${idx}`)).toHaveTextContent(card.title);
      expect(screen.getByTestId(`card-subtitle-${idx}`)).toHaveTextContent(card.subtitle);
    });
  });

  it('When dataCards is empty, then it renders no cards', () => {
    // Arrange
    render(<CardsData dataCards={[]} />);

    // Assert
    expect(screen.getByTestId('cards-data-container')).toBeInTheDocument();
    expect(screen.queryByTestId('dashboard-card-0')).not.toBeInTheDocument();
  });

  it('When rendered, then it wraps each card in a div with correct test ID', () => {
    // Arrange
    render(<CardsData dataCards={mockDataCards} />);

    // Assert
    mockDataCards.forEach((_, idx) => {
      expect(screen.getByTestId(`card-wrapper-${idx}`)).toBeInTheDocument();
    });
  });
});
