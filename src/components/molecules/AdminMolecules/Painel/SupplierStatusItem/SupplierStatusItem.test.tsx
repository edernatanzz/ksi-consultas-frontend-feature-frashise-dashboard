import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import SupplierStatusItem from '../SupplierStatusItem'

// Mock Button component
type ButtonProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  variant?: string
  size?: string
  className?: string
}

vi.mock('@/components/atoms/Button/Button', () => ({
  default: ({ children, onClick, variant, size, className }: React.PropsWithChildren<ButtonProps>) => (
    <button
      onClick={onClick}
      data-variant={variant}
      data-size={size}
      className={className}
    >
      {children}
    </button>
  )
}))

describe('SupplierStatusItem Component', () => {
  it('When SupplierStatusItem is rendered with props, then should display supplier name', () => {
    // Arrange
    const props = {
      name: 'Supplier A',
      uptime: '99.9%',
      avgCost: 'R$ 2,50',
      responseTime: '150ms',
      consultations: '1.234',
      statusColor: 'bg-green-500',
      onConfigureFallback: vi.fn()
    }

    // Act
    render(<SupplierStatusItem {...props} />)

    // Assert
    expect(screen.getByText('Supplier A')).toBeInTheDocument()
  })

  it('When SupplierStatusItem is rendered, then should display all metric labels and values', () => {
    // Arrange
    const props = {
      name: 'Test Supplier',
      uptime: '98.5%',
      avgCost: 'R$ 3,00',
      responseTime: '200ms',
      consultations: '5.678',
      statusColor: 'bg-yellow-500',
      onConfigureFallback: vi.fn()
    }

    // Act
    render(<SupplierStatusItem {...props} />)

    // Assert
    expect(screen.getByText('Uptime:')).toBeInTheDocument()
    expect(screen.getByText('98.5%')).toBeInTheDocument()
    expect(screen.getByText('Custo médio:')).toBeInTheDocument()
    expect(screen.getByText('R$ 3,00')).toBeInTheDocument()
    expect(screen.getByText('Resposta:')).toBeInTheDocument()
    expect(screen.getByText('200ms')).toBeInTheDocument()
    expect(screen.getByText('Consultas:')).toBeInTheDocument()
    expect(screen.getByText('5.678')).toBeInTheDocument()
  })

  it('When SupplierStatusItem is rendered, then should display status indicator with correct color', () => {
    // Arrange
    const props = {
      name: 'Supplier B',
      uptime: '95.0%',
      avgCost: 'R$ 1,80',
      responseTime: '300ms',
      consultations: '999',
      statusColor: 'bg-red-500',
      onConfigureFallback: vi.fn()
    }

    // Act
    const { container } = render(<SupplierStatusItem {...props} />)

    // Assert
    const statusIndicator = container.querySelector('.bg-red-500')
    expect(statusIndicator).toHaveClass('w-3', 'h-3', 'rounded-full')
  })

  it('When SupplierStatusItem is rendered, then should display Button with correct props', () => {
    // Arrange
    const props = {
      name: 'Supplier C',
      uptime: '97.2%',
      avgCost: 'R$ 4,50',
      responseTime: '120ms',
      consultations: '2.500',
      statusColor: 'bg-blue-500',
      onConfigureFallback: vi.fn()
    }

    // Act
    render(<SupplierStatusItem {...props} />)

    // Assert
    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('Configurar Fallback')
    expect(button).toHaveAttribute('data-variant', 'secondary')
    expect(button).toHaveAttribute('data-size', 'small')
    expect(button).toHaveClass('w-full')
  })

  it('When configure fallback button is clicked, then should call onConfigureFallback handler', async () => {
    // Arrange
    const user = userEvent.setup()
    const mockOnClick = vi.fn()
    const props = {
      name: 'Supplier D',
      uptime: '99.1%',
      avgCost: 'R$ 2,20',
      responseTime: '180ms',
      consultations: '3.456',
      statusColor: 'bg-green-400',
      onConfigureFallback: mockOnClick
    }

    // Act
    render(<SupplierStatusItem {...props} />)
    await user.click(screen.getByRole('button'))

    // Assert
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('When SupplierStatusItem is rendered, then should have correct container structure', () => {
    // Arrange
    const props = {
      name: 'Supplier E',
      uptime: '96.8%',
      avgCost: 'R$ 3,75',
      responseTime: '250ms',
      consultations: '1.890',
      statusColor: 'bg-purple-500',
      onConfigureFallback: vi.fn()
    }

    // Act
    const { container } = render(<SupplierStatusItem {...props} />)

    // Assert
    const mainContainer = container.firstChild
    expect(mainContainer).toHaveClass('bg-white', 'rounded-lg', 'shadow', 'p-6', 'flex', 'flex-col', 'justify-between')
  })

  it('When SupplierStatusItem metrics are rendered, then should have correct grid layout', () => {
    // Arrange
    const props = {
      name: 'Supplier F',
      uptime: '94.5%',
      avgCost: 'R$ 5,20',
      responseTime: '400ms',
      consultations: '7.123',
      statusColor: 'bg-orange-500',
      onConfigureFallback: vi.fn()
    }

    // Act
    const { container } = render(<SupplierStatusItem {...props} />)

    // Assert
    const metricsContainer = container.querySelector('.grid')
    expect(metricsContainer).toHaveClass('grid-cols-2', 'gap-y-2', 'mb-6')
  })

  it('When supplier name is rendered, then should have correct heading styling', () => {
    // Arrange
    const props = {
      name: 'Styled Supplier',
      uptime: '92.3%',
      avgCost: 'R$ 1,50',
      responseTime: '500ms',
      consultations: '456',
      statusColor: 'bg-gray-500',
      onConfigureFallback: vi.fn()
    }

    // Act
    render(<SupplierStatusItem {...props} />)

    // Assert
    const heading = screen.getByText('Styled Supplier')
    expect(heading).toHaveClass('text-lg', 'font-semibold', 'text-gray-900')
  })
})