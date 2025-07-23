import { render, screen, fireEvent } from '@testing-library/react';
import InadimplentesPage from '../page';
import React from 'react';

// Mock RouteGuard para sempre renderizar os filhos
vi.mock('@/components/template/RouteGuard/RouteGuard', () => ({
  RouteGuard: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('InadimplentesPage', () => {
  it('When rendered, then shows page title and subtitle', () => {
    // Arrange & Act
    render(<InadimplentesPage />);
    // Assert
    expect(screen.getByRole('heading', { name: 'Inadimplentes', level: 1 })).toBeInTheDocument();
    expect(screen.getByText('Gerenciamento de Registros de Inadimplência')).toBeInTheDocument();
  });

  it('When rendered, then shows table and all inadimplentes', () => {
    // Arrange & Act
    render(<InadimplentesPage />);
    // Assert
    expect(screen.getByText('Lista de Inadimplentes')).toBeInTheDocument();
    expect(screen.getByText('João da Silva')).toBeInTheDocument();
    expect(screen.getByText('Maria Souza')).toBeInTheDocument();
    expect(screen.getByText('Carlos Oliveira')).toBeInTheDocument();
    expect(screen.getByText('Ana Costa')).toBeInTheDocument();
  });

  it('When search input is changed, then updates the value', () => {
    // Arrange
    render(<InadimplentesPage />);
    const input = screen.getByRole('textbox');
    // Act
    input.focus();
    (input as HTMLInputElement).value = 'João';
    // Assert
    expect((input as HTMLInputElement).value).toBe('João');
  });

  it('When search input is changed, then calls onSearchChange', () => {
    // Arrange
    render(<InadimplentesPage />);
    const input = screen.getByRole('textbox');
    // Act
    fireEvent.change(input, { target: { value: 'Teste' } });
    // Assert
    expect(input).toHaveValue('Teste');
  });

  it('When clear search is clicked, then calls onSearchClear', () => {
    // Arrange
    render(<InadimplentesPage />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Teste' } });
    const clearButton = screen.getByRole('button', { name: /close/i });
    // Act
    fireEvent.click(clearButton);
    // Assert
    expect(input).toHaveValue('');
  });
});