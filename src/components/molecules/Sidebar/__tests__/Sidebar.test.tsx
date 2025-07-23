import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { Sidebar } from '../Sidebar'

// Mock do Next.js
vi.mock('next/link', () => ({
  default: vi.fn(({ children, onClick }) => (
    <a onClick={onClick}>{children}</a>
  ))
}))

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/dashboard')
}))

vi.mock('next/image', () => ({
  __esModule: true,
  default: vi.fn((props) => <span data-testid="logo" {...props} />)
}))

// Mock do contexto de autenticação
const mockLogout = vi.fn()
vi.mock('@/contexts/AuthContext', () => ({
  useAuth: vi.fn(() => ({
    user: { role: 'ADMIN', permissions: ['READ_DASHBOARD'] },
    logout: mockLogout
  }))
}))

// Mock das funções de dashboard - configurado para retornar os menuItems passados como prop
vi.mock('@/data/dashboard', () => ({
  getFilteredMenuItems: vi.fn(() => [
    { id: '1', label: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
    { id: '2', label: 'Usuários', icon: 'people', path: '/users' }
  ]),
  getMenuItemsByEnvironment: vi.fn(() => []),
  detectEnvironmentFromPath: vi.fn(() => 'other')
}))

const mockMenuItems = [
  { id: '1', label: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
  { id: '2', label: 'Usuários', icon: 'people', path: '/users' }
]

describe('Sidebar', () => {
  const defaultProps = {
    menuItems: mockMenuItems,
    isOpen: true,
    onClose: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('When sidebar renders with menu items', () => {
    it('then displays logo and menu items', () => {
      // Arrange & Act
      render(<Sidebar {...defaultProps} />)

      // Assert
      expect(screen.getByTestId('logo')).toBeInTheDocument()
      expect(screen.getByText('Dashboard')).toBeInTheDocument()
      expect(screen.getByText('Usuários')).toBeInTheDocument()
      expect(screen.getByText('SAIR')).toBeInTheDocument()
    })
  })

  describe('When close button is clicked', () => {
    it('then calls onClose callback', () => {
      // Arrange
      const onClose = vi.fn()
      render(<Sidebar {...defaultProps} onClose={onClose} />)

      // Act
      fireEvent.click(screen.getByText('close'))

      // Assert
      expect(onClose).toHaveBeenCalledTimes(1)
    })
  })

  describe('When sidebar is closed', () => {
    it('then applies correct transform class', () => {
      // Arrange
      const props = { ...defaultProps, isOpen: false }

      // Act
      const { container } = render(<Sidebar {...props} />)

      // Assert
      const sidebar = container.querySelector('[class*="w-[275px]"]')
      expect(sidebar).toHaveClass('-translate-x-full')
    })
  })

  describe('When sidebar is open', () => {
    it('then displays overlay on mobile', () => {
      // Arrange & Act
      render(<Sidebar {...defaultProps} />)

      // Assert
      const overlay = document.querySelector('.fixed.inset-0.bg-black.bg-opacity-50')
      expect(overlay).toBeInTheDocument()
    })
  })

  describe('When logout link is clicked', () => {
    it('then calls logout and onClose', () => {
      // Arrange
      const onClose = vi.fn()
      render(<Sidebar {...defaultProps} onClose={onClose} />)

      // Act
      fireEvent.click(screen.getByText('SAIR'))

      // Assert
      expect(mockLogout).toHaveBeenCalledTimes(1)
      expect(onClose).toHaveBeenCalledTimes(1)
    })
  })
})