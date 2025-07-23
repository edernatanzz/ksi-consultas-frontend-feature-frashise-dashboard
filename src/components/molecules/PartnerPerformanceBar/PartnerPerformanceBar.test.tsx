import { render, screen } from '@testing-library/react';
import PartnerPerformanceBar from './PartnerPerformanceBar';
import React from 'react';

describe('PartnerPerformanceBar', () => {
  it('When given name and value, then renders partner name and percentage', () => {
    // Arrange
    const name = 'Parceiro X';
    const value = 80;

    // Act
    render(<PartnerPerformanceBar name={name} value={value} />);

    // Assert
    expect(screen.getByText('Parceiro X')).toBeInTheDocument();
    expect(screen.getByText('80%')).toBeInTheDocument();
  });
}); 