import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import Modal from '../Modal'

describe('Modal', () => {
  const mockOnClose = vi.fn()
  
  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    children: <div data-testid="modal-content">Modal Content</div>
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('When modal is open', () => {
    it('then renders modal with children', () => {
      // Arrange & Act
      render(<Modal {...defaultProps} />)

      // Assert
      expect(screen.getByTestId('modal-content')).toBeInTheDocument()
      expect(screen.getByText('Modal Content')).toBeInTheDocument()
    })

    it('then displays overlay with correct styling', () => {
      // Arrange & Act
      render(<Modal {...defaultProps} />)

      // Assert
      const overlay = document.querySelector('.fixed.inset-0')
      expect(overlay).toBeInTheDocument()
      expect(overlay).toHaveClass('z-50', 'bg-black', 'bg-opacity-50')
    })

    it('then displays modal container with correct styling', () => {
      // Arrange & Act
      render(<Modal {...defaultProps} />)

      // Assert
      const modalContainer = document.querySelector('.bg-white.rounded-lg')
      expect(modalContainer).toBeInTheDocument()
      expect(modalContainer).toHaveClass('shadow-xl', 'max-h-[90vh]', 'overflow-y-auto')
    })
  })

  describe('When modal is closed', () => {
    it('then does not render anything', () => {
      // Arrange & Act
      render(<Modal {...defaultProps} isOpen={false} />)

      // Assert
      expect(screen.queryByTestId('modal-content')).not.toBeInTheDocument()
      expect(document.querySelector('.fixed.inset-0')).not.toBeInTheDocument()
    })
  })

  describe('When clicking inside modal content', () => {
    it('then does not trigger any action', () => {
      // Arrange
      render(<Modal {...defaultProps} />)

      // Act
      const modalContent = document.querySelector('.bg-white.rounded-lg')
      fireEvent.click(modalContent!)

      // Assert
      expect(mockOnClose).not.toHaveBeenCalled()
    })
  })

  describe('When modal contains complex children', () => {
    it('then renders all children content', () => {
      // Arrange
      const complexChildren = (
        <div>
          <h1 data-testid="modal-title">Modal Title</h1>
          <p data-testid="modal-description">Modal Description</p>
          <button data-testid="modal-button">Action Button</button>
        </div>
      )

      // Act
      render(
        <Modal {...defaultProps}>
          {complexChildren}
        </Modal>
      )

      // Assert
      expect(screen.getByTestId('modal-title')).toBeInTheDocument()
      expect(screen.getByTestId('modal-description')).toBeInTheDocument()
      expect(screen.getByTestId('modal-button')).toBeInTheDocument()
    })
  })

  describe('When stopPropagation is called', () => {
    it('then prevents event bubbling on modal content click', () => {
      // Arrange
      const mockStopPropagation = vi.fn()
      render(<Modal {...defaultProps} />)

      // Act
      const modalContent = document.querySelector('.bg-white.rounded-lg')
      const clickEvent = new MouseEvent('click', { bubbles: true })
      clickEvent.stopPropagation = mockStopPropagation
      
      modalContent?.dispatchEvent(clickEvent)

      // Assert
      expect(mockStopPropagation).toHaveBeenCalled()
    })
  })
})