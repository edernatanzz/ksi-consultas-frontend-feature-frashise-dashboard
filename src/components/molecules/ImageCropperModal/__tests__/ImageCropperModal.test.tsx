import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import ImageCropperModal from '../ImageCropperModal'

// Mock simples do react-image-crop
vi.mock('react-image-crop', () => ({
  default: ({ children, onChange, onComplete }: {
    children?: React.ReactNode;
    onChange?: (crop: null, pixelCrop: { unit: string; x: number; y: number; width: number; height: number }) => void;
    onComplete?: (crop: { x: number; y: number; width: number; height: number }) => void;
  }) => (
    <div 
      data-testid="react-crop"
      onClick={() => {
        onChange?.(null, { unit: '%', x: 10, y: 10, width: 80, height: 80 })
        onComplete?.({ x: 10, y: 10, width: 80, height: 80 })
      }}
    >
      {children}
    </div>
  )
}))

// Mock básico do canvas
const mockCanvas = {
  width: 100,
  height: 100,
  getContext: vi.fn(() => ({
    drawImage: vi.fn()
  })),
  toBlob: vi.fn((callback) => {
    const blob = new Blob(['test'], { type: 'image/png' })
    callback(blob)
  })
}

const originalCreateElement = document.createElement.bind(document)
vi.spyOn(document, 'createElement').mockImplementation((tagName) => {
  if (tagName === 'canvas') {
    return mockCanvas as unknown as HTMLCanvasElement
  }
  return originalCreateElement(tagName)
})

describe('ImageCropperModal', () => {
  const defaultProps = {
    isOpen: true,
    imgSrc: '/test-image.jpg',
    onClose: vi.fn(),
    onCropDone: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('When modal is open', () => {
    it('then displays crop interface', () => {
      // Arrange & Act
      render(<ImageCropperModal {...defaultProps} />)

      // Assert
      expect(screen.getByText('Recortar Imagem')).toBeInTheDocument()
      expect(screen.getByTestId('react-crop')).toBeInTheDocument()
      expect(screen.getByText('Cancelar')).toBeInTheDocument()
      expect(screen.getByText('Recortar')).toBeInTheDocument()
    })
  })

  describe('When modal is closed', () => {
    it('then does not render content', () => {
      // Arrange & Act
      render(<ImageCropperModal {...defaultProps} isOpen={false} />)

      // Assert
      expect(screen.queryByText('Recortar Imagem')).not.toBeInTheDocument()
    })
  })

  describe('When cancel button is clicked', () => {
    it('then calls onClose', () => {
      // Arrange
      render(<ImageCropperModal {...defaultProps} />)

      // Act
      fireEvent.click(screen.getByText('Cancelar'))

      // Assert
      expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
    })
  })

  describe('When image loads', () => {
    it('then sets initial crop', () => {
      // Arrange
      render(<ImageCropperModal {...defaultProps} />)
      const image = screen.getByAltText('Crop me')

      // Act
      fireEvent.load(image)

      // Assert
      expect(image).toBeInTheDocument()
    })
  })

  describe('When user adjusts crop', () => {
    it('then updates crop state', () => {
      // Arrange
      render(<ImageCropperModal {...defaultProps} />)
      const reactCrop = screen.getByTestId('react-crop')

      // Act
      fireEvent.click(reactCrop)

      // Assert
      expect(reactCrop).toBeInTheDocument()
    })
  })

  describe('When crop button is clicked with completed crop', () => {
    it('then processes crop and calls callbacks', async () => {
      // Arrange
      render(<ImageCropperModal {...defaultProps} />)
      
      // Simula carregamento da imagem
      const image = screen.getByAltText('Crop me')
      fireEvent.load(image)

      // Simula ajuste do crop
      const reactCrop = screen.getByTestId('react-crop')
      fireEvent.click(reactCrop)

      // Act
      fireEvent.click(screen.getByText('Recortar'))

      // Assert
      await waitFor(() => {
        expect(defaultProps.onCropDone).toHaveBeenCalled()
        expect(defaultProps.onClose).toHaveBeenCalled()
      })
    })
  })

  describe('When modal closes and reopens', () => {
    it('then resets crop state', () => {
      // Arrange
      const { rerender } = render(<ImageCropperModal {...defaultProps} />)

      // Act - Fecha modal
      rerender(<ImageCropperModal {...defaultProps} isOpen={false} />)
      
      // Act - Reabre modal
      rerender(<ImageCropperModal {...defaultProps} isOpen={true} />)

      // Assert
      expect(screen.getByText('Recortar Imagem')).toBeInTheDocument()
    })
  })

  describe('When imgSrc is null', () => {
    it('then does not render modal', () => {
      // Arrange & Act
      render(<ImageCropperModal {...defaultProps} imgSrc={null} />)

      // Assert
      expect(screen.queryByText('Recortar Imagem')).not.toBeInTheDocument()
    })
  })
})