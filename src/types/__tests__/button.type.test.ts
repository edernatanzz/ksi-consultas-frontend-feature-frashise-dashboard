import React from 'react';
import { KSIButtonProps } from '@/types/button.types';

describe('Button Types', () => {
  test('KSIButtonProps interface has required properties', () => {
   
    const props: KSIButtonProps = {
      children: 'Test Button'
    };
    
    expect('children' in props).toBe(true);
    
    const fullProps: KSIButtonProps = {
      children: 'Full Props Button',
      onClick: () => {},
      loading: true,
      disabled: true,
      fullWidth: true,
      startIcon: React.createElement('span', null, 'Start'),
      endIcon: React.createElement('span', null, 'End'),
      size: 'medium'
    };
    
    expect('onClick' in fullProps).toBe(true);
    expect('loading' in fullProps).toBe(true);
    expect('disabled' in fullProps).toBe(true);
    expect('fullWidth' in fullProps).toBe(true);
    expect('startIcon' in fullProps).toBe(true);
    expect('endIcon' in fullProps).toBe(true);
    expect('size' in fullProps).toBe(true);
  });
  
  test('size property accepts valid values', () => {
    const smallButton: KSIButtonProps = {
      children: 'Small Button',
      size: 'small'
    };
    
    const mediumButton: KSIButtonProps = {
      children: 'Medium Button',
      size: 'medium'
    };
    
    const largeButton: KSIButtonProps = {
      children: 'Large Button',
      size: 'large'
    };
    
    expect(smallButton.size).toBe('small');
    expect(mediumButton.size).toBe('medium');
    expect(largeButton.size).toBe('large');
    
  });
});