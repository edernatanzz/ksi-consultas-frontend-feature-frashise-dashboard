import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Icon from '../Icon'


describe('Icon Component', () => {
  it('When render with name, then should display the correct icon', () => {
    // Arrange
    const iconName = 'home'
    
    // Act
    render(<Icon name={iconName} />)
    
    // Assert
    expect(screen.getByText(iconName)).toBeInTheDocument()
  })

  it('When render with className, then should merge classes correctly', () => {
    // Arrange
    const testClass = 'custom-class'
    
    // Act
    render(<Icon name="settings" className={testClass} />)
    const iconElement = screen.getByText('settings')
    
    // Assert
    expect(iconElement).toHaveClass('material-icons')
    expect(iconElement).toHaveClass(testClass)
  })

  it('When render without size prop, then should use default md size', () => {
    // Arrange & Act
    render(<Icon name="search" />)
    const iconElement = screen.getByText('search')
    
    // Assert
    expect(iconElement).toHaveClass('text-[24px]')
  })

  it('When render with size sm, then should apply sm size class', () => {
    // Arrange & Act
    render(<Icon name="person" size="sm" />)
    const iconElement = screen.getByText('person')
    
    // Assert
    expect(iconElement).toHaveClass('text-[18px]')
  })

  it('When render with size md, then should apply md size class', () => {
    // Arrange & Act
    render(<Icon name="email" size="md" />)
    const iconElement = screen.getByText('email')
    
    // Assert
    expect(iconElement).toHaveClass('text-[24px]')
  })

  it('When render with size lg, then should apply lg size class', () => {
    // Arrange & Act
    render(<Icon name="star" size="lg" />)
    const iconElement = screen.getByText('star')
    
    // Assert
    expect(iconElement).toHaveClass('text-[32px]')
  })

  it('When render with size xl, then should apply xl size class', () => {
    // Arrange & Act
    render(<Icon name="favorite" size="xl" />)
    const iconElement = screen.getByText('favorite')
    
    // Assert
    expect(iconElement).toHaveClass('text-[40px]')
  })

  it('When render with className and size, then should merge all classes correctly', () => {
    // Arrange
    const testClass = 'text-red-500'
    
    // Act
    render(<Icon name="info" size="lg" className={testClass} />)
    const iconElement = screen.getByText('info')
    
    // Assert
    expect(iconElement).toHaveClass('material-icons')
    expect(iconElement).toHaveClass('text-[32px]')
    expect(iconElement).toHaveClass(testClass)
  })
})