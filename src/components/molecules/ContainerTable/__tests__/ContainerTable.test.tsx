import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ContainerTable from '../ContainerTable';
import type { TableColumn } from '@/components/atoms/TableBancario/TableBancario';
import ChartBarIcon from '@mui/icons-material/BarChart';

const mockColumns: TableColumn[] = [
  { key: 'col1', label: 'Coluna 1' },
  { key: 'col2', label: 'Coluna 2' }
];

const mockData = [
  { col1: 'Dado 1A', col2: 'Dado 1B' },
  { col1: 'Dado 2A', col2: 'Dado 2B' }
];

describe('ContainerTable', () => {
  it('When rendered with required props, then displays table container', () => {
    // Arrange & Act
    render(<ContainerTable data={mockData} columns={mockColumns} />);

    // Assert
    expect(screen.getByTestId('table-container')).toBeInTheDocument();
    expect(screen.getByTestId('table')).toBeInTheDocument();
  });

  it('When title and description are provided, then displays them correctly', () => {
    // Arrange
    const title = 'Título de Teste';
    const description = 'Descrição de Teste';

    // Act
    render(
      <ContainerTable
        data={mockData}
        columns={mockColumns}
        title={title}
        description={description}
      />
    );

    // Assert
    expect(screen.getByTestId('table-title')).toHaveTextContent(title);
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it('When icon is provided, then it renders the icon', () => {
    // Arrange
    const icon = <ChartBarIcon data-testid="icon-test" />;

    // Act
    render(
      <ContainerTable
        data={mockData}
        columns={mockColumns}
        icon={icon}
        title="Com Ícone"
      />
    );

    // Assert
    expect(screen.getByTestId('icon-test')).toBeInTheDocument();
  });

  it('When titleTag is passed as h4, then it renders the correct heading tag', () => {
    // Arrange & Act
    render(
      <ContainerTable
        data={mockData}
        columns={mockColumns}
        title="Título H4"
        titleTag="h4"
      />
    );

    // Assert
    const heading = screen.getByTestId('table-title');
    expect(heading.tagName.toLowerCase()).toBe('h4');
  });

  it('When no icon, title, or description are provided, then only renders table', () => {
    // Arrange & Act
    render(<ContainerTable data={mockData} columns={mockColumns} />);

    // Assert
    expect(screen.getByTestId('table-title')).toBeEmptyDOMElement();
    expect(screen.queryByText(/descrição/i)).not.toBeInTheDocument();
  });

  it('When rendered with default titleTag, then uses h2 tag', () => {
    // Arrange & Act
    render(
      <ContainerTable
        data={mockData}
        columns={mockColumns}
        title="Título Padrão"
      />
    );

    // Assert
    const heading = screen.getByTestId('table-title');
    expect(heading.tagName.toLowerCase()).toBe('h2');
  });

  it('When data is empty, then still renders table structure', () => {
    // Arrange & Act
    render(
      <ContainerTable
        data={[]}
        columns={mockColumns}
        title="Tabela Vazia"
      />
    );

    // Assert
    expect(screen.getByTestId('table-container')).toBeInTheDocument();
    expect(screen.getByTestId('table')).toBeInTheDocument();
    expect(screen.getByTestId('table-title')).toHaveTextContent('Tabela Vazia');
  });

  it('When description is provided without title, then renders description only', () => {
    // Arrange
    const description = 'Apenas descrição';

    // Act
    render(
      <ContainerTable
        data={mockData}
        columns={mockColumns}
        description={description}
      />
    );

    // Assert
    expect(screen.getByText(description)).toBeInTheDocument();
    expect(screen.getByTestId('table-title')).toBeEmptyDOMElement();
  });
});
