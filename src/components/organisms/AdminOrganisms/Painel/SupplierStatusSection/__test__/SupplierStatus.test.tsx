import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import SupplierStatusSection from '../SupplierStatusSection'

// Mock Next.js Link component
vi.mock('next/link', () => ({
  default: ({ children, href, className }: React.PropsWithChildren<{ href: string; className?: string }>) => (
    <a href={href} className={className}>
      {children}
    </a>
  )
}))

// Mock SupplierStatusItem component
type SupplierStatusItemProps = {
  name: string
  uptime: string
  avgCost: string
  responseTime: string
  consultations: string
  statusColor: string
  onConfigureFallback: () => void
}

vi.mock('@/components/molecules/AdminMolecules/Painel/SupplierStatusItem', () => ({
  default: ({
    name,
    uptime,
    avgCost,
    responseTime,
    consultations,
    statusColor,
    onConfigureFallback
  }: SupplierStatusItemProps) => (
    <div 
      data-testid={`supplier-item-${name}`}
      data-uptime={uptime}
      data-avgcost={avgCost}
      data-responsetime={responseTime}
      data-consultations={consultations}
      data-statuscolor={statusColor}
    >
      <span>{name}</span>
      <button onClick={onConfigureFallback} data-testid={`configure-${name}`}>
        Configure Fallback
      </button>
    </div>
  )
}))

describe('SupplierStatusSection Component', () => {
  it('When SupplierStatusSection is rendered with title, then should display section title', () => {
    // Arrange
    const props = {
      title: 'Supplier Status',
      suppliers: [
        {
          name: 'Supplier A',
          uptime: '99.9%',
          avgCost: 'R$ 2,50',
          responseTime: '150ms',
          consultations: '1.234',
          statusColor: 'bg-green-500'
        }
      ],
      onConfigureFallback: vi.fn()
    }

    // Act
    render(<SupplierStatusSection {...props} />)

    // Assert
    expect(screen.getByText('Supplier Status')).toBeInTheDocument()
  })

  it('When SupplierStatusSection is rendered, then should display "Ver Todos" link', () => {
    // Arrange
    const props = {
      title: 'Test Section',
      suppliers: [],
      onConfigureFallback: vi.fn()
    }

    // Act
    render(<SupplierStatusSection {...props} />)

    // Assert
    expect(screen.getByText('Ver Todos →')).toBeInTheDocument()
  })

  it('When suppliers array is provided, then should render all supplier items', () => {
    // Arrange
    const props = {
      title: 'Multiple Suppliers',
      suppliers: [
        {
          name: 'Supplier 1',
          uptime: '99.5%',
          avgCost: 'R$ 3,00',
          responseTime: '200ms',
          consultations: '2.345',
          statusColor: 'bg-green-500'
        },
        {
          name: 'Supplier 2',
          uptime: '98.2%',
          avgCost: 'R$ 2,80',
          responseTime: '180ms',
          consultations: '1.876',
          statusColor: 'bg-yellow-500'
        }
      ],
      onConfigureFallback: vi.fn()
    }

    // Act
    render(<SupplierStatusSection {...props} />)

    // Assert
    expect(screen.getByTestId('supplier-item-Supplier 1')).toBeInTheDocument()
    expect(screen.getByTestId('supplier-item-Supplier 2')).toBeInTheDocument()
  })

  it('When supplier data is passed, then should pass correct props to SupplierStatusItem', () => {
    // Arrange
    const props = {
      title: 'Props Test',
      suppliers: [
        {
          name: 'Test Supplier',
          uptime: '97.8%',
          avgCost: 'R$ 4,20',
          responseTime: '250ms',
          consultations: '5.432',
          statusColor: 'bg-red-500'
        }
      ],
      onConfigureFallback: vi.fn()
    }

    // Act
    render(<SupplierStatusSection {...props} />)

    // Assert
    const supplierItem = screen.getByTestId('supplier-item-Test Supplier')
    expect(supplierItem).toHaveAttribute('data-uptime', '97.8%')
    expect(supplierItem).toHaveAttribute('data-avgcost', 'R$ 4,20')
    expect(supplierItem).toHaveAttribute('data-responsetime', '250ms')
    expect(supplierItem).toHaveAttribute('data-consultations', '5.432')
    expect(supplierItem).toHaveAttribute('data-statuscolor', 'bg-red-500')
  })

  it('When configure fallback is clicked, then should call onConfigureFallback with supplier name', async () => {
    // Arrange
    const user = userEvent.setup()
    const mockCallback = vi.fn()
    const props = {
      title: 'Callback Test',
      suppliers: [
        {
          name: 'Test Supplier',
          uptime: '95.0%',
          avgCost: 'R$ 1,90',
          responseTime: '300ms',
          consultations: '999',
          statusColor: 'bg-orange-500'
        }
      ],
      onConfigureFallback: mockCallback
    }

    // Act
    render(<SupplierStatusSection {...props} />)
    await user.click(screen.getByTestId('configure-Test Supplier'))

    // Assert
    expect(mockCallback).toHaveBeenCalledWith('Test Supplier')
  })

  it('When SupplierStatusSection is rendered with empty suppliers, then should not render any supplier items', () => {
    // Arrange
    const props = {
      title: 'Empty Test',
      suppliers: [],
      onConfigureFallback: vi.fn()
    }

    // Act
    const { container } = render(<SupplierStatusSection {...props} />)

    // Assert
    const gridContainer = container.querySelector('.grid.grid-cols-1')
    expect(gridContainer?.children).toHaveLength(0)
  })

  it('When SupplierStatusSection is rendered, then should have correct container structure', () => {
    // Arrange
    const props = {
      title: 'Structure Test',
      suppliers: [],
      onConfigureFallback: vi.fn()
    }

    // Act
    const { container } = render(<SupplierStatusSection {...props} />)

    // Assert
    const mainContainer = container.firstChild
    expect(mainContainer).toHaveClass('bg-white', 'rounded-lg', 'shadow', 'p-6', 'mb-8')
  })

  it('When suppliers grid is rendered, then should have correct grid layout classes', () => {
    // Arrange
    const props = {
      title: 'Grid Test',
      suppliers: [
        {
          name: 'Grid Supplier',
          uptime: '96.5%',
          avgCost: 'R$ 3,75',
          responseTime: '220ms',
          consultations: '3.210',
          statusColor: 'bg-blue-500'
        }
      ],
      onConfigureFallback: vi.fn()
    }

    // Act
    const { container } = render(<SupplierStatusSection {...props} />)

    // Assert
    const gridContainer = container.querySelector('.grid')
    expect(gridContainer).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-4', 'gap-6')
  })
})