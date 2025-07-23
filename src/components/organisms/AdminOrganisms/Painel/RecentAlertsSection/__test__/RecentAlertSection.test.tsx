import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import RecentAlertsSection from '../RecentAlertsSection'

// Mock Next.js Link component
vi.mock('next/link', () => ({
  default: ({ children, href, className }: React.PropsWithChildren<{ href: string; className?: string }>) => (
    <a href={href} className={className} data-testid="history-link">
      {children}
    </a>
  )
}))

describe('RecentAlertsSection Component', () => {
  it('When RecentAlertsSection is rendered with title, then should display section title', () => {
    // Arrange
    const props = {
      title: 'Recent Alerts',
      historyLink: '/alerts/history'
    }

    // Act
    render(<RecentAlertsSection {...props} />)

    // Assert
    expect(screen.getByText('Recent Alerts')).toBeInTheDocument()
  })

  it('When RecentAlertsSection is rendered, then should display "Ver Histórico" link', () => {
    // Arrange
    const props = {
      title: 'Test Alerts',
      historyLink: '/test/history'
    }

    // Act
    render(<RecentAlertsSection {...props} />)

    // Assert
    expect(screen.getByText('Ver Histórico →')).toBeInTheDocument()
  })

  it('When historyLink prop is provided, then should set correct href attribute', () => {
    // Arrange
    const props = {
      title: 'Link Test',
      historyLink: '/custom/alerts/history'
    }

    // Act
    render(<RecentAlertsSection {...props} />)

    // Assert
    const historyLink = screen.getByTestId('history-link')
    expect(historyLink).toHaveAttribute('href', '/custom/alerts/history')
  })

  it('When RecentAlertsSection is rendered, then should display placeholder message', () => {
    // Arrange
    const props = {
      title: 'Placeholder Test',
      historyLink: '/placeholder/history'
    }

    // Act
    render(<RecentAlertsSection {...props} />)

    // Assert
    expect(screen.getByText('Nenhum alerta recente.')).toBeInTheDocument()
  })

  it('When RecentAlertsSection is rendered, then should have correct container structure', () => {
    // Arrange
    const props = {
      title: 'Structure Test',
      historyLink: '/structure/history'
    }

    // Act
    const { container } = render(<RecentAlertsSection {...props} />)

    // Assert
    const mainContainer = container.firstChild
    expect(mainContainer).toHaveClass('bg-white', 'rounded-lg', 'shadow', 'p-6', 'mb-8')
  })

  it('When section title is rendered, then should have correct heading styling', () => {
    // Arrange
    const props = {
      title: 'Styled Title',
      historyLink: '/styled/history'
    }

    // Act
    render(<RecentAlertsSection {...props} />)

    // Assert
    const title = screen.getByText('Styled Title')
    expect(title).toHaveClass('text-xl', 'font-semibold', 'text-gray-900')
  })

  it('When history link is rendered, then should have correct styling classes', () => {
    // Arrange
    const props = {
      title: 'Link Style Test',
      historyLink: '/link/style/history'
    }

    // Act
    render(<RecentAlertsSection {...props} />)

    // Assert
    const historyLink = screen.getByTestId('history-link')
    expect(historyLink).toHaveClass('text-sm', 'text-blue-600', 'hover:underline')
  })

  it('When placeholder message is rendered, then should have correct text styling', () => {
    // Arrange
    const props = {
      title: 'Message Style Test',
      historyLink: '/message/history'
    }

    // Act
    render(<RecentAlertsSection {...props} />)

    // Assert
    const placeholderMessage = screen.getByText('Nenhum alerta recente.')
    expect(placeholderMessage).toHaveClass('text-gray-500')
  })
})