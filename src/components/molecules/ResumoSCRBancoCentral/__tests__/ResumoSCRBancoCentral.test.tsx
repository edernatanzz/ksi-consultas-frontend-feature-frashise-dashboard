import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Resumo from '../ResumoSCRBancoCentral';
import type { TableColumn } from '@/components/atoms/TableBancario/TableBancario';

// Mock dos ícones e da tabela
vi.mock('@mui/icons-material/ExpandLess', () => ({
  default: vi.fn((props) => <div data-testid="resumo-expand-less-icon" {...props} />),
}));

vi.mock('@mui/icons-material/ExpandMore', () => ({
  default: vi.fn((props) => <div data-testid="resumo-expand-more-icon" {...props} />),
}));

vi.mock('@/components/atoms/TableCredito/TableCredito', () => ({
  default: vi.fn(() => <div data-testid="mock-table" />),
}));

// Dados mockados para os testes
const mockColumns: TableColumn[] = [
  { key: 'name', label: 'Nome' },
  { key: 'value', label: 'Valor' },
];

const mockData = [
  { name: 'Item 1', value: 'R$ 100,00' },
  { name: 'Item 2', value: 'R$ 200,00' },
];


describe('Resumo Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('When rendered, then should display the title and expand less icon', () => {
    // Arrange
    render(<Resumo columns={mockColumns} data={mockData} />);

    // Act
    const titleElement = screen.getByTestId('resumo-title');
    const expandLessIcon = screen.getByTestId('resumo-expand-less-icon');

    // Assert
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent('Resumo');
    expect(expandLessIcon).toBeInTheDocument();
  });

  it('When expanded is false, then table should not be visible', () => {
    // Arrange
    render(<Resumo columns={mockColumns} data={mockData} />);

    // Act
    const tableContainer = screen.queryByTestId('resumo-table-container');

    // Assert
    expect(tableContainer).not.toBeInTheDocument();
  });

  it('When expand less icon is clicked, then should show table and change to expand more icon', () => {
    // Arrange
    render(<Resumo columns={mockColumns} data={mockData} />);

    // Act
    const expandLessIcon = screen.getByTestId('resumo-expand-less-icon');
    fireEvent.click(expandLessIcon);

    // Assert
    const tableContainer = screen.getByTestId('resumo-table-container');
    const expandMoreIcon = screen.getByTestId('resumo-expand-more-icon');
    expect(tableContainer).toBeInTheDocument();
    expect(expandMoreIcon).toBeInTheDocument();
  });

  it('When expand more icon is clicked, then should hide table and change to expand less icon', () => {
    // Arrange
    render(<Resumo columns={mockColumns} data={mockData} />);
    const expandLessIcon = screen.getByTestId('resumo-expand-less-icon');
    fireEvent.click(expandLessIcon); // Expande primeiro

    // Act
    const expandMoreIcon = screen.getByTestId('resumo-expand-more-icon');
    fireEvent.click(expandMoreIcon);

    // Assert
    const tableContainer = screen.queryByTestId('resumo-table-container');
    const newExpandLessIcon = screen.getByTestId('resumo-expand-less-icon');
    expect(tableContainer).not.toBeInTheDocument();
    expect(newExpandLessIcon).toBeInTheDocument();
  });

  // it('When expanded, then should render Table component with correct props', () => {
  //   // Arrange
  //   render(<Resumo columns={mockColumns} data={mockData} />);
  //   const expandLessIcon = screen.getByTestId('resumo-expand-less-icon');

  //   // Act
  //   fireEvent.click(expandLessIcon);

  //   // Assert
  //   expect(MockedTable).toHaveBeenCalled();
  //   const lastCall = MockedTable.mock.calls[0];
  //   expect(lastCall[0]).toEqual({ columns: mockColumns, data: mockData });
  // });


  it('When rendered, then should have correct styling classes', () => {
    // Arrange
    render(<Resumo columns={mockColumns} data={mockData} />);

    // Act
    const container = screen.getByTestId('resumo-container');

    // Assert
    expect(container).toHaveClass('bg-gray-100');
    expect(container).toHaveClass('border-l-4');
    expect(container).toHaveClass('border-l-primary-500');
    expect(container).toHaveClass('rounded-lg');
  });

  it('When expanded state changes, then should toggle the table visibility', () => {
    // Arrange
    render(<Resumo columns={mockColumns} data={mockData} />);

    // Act - First click (expand)
    const firstIcon = screen.getByTestId('resumo-expand-less-icon');
    fireEvent.click(firstIcon);
    const tableAfterFirstClick = screen.getByTestId('resumo-table-container');

    // Assert
    expect(tableAfterFirstClick).toBeInTheDocument();

    // Act - Second click (collapse)
    const secondIcon = screen.getByTestId('resumo-expand-more-icon');
    fireEvent.click(secondIcon);

    // Assert
    expect(screen.queryByTestId('resumo-table-container')).not.toBeInTheDocument();
  });
});