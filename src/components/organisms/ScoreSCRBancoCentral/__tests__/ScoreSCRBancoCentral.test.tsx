import { render, screen } from '@testing-library/react';
import Score from '../ScoreSCRBancoCentral';
import { describe, it, expect } from 'vitest';

const scoreCases = [
  { score: 100, expectedText: 'Péssimo', expectedClass: 'bg-red-800', testId: 'score-range-pessimo' },
  { score: 300, expectedText: 'Ruim', expectedClass: 'bg-red-500', testId: 'score-range-ruim' },
  { score: 500, expectedText: 'Regular', expectedClass: 'bg-orange-400', testId: 'score-range-regular' },
  { score: 700, expectedText: 'Bom', expectedClass: 'bg-green-800', testId: 'score-range-bom' },
  { score: 900, expectedText: 'Ótimo', expectedClass: 'bg-green-500', testId: 'score-range-otimo' },
];

describe('Score component', () => {
  scoreCases.forEach(({ score, expectedText, expectedClass }) => {
    it(`When score is ${score}, then it renders badge with text "${expectedText}" and correct class`, () => {
      // Arrange
      render(<Score score={score} />);

      // Act
      const badgeContainer = screen.getByTestId('score-badge');
      const badgeElement = badgeContainer.querySelector('span');

      // Assert
      expect(badgeContainer).toBeInTheDocument();
      expect(badgeContainer).toHaveTextContent(expectedText);
      expect(badgeElement).toHaveClass(expectedClass);
      expect(badgeElement).toHaveClass('text-white');
    });
  });

  it('When rendered, then it shows Medidor and Badge inside score content', () => {
    // Arrange
    render(<Score score={450} />);

    // Act
    const container = screen.getByTestId('score-container');
    const content = screen.getByTestId('score-content');
    const medidor = screen.getByTestId('score-medidor');
    const badge = screen.getByTestId('score-badge');

    // Assert
    expect(container).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(medidor).toBeInTheDocument();
    expect(badge).toBeInTheDocument();
  });

  it('When rendered, then it shows all score range legends with correct labels', () => {
    // Arrange
    render(<Score score={100} />);

    // Assert
    expect(screen.getByTestId('score-range-pessimo')).toHaveTextContent('Péssimo: 0 a 200');
    expect(screen.getByTestId('score-range-ruim')).toHaveTextContent('Ruim: 201 a 400');
    expect(screen.getByTestId('score-range-regular')).toHaveTextContent('Regular: 401 a 600');
    expect(screen.getByTestId('score-range-bom')).toHaveTextContent('Bom: 601 a 800');
    expect(screen.getByTestId('score-range-otimo')).toHaveTextContent('Ótimo: 801 a 1000');
  });
});
