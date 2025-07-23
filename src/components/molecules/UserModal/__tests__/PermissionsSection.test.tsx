import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import PermissionsSection from '../PermissionsSection'

describe('PermissionsSection', () => {
  const defaultProps = {
    formData: {
      profile: 'support' as const,
      hasCustomPermissions: false
    },
    isReadOnly: false,
    customPermissions: ['dashboard', 'monitoring'],
    onProfileChange: vi.fn(),
    onToggleCustomPermissions: vi.fn(),
    onTogglePermission: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('When component renders', () => {
    it('then displays profile buttons and modules', () => {
      // Arrange & Act
      render(<PermissionsSection {...defaultProps} />)

      // Assert
      expect(screen.getByText('Perfil Base')).toBeInTheDocument()
      expect(screen.getByText('Administrador')).toBeInTheDocument()
      expect(screen.getByText('Suporte')).toBeInTheDocument()
      expect(screen.getByText('Permissões Customizadas')).toBeInTheDocument()
      expect(screen.getByText('Dashboard')).toBeInTheDocument()
    })
  })

  describe('When user clicks profile button', () => {
    it('then calls onProfileChange', () => {
      // Arrange
      render(<PermissionsSection {...defaultProps} />)
      const adminButton = screen.getByText('Administrador')

      // Act
      fireEvent.click(adminButton)

      // Assert
      expect(defaultProps.onProfileChange).toHaveBeenCalledWith('admin')
    })
  })

  describe('When user toggles custom permissions', () => {
    it('then calls onToggleCustomPermissions', () => {
      // Arrange
      render(<PermissionsSection {...defaultProps} />)
      const toggleSwitch = screen.getByRole('checkbox', { hidden: true })

      // Act
      fireEvent.click(toggleSwitch)

      // Assert
      expect(defaultProps.onToggleCustomPermissions).toHaveBeenCalledWith(true)
    })
  })
})