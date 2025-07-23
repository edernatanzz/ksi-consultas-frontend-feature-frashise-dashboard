import { render, screen } from '@testing-library/react';
import PartnerPerformanceSection from './PartnerPerformanceSection';
import React from 'react';

describe('PartnerPerformanceSection', () => {
  it('When rendered, then shows all partner bars', () => {
    // Arrange & Act
    render(<PartnerPerformanceSection />);

    // Assert
    expect(screen.getByText('TechSolutions LTDA')).toBeInTheDocument();
    expect(screen.getByText('DataCorp Sistemas')).toBeInTheDocument();
    expect(screen.getByText('AlphaSoft')).toBeInTheDocument();
    expect(screen.getByText('BetaConsult')).toBeInTheDocument();
  });
}); 