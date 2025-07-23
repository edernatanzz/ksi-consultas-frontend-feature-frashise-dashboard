import { render, screen, fireEvent } from '@testing-library/react';
import BasicMenu, { MenuOption } from '../BasicMenu';
import React from 'react';

describe('BasicMenu', () => {
  const options: MenuOption[] = [
    { label: 'Opção 1', onClick: vi.fn() },
    { label: 'Opção 2', onClick: vi.fn(), disabled: true },
    { label: 'Opção 3', onClick: vi.fn() },
  ];

  it('When rendered, then shows IconButton and default icon', () => {
    // Arrange & Act
    render(<BasicMenu options={options} />);
    // Assert
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByTestId('MoreHorizIcon')).toBeInTheDocument();
  });

  it('When custom icon is provided, then renders it', () => {
    // Arrange & Act
    render(
      <BasicMenu
        options={options}
        icon={<span data-testid="custom-icon">icon</span>}
      />
    );
    // Assert
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('When menu is opened, then shows all options', () => {
    // Arrange
    render(<BasicMenu options={options} />);
    // Act
    fireEvent.click(screen.getByRole('button'));
    // Assert
    expect(screen.getByText('Opção 1')).toBeInTheDocument();
    expect(screen.getByText('Opção 2')).toBeInTheDocument();
    expect(screen.getByText('Opção 3')).toBeInTheDocument();
  });

  it('When enabled option is clicked, then calls onClick and closes menu', () => {
    // Arrange
    render(<BasicMenu options={options} />);
    fireEvent.click(screen.getByRole('button'));
    // Act
    fireEvent.click(screen.getByText('Opção 1'));
    // Assert
    expect(options[0].onClick).toHaveBeenCalled();
    // O menu deve fechar após o clique (não está mais visível)
    expect(screen.queryByText('Opção 1')).not.toBeVisible();
  });

  it('When disabled option is clicked, then does not call onClick', () => {
    // Arrange
    render(<BasicMenu options={options} />);
    fireEvent.click(screen.getByRole('button'));
    // Act
    fireEvent.click(screen.getByText('Opção 2'));
    // Assert
    expect(options[1].onClick).not.toHaveBeenCalled();
  });

  it('When disabled option is clicked, then menu stays open and onClick is not called', () => {
    // Arrange
    render(<BasicMenu options={[
      { label: 'Opção 1', onClick: vi.fn() },
      { label: 'Opção 2', onClick: vi.fn(), disabled: true }
    ]} />);
    fireEvent.click(screen.getByRole('button')); // abre o menu
  
    // Act
    fireEvent.click(screen.getByText('Opção 2'));
  
    // Assert
    expect(screen.getByText('Opção 2')).toBeVisible(); // menu não fecha
    expect(screen.getByText('Opção 1')).toBeVisible();
  });

  it('When option has icon, then renders the icon', () => {
    // Arrange
    render(
      <BasicMenu
        options={[
          { label: 'Com ícone', onClick: vi.fn(), icon: <span data-testid="custom-option-icon">icon</span> },
          { label: 'Sem ícone', onClick: vi.fn() }
        ]}
      />
    );
    fireEvent.click(screen.getByRole('button')); // abre o menu
  
    // Assert
    expect(screen.getByTestId('custom-option-icon')).toBeInTheDocument();
  });

  it('When iconButtonProps is passed, then IconButton receives the props', () => {
    // Arrange & Act
    render(<BasicMenu options={options} iconButtonProps={{ 'aria-label': 'menu-mais' }} />);
    // Assert
    expect(screen.getByLabelText('menu-mais')).toBeInTheDocument();
  });
});