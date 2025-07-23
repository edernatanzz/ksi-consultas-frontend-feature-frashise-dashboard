import { render, screen } from '@testing-library/react';
import Table, { TableColumn } from '../Table';
import React from 'react';

describe('Table', () => {
  const columns: TableColumn[] = [
    { key: 'name', label: 'Nome' },
    { key: 'age', label: 'Idade' },
    { key: 'city', label: 'Cidade' },
  ];

  const data = [
    { name: 'João', age: 30, city: 'São Paulo' },
    { name: 'Maria', age: 25, city: 'Rio de Janeiro' },
  ];

  it('When rendered, then shows table headers', () => {
    // Arrange & Act
    render(<Table columns={columns} data={data} />);
    // Assert
    expect(screen.getByText('Nome')).toBeInTheDocument();
    expect(screen.getByText('Idade')).toBeInTheDocument();
    expect(screen.getByText('Cidade')).toBeInTheDocument();
  });

  it('When rendered with data, then shows table rows and cells', () => {
    // Arrange & Act
    render(<Table columns={columns} data={data} />);
    // Assert
    expect(screen.getByText('João')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('Maria')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('São Paulo')).toBeInTheDocument();
    expect(screen.getByText('Rio de Janeiro')).toBeInTheDocument();
  });

  it('When data is empty, then shows empty state message', () => {
    // Arrange & Act
    render(<Table columns={columns} data={[]} />);
    // Assert
    expect(screen.getByText('Nenhum dado encontrado.')).toBeInTheDocument();
  });

  it('When column has render function, then renders custom cell content', () => {
    // Arrange
    const customColumns: TableColumn[] = [
      ...columns,
      {
        key: 'actions',
        label: 'Ações',
        render: (value, row) => <button>Editar {row.name}</button>,
      },
    ];
    // Act
    render(<Table columns={customColumns} data={data} />);
    // Assert
    expect(screen.getByText('Editar João')).toBeInTheDocument();
    expect(screen.getByText('Editar Maria')).toBeInTheDocument();
  });
});