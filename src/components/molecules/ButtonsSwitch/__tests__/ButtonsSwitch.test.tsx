import { render, screen, fireEvent } from '@testing-library/react';
import ButtonsSwitch from '../ButtonsSwitch';
import React from 'react';

describe('ButtonsSwitch', () => {
  const options = [
    { label: 'Opção 1', value: '1' },
    { label: 'Opção 2', value: '2' },
  ];

  it('When rendered, then shows all options as buttons', () => {
    // Arrange & Act
    render(<ButtonsSwitch options={options} value="1" onChange={() => {}} />);
    // Assert
    expect(screen.getByText('Opção 1')).toBeInTheDocument();
    expect(screen.getByText('Opção 2')).toBeInTheDocument();
  });

  it('When value matches option, then applies selected style to the active button', () => {
    // Arrange & Act
    render(<ButtonsSwitch options={options} value="2" onChange={() => {}} />);
    // Assert
    const selectedButton = screen.getByText('Opção 2');
    expect(selectedButton).toBeInTheDocument();
  });

  it('When button is clicked, then calls onChange with correct value', () => {
    // Arrange
    const handleChange = vi.fn();
    render(<ButtonsSwitch options={options} value="1" onChange={handleChange} />);
    // Act
    fireEvent.click(screen.getByText('Opção 2'));
    // Assert
    expect(handleChange).toHaveBeenCalledWith('2');
  });
});