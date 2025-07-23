import { render, screen } from '@testing-library/react';
import TableSection from '../TableSection';
import React from 'react';

describe('TableSection', () => {
  const columns = [
    { key: 'name', label: 'Nome' },
    { key: 'age', label: 'Idade' },
  ];

  const data = [
    { name: 'João', age: 30 },
    { name: 'Maria', age: 25 },
  ];

  it('When title is provided, then renders the title', () => {
    // Arrange & Act
    render(<TableSection title="Minha Tabela" columns={columns} data={data} />);
    // Assert
    expect(screen.getByText('Minha Tabela')).toBeInTheDocument();
  });

  it('When title is not provided, then does not render the title', () => {
    // Arrange & Act
    render(<TableSection columns={columns} data={data} />);
    // Assert
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('When rendered, then shows table headers and data', () => {
    // Arrange & Act
    render(<TableSection columns={columns} data={data} />);
    // Assert
    expect(screen.getByText('Nome')).toBeInTheDocument();
    expect(screen.getByText('Idade')).toBeInTheDocument();
    expect(screen.getByText('João')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('Maria')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
  });
});