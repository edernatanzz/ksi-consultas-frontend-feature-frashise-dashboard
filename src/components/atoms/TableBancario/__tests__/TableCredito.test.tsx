import { render, screen } from '@testing-library/react';
import Table, { TableProps, TableColumn } from '../TableBancario';
import { describe, it, expect } from 'vitest';
import React from 'react';

const defaultColumns: TableColumn[] = [
  { key: 'name', label: 'Nome' },
  { key: 'age', label: 'Idade', align: 'center' },
];

const defaultData = [
  { name: 'João', age: 30 },
  { name: 'Maria', age: 25 },
];

describe('Table', () => {
  it('When data is provided, then it renders rows correctly', () => {
    const props: TableProps = {
      columns: defaultColumns,
      data: defaultData,
    };

    render(<Table {...props} />);

    expect(screen.getByText('Nome')).toBeInTheDocument();
    expect(screen.getByText('Idade')).toBeInTheDocument();
    expect(screen.getByText('João')).toBeInTheDocument();
    expect(screen.getByText('Maria')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
  });

  it('When no data is provided, then it shows empty state', () => {
    const props: TableProps = {
      columns: defaultColumns,
      data: [],
    };

    render(<Table {...props} />);

    expect(screen.getByText('Nenhum dado encontrado')).toBeInTheDocument();
    expect(
      screen.getByText('Não há registros para exibir nesta tabela.')
    ).toBeInTheDocument();
  });

  it('When render function is provided, then it uses custom renderer', () => {
    const columns: TableColumn[] = [
      {
        key: 'name',
        label: 'Nome',
        render: (value) => <span data-testid="custom-render">{value}-custom</span>,
      },
    ];

    const data = [{ name: 'Carlos' }];

    render(<Table columns={columns} data={data} />);

    expect(screen.getByTestId('custom-render')).toHaveTextContent('Carlos-custom');
  });

  it('When icon is provided in column, then it renders icon with label', () => {
    const Icon = <span data-testid="icon">*</span>;
    const columns: TableColumn[] = [
      {
        key: 'iconCol',
        label: 'Com Ícone',
        icon: Icon,
      },
    ];

    const data = [{ iconCol: 'Teste' }];

    render(<Table columns={columns} data={data} />);

    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByText('Com Ícone')).toBeInTheDocument();
    expect(screen.getByText('Teste')).toBeInTheDocument();
  });

  it('When align is specified, then it applies correct alignment', () => {
    const columns: TableColumn[] = [
      { key: 'left', label: 'Esquerda', align: 'left' },
      { key: 'center', label: 'Centro', align: 'center' },
      { key: 'right', label: 'Direita', align: 'right' },
    ];

    const data = [{ left: 'A', center: 'B', right: 'C' }];

    render(<Table columns={columns} data={data} />);

    const cells = screen.getAllByRole('cell');
    expect(cells[0]).toHaveTextContent('A');
    expect(cells[1]).toHaveTextContent('B');
    expect(cells[2]).toHaveTextContent('C');
    expect(cells[0]).toHaveStyle('text-align: left');
    expect(cells[1]).toHaveStyle('text-align: center');
    expect(cells[2]).toHaveStyle('text-align: right');
  });
});
