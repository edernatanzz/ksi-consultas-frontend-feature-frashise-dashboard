import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import Section from '../SectionConsultasBancarias';
import React from 'react';

describe('Section', () => {
  it('When title is provided, then it renders the title', () => {
    // Arrange
    const title = 'Título de Teste';

    // Act
    render(<Section title={title} />);

    // Assert
    expect(screen.getByTestId('section-title')).toHaveTextContent(title);
  });

  it('When icon is provided, then it renders the icon', () => {
    // Arrange
    const iconTestId = 'test-icon';
    const icon = <span data-testid={iconTestId}>🔥</span>;

    // Act
    render(<Section icon={icon} />);

    // Assert
    expect(screen.getByTestId(iconTestId)).toBeInTheDocument();
  });

  it('When children are provided, then it renders the children', () => {
    // Arrange
    const childTestId = 'child-element';
    const children = <div data-testid={childTestId}>Conteúdo</div>;

    // Act
    render(<Section>{children}</Section>);

    // Assert
    expect(screen.getByTestId(childTestId)).toBeInTheDocument();
  });

  it('When rendered, then it applies correct classes and styles', () => {
    // Act
    render(<Section />);

    // Assert
    const container = screen.getByTestId('section-container');
    expect(container).toHaveClass('flex', 'w-full', 'p-4', 'mb-2', 'rounded-lg', 'flex-col', 'bg-gray-100', 'border-l-4', 'border-l-primary-500');
    expect(container).toHaveStyle({ borderLeftStyle: 'solid' });
  });

  it('When no title, icon, or children are provided, then it still renders structure', () => {
    // Act
    render(<Section />);

    // Assert
    expect(screen.getByTestId('section-container')).toBeInTheDocument();
    expect(screen.getByTestId('section-header')).toBeInTheDocument();
    expect(screen.getByTestId('section-title')).toBeEmptyDOMElement();
  });
});
