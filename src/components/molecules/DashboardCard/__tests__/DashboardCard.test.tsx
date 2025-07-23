import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { DashboardCard as DashboardCardType, dashboardCards } from '@/data/dashboard'
import DashboardCard from '../DashboardCard'

describe('DashboardCard Component', () => {
  // Usando o primeiro item do mock como exemplo
  const mockCard: DashboardCardType = dashboardCards[0]

  it('When render with card data, then should display correct content', () => {
    // Arrange
    const { title, subtitle, icon } = mockCard
    
    // Act
    render(<DashboardCard card={mockCard} />)
    
    // Assert
    expect(screen.getByText(title)).toBeInTheDocument()
    expect(screen.getByText(subtitle)).toBeInTheDocument()
    expect(screen.getByText(icon)).toBeInTheDocument()
  })

  it('When render with card data, then should have correct link', () => {
    // Arrange
    const { path } = mockCard
    
    // Act
    render(<DashboardCard card={mockCard} />)
    const linkElement = screen.getByRole('link')
    
    // Assert
    expect(linkElement).toHaveAttribute('href', path)
  })

  it('When render with card data, then should apply correct classes to card container', () => {
    // Act
    render(<DashboardCard card={mockCard} />)
    const cardElement = screen.getByTestId('dashboard-card')
    
    // Assert
    expect(cardElement).toHaveClass('bg-gray-100')
    expect(cardElement).toHaveClass('rounded-xl')
    expect(cardElement).toHaveClass('shadow-sm')
    expect(cardElement).toHaveClass('hover:shadow-md')
    expect(cardElement).toHaveClass('border')
    expect(cardElement).toHaveClass('border-gray-300')
  })

  it('When render with card data, then icon should have correct styling', () => {
    // Act
    render(<DashboardCard card={mockCard} />)
    const iconElement = screen.getByText(mockCard.icon)
    
    // Assert
    expect(iconElement).toHaveClass('text-[32px]')
    expect(iconElement).toHaveClass('text-primary-500')
  })

  it('When render with card data, then title should have correct styling', () => {
    // Act
    render(<DashboardCard card={mockCard} />)
    const titleElement = screen.getByText(mockCard.title)
    
    // Assert
    expect(titleElement).toHaveClass('font-display')
    expect(titleElement).toHaveClass('font-medium')
    expect(titleElement).toHaveClass('text-base')
    expect(titleElement).toHaveClass('text-secondary-800')
  })

  it('When render with card data, then subtitle should have correct styling', () => {
    // Act
    render(<DashboardCard card={mockCard} />)
    const subtitleElement = screen.getByText(mockCard.subtitle)
    
    // Assert
    expect(subtitleElement).toHaveClass('text-sm')
    expect(subtitleElement).toHaveClass('text-gray-500')
  })

  it('When render with card data, then link should have correct classes', () => {
    // Act
    render(<DashboardCard card={mockCard} />)
    const linkElement = screen.getByRole('link')
    
    // Assert
    expect(linkElement).toHaveClass('block')
    expect(linkElement).toHaveClass('p-5')
    expect(linkElement).toHaveClass('h-full')
    expect(linkElement).toHaveClass('no-underline')
  })

  it('When render with different card from mock, then should display correct data', () => {
    // Arrange - Pegando um card diferente do mock
    const testCard = dashboardCards[3] // "ANTECEDENTE CRIMINAL"
    
    // Act
    render(<DashboardCard card={testCard} />)
    
    // Assert
    expect(screen.getByText(testCard.title)).toBeInTheDocument()
    expect(screen.getByText(testCard.subtitle)).toBeInTheDocument()
    expect(screen.getByText(testCard.icon)).toBeInTheDocument()
    expect(screen.getByRole('link')).toHaveAttribute('href', testCard.path)
  })
})