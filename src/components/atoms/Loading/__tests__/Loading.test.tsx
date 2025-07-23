import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Loading from '../Loading';

describe('Loading Component', () => {
  it('should render loading spinner with default message', () => {
    render(<Loading />);
    
    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });

  it('should render custom message', () => {
    const customMessage = 'Processando dados...';
    render(<Loading message={customMessage} />);
    
    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });

  it('should apply fullScreen classes when fullScreen is true', () => {
    const { container } = render(<Loading fullScreen={true} />);
    
    expect(container.firstChild).toHaveClass('min-h-screen', 'bg-gray-50');
  });

  it('should not render message when message is empty', () => {
    render(<Loading message="" />);
    
    expect(screen.queryByText(/carregando/i)).not.toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const customClass = 'custom-loading';
    const { container } = render(<Loading className={customClass} />);
    
    expect(container.firstChild).toHaveClass(customClass);
  });
});
