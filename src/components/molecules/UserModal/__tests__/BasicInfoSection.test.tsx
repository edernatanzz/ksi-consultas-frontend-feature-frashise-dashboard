import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import BasicInfoSection from '../BasicInfoSection'

describe('BasicInfoSection', () => {
  const defaultProps = {
    formData: {
      name: 'João Silva',
      email: 'joao@ksi.com',
      department: 'TI'
    },
    isReadOnly: false,
    showPassword: false,
    generatedPassword: '123456',
    onInputChange: vi.fn(),
    onTogglePassword: vi.fn(),
    onGeneratePassword: vi.fn(),
    onCopyPassword: vi.fn(),
    onImageChange: vi.fn(),
    setGeneratedPassword: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('When component renders', () => {
    it('then displays form fields', () => {
      // Arrange & Act
      render(<BasicInfoSection {...defaultProps} />)

      // Assert
      expect(screen.getByPlaceholderText('Digite o nome completo')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('usuario@ksi.com.br')).toBeInTheDocument()
      expect(screen.getByText('Alterar Foto')).toBeInTheDocument()
    })
  })

  describe('When user types in name field', () => {
    it('then calls onInputChange', () => {
      // Arrange
      render(<BasicInfoSection {...defaultProps} />)
      const nameInput = screen.getByPlaceholderText('Digite o nome completo')

      // Act
      fireEvent.change(nameInput, { target: { value: 'Maria Santos' } })

      // Assert
      expect(defaultProps.onInputChange).toHaveBeenCalledWith('name', 'Maria Santos')
    })
  })

  describe('When user is new', () => {
    it('then shows password section', () => {
      // Arrange & Act
      render(<BasicInfoSection {...defaultProps} />)

      // Assert
      expect(screen.getByText('Senha Temporária')).toBeInTheDocument()
      expect(screen.getByText('Copiar')).toBeInTheDocument()
    })
  })
})