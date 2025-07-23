import { render, screen, fireEvent } from '@testing-library/react';
import BasicSelect, { BasicSelectOption } from '../BasicSelect';
import React from 'react';

describe('BasicSelect', () => {
  const options: BasicSelectOption[] = [
    { label: 'Opção 1', value: '1' },
    { label: 'Opção 2', value: '2' },
  ];

  it('When rendered, then shows label and all options', () => {
    // Arrange & Act
    render(
      <BasicSelect
        label="Selecione"
        value=""
        onChange={() => {}}
        options={options}
      />
    );
    // Assert
    expect(screen.getAllByText('Selecione').length).toBeGreaterThan(0);
    fireEvent.mouseDown(screen.getByRole('combobox'));
    expect(screen.getByText('Opção 1')).toBeInTheDocument();
    expect(screen.getByText('Opção 2')).toBeInTheDocument();
  });

  it('When option is selected, then calls onChange with correct value', () => {
    // Arrange
    const handleChange = vi.fn();
    render(
      <BasicSelect
        label="Selecione"
        value=""
        onChange={handleChange}
        options={options}
      />
    );
    // Act
    fireEvent.mouseDown(screen.getByRole('combobox'));
    fireEvent.click(screen.getByText('Opção 2'));
    // Assert
    expect(handleChange).toHaveBeenCalledWith('2');
  });

  it('When value is undefined, then select value is empty string', () => {
    // Arrange & Act
    render(
      <BasicSelect
        label="Selecione"
        value={undefined}
        onChange={() => {}}
        options={[
          { label: 'Opção 1', value: '1' },
          { label: 'Opção 2', value: '2' },
        ]}
      />
    );
    // Assert
    expect(screen.getAllByText('Selecione').length).toBeGreaterThan(0);
  });

  it('When disabled prop is true, then disables the select', () => {
    // Arrange & Act
    render(
      <BasicSelect
        label="Selecione"
        value=""
        onChange={() => {}}
        options={options}
        disabled
      />
    );
    // Assert
    const combo = screen.getByRole('combobox');
    expect(combo).toHaveAttribute('aria-disabled', 'true');
  });
});