import { describe, it, vi, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ClearModal from '../ClearModal';

describe('ClearModal', () => {
  it('When title is provided, then it renders the title', () => {
    // Arrange
    const title = 'Modal Title';

    render(
      <ClearModal title={title} Children={<div>Modal Content</div>} />
    );

    // Assert
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('When Children is provided, then it renders the content', () => {
    // Arrange
    const content = 'Test modal content';

    render(
      <ClearModal title="Test" Children={<div>{content}</div>} />
    );

    // Assert
    expect(screen.getByText(content)).toBeInTheDocument();
  });

  it('When onClose is provided and close button is clicked, then it calls onClose', () => {
    // Arrange
    const onCloseMock = vi.fn();

    render(
      <ClearModal
        title="Test"
        Children={<div>Test content</div>}
        onClose={onCloseMock}
      />
    );

    // Act
    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    // Assert
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('When onClose is not provided, then close button is not rendered', () => {
    // Arrange & Act
    render(
      <ClearModal title="No Close" Children={<div>Content</div>} />
    );

    // Assert
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
