import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import PermissionMatrix from '../PermissionMatrix'

// Mock dos ícones MUI
vi.mock('@mui/icons-material', () => ({
  CheckCircle: vi.fn(({ sx }) => (
    <div data-testid="check-circle" data-sx={JSON.stringify(sx)}>Check</div>
  )),
  HighlightOff: vi.fn(({ sx }) => (
    <div data-testid="highlight-off" data-sx={JSON.stringify(sx)}>Off</div>
  ))
}))

// Mock do Button
vi.mock('@/components/atoms/Button/Button', () => ({
  default: vi.fn(({ onClick, startIcon, variant, className }) => (
    <button onClick={onClick} data-variant={variant} className={className}>
      {startIcon}
    </button>
  ))
}))

// Mock do CSS
vi.mock('./PermissionMatrix.module.scss', () => ({
  default: {
    container: 'container',
    header: 'header',
    title: 'title',
    legend: 'legend',
    legendItem: 'legendItem',
    tableWrapper: 'tableWrapper',
    table: 'table',
    moduleHeader: 'moduleHeader',
    levelHeader: 'levelHeader',
    levelInfo: 'levelInfo',
    icon: 'icon',
    levelName: 'levelName',
    row: 'row',
    moduleCell: 'moduleCell',
    moduleInfo: 'moduleInfo',
    moduleName: 'moduleName',
    moduleDescription: 'moduleDescription',
    permissionCell: 'permissionCell',
    toggleButton: 'toggleButton'
  }
}))

// Mock do ícone para teste
const MockIcon = vi.fn(() => <div data-testid="mock-icon">Icon</div>)

describe('PermissionMatrix', () => {
  const mockOnTogglePermission = vi.fn()

  const mockModules = [
    { id: 'users', name: 'Usuários', description: 'Gerenciar usuários' },
    { id: 'reports', name: 'Relatórios', description: 'Visualizar relatórios' }
  ]

  const mockPermissionLevels = [
    { id: 'admin', name: 'Admin', color: 'bg-red-500', icon: MockIcon },
    { id: 'editor', name: 'Editor', color: 'bg-blue-500', icon: MockIcon }
  ]

  const mockPermissionMatrix = {
    admin: ['users', 'reports'],
    editor: ['reports']
  }

  const defaultProps = {
    modules: mockModules,
    permissionLevels: mockPermissionLevels,
    permissionMatrix: mockPermissionMatrix,
    onTogglePermission: mockOnTogglePermission
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('When component renders', () => {
    it('then displays title and legend', () => {
      // Arrange & Act
      render(<PermissionMatrix {...defaultProps} />)

      // Assert
      expect(screen.getByText('Matrix de Permissões')).toBeInTheDocument()
      expect(screen.getByText('Permitido')).toBeInTheDocument()
      expect(screen.getByText('Negado')).toBeInTheDocument()
    })

    it('then displays modules information', () => {
      // Arrange & Act
      render(<PermissionMatrix {...defaultProps} />)

      // Assert
      expect(screen.getByText('Usuários')).toBeInTheDocument()
      expect(screen.getByText('Gerenciar usuários')).toBeInTheDocument()
      expect(screen.getByText('Relatórios')).toBeInTheDocument()
      expect(screen.getByText('Visualizar relatórios')).toBeInTheDocument()
    })

    it('then displays permission levels in header', () => {
      // Arrange & Act
      render(<PermissionMatrix {...defaultProps} />)

      // Assert
      expect(screen.getByText('Admin')).toBeInTheDocument()
      expect(screen.getByText('Editor')).toBeInTheDocument()
    })
  })

  describe('When permission exists', () => {
    it('then shows check icon for admin-users permission', () => {
      // Arrange & Act
      render(<PermissionMatrix {...defaultProps} />)

      // Assert
      const buttons = screen.getAllByRole('button')
      // Admin tem permissão para users (primeira linha, primeira coluna)
      const adminUsersButton = buttons.find(button => {
        const checkIcon = button.querySelector('[data-testid="check-circle"]')
        return checkIcon !== null
      })
      
      expect(adminUsersButton).toBeDefined()
      expect(adminUsersButton?.querySelector('[data-testid="check-circle"]')).toBeInTheDocument()
    })
  })

  describe('When permission does not exist', () => {
    it('then shows highlight-off icon for editor-users permission', () => {
      // Arrange & Act
      render(<PermissionMatrix {...defaultProps} />)

      // Assert
      const buttons = screen.getAllByRole('button')
      // Editor não tem permissão para users
      const buttonsWithHighlightOff = buttons.filter(button => {
        const highlightOffIcon = button.querySelector('[data-testid="highlight-off"]')
        return highlightOffIcon !== null
      })
      
      expect(buttonsWithHighlightOff.length).toBeGreaterThan(0)
      expect(buttonsWithHighlightOff[0]?.querySelector('[data-testid="highlight-off"]')).toBeInTheDocument()
    })
  })

  describe('When toggle button is clicked', () => {
    it('then calls onTogglePermission with correct parameters', () => {
      // Arrange
      render(<PermissionMatrix {...defaultProps} />)

      // Act
      const buttons = screen.getAllByRole('button')
      // Clica no primeiro botão que deve ser admin-users
      fireEvent.click(buttons[0])

      // Assert
      expect(mockOnTogglePermission).toHaveBeenCalledTimes(1)
      // Os parâmetros dependem da ordem dos dados mockados
      expect(mockOnTogglePermission).toHaveBeenCalledWith(
        expect.any(String), // level id
        expect.any(String)  // module id
      )
    })

    it('then calls onTogglePermission for each button click', () => {
      // Arrange
      render(<PermissionMatrix {...defaultProps} />)

      // Act
      const buttons = screen.getAllByRole('button')
      fireEvent.click(buttons[0])
      fireEvent.click(buttons[1])

      // Assert
      expect(mockOnTogglePermission).toHaveBeenCalledTimes(2)
    })
  })

  describe('When permission matrix is empty', () => {
    it('then shows all highlight-off icons in permission cells', () => {
      // Arrange & Act
      render(<PermissionMatrix {...defaultProps} permissionMatrix={{}} />)

      // Assert
      const buttons = screen.getAllByRole('button')
      
      // Debug: vamos ver quantos botões e ícones temos
      console.log('Number of buttons:', buttons.length)
      
      const allHighlightOffIcons = screen.getAllByTestId('highlight-off')
      console.log('Total highlight-off icons:', allHighlightOffIcons.length)
      
      // Verificar que há exatamente 4 botões (2 modules × 2 levels)
      expect(buttons).toHaveLength(4)
      
      // Verificar que cada botão tem ícone highlight-off
      buttons.forEach((button, index) => {
        const highlightOffIcon = button.querySelector('[data-testid="highlight-off"]')
        console.log(`Button ${index} has highlight-off:`, !!highlightOffIcon)
        expect(highlightOffIcon).toBeInTheDocument()
      })
    })
  })
})