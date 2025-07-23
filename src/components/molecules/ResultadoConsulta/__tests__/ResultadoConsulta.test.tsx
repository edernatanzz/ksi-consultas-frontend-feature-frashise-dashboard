import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ResultadoConsulta } from '../ResultadoConsulta'

// Mock do Material-UI
vi.mock('@mui/material', () => ({
  Card: ({ children, className }: React.PropsWithChildren<{ className?: string }>) => <div data-testid="card" className={className}>{children}</div>,
  CardContent: ({ children, className }: React.PropsWithChildren<{ className?: string }>) => <div data-testid="card-content" className={className}>{children}</div>,
  CardHeader: ({ title, subheader }: { title?: React.ReactNode; subheader?: React.ReactNode }) => (
    <div data-testid="card-header">
      <div data-testid="card-title">{title}</div>
      <div data-testid="card-subheader">{subheader}</div>
    </div>
  )
}))

// Mock do Material-UI Icons
vi.mock('@mui/icons-material/Search', () => ({
  default: ({ className }: React.ComponentProps<'div'>) => <div data-testid="search-icon" className={className} />
}))

describe('ResultadoConsulta', () => {
  it('When component renders, then displays card with correct background', () => {
    // Arrange & Act
    render(<ResultadoConsulta />)
    
    // Assert
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('bg-[#FFFCF9]', 'h-full')
  })

  it('When component renders, then displays correct header title', () => {
    // Arrange & Act
    render(<ResultadoConsulta />)
    
    // Assert
    const title = screen.getByTestId('card-title')
    expect(title).toBeInTheDocument()
    expect(title.textContent).toBe('Resultado da Consulta')
  })

  it('When component renders, then displays correct header subtitle', () => {
    // Arrange & Act
    render(<ResultadoConsulta />)
    
    // Assert
    const subheader = screen.getByTestId('card-subheader')
    expect(subheader).toBeInTheDocument()
    expect(subheader.textContent).toBe('Os resultados da sua consulta aparecerão aqui')
  })

  it('When component renders, then displays search icon', () => {
    // Arrange & Act
    render(<ResultadoConsulta />)
    
    // Assert
    const searchIcon = screen.getByTestId('search-icon')
    expect(searchIcon).toBeInTheDocument()
    expect(searchIcon).toHaveClass('text-gray-400', 'w-6', 'h-6', 'md:w-8', 'md:h-8')
  })

  it('When component renders, then displays main message heading', () => {
    // Arrange & Act
    render(<ResultadoConsulta />)
    
    // Assert
    const heading = screen.getByText('Nenhuma consulta realizada')
    expect(heading).toBeInTheDocument()
    expect(heading.tagName).toBe('H3')
    expect(heading).toHaveClass('text-base', 'md:text-lg', 'font-medium', 'text-[#112331]', 'mb-2')
  })

  it('When component renders, then displays instruction paragraph', () => {
    // Arrange & Act
    render(<ResultadoConsulta />)
    
    // Assert
    const paragraph = screen.getByText(/Preencha o formulário ao lado e clique em Consultar/)
    expect(paragraph).toBeInTheDocument()
    expect(paragraph.tagName).toBe('P')
    expect(paragraph).toHaveClass('text-xs', 'md:text-sm', 'text-gray-600', 'text-center', 'max-w-sm', 'px-4')
  })

  it('When component renders, then card content has correct styling', () => {
    // Arrange & Act
    render(<ResultadoConsulta />)
    
    // Assert
    const cardContent = screen.getByTestId('card-content')
    expect(cardContent).toHaveClass(
      'flex', 
      'flex-col', 
      'items-center', 
      'justify-center', 
      'py-8', 
      'md:py-12'
    )
  })

  it('When component renders, then icon container has correct styling', () => {
    // Arrange & Act
    render(<ResultadoConsulta />)
    
    // Assert
    const iconContainer = screen.getByTestId('search-icon').parentElement
    expect(iconContainer).toHaveClass(
      'w-12',
      'h-12', 
      'md:w-16',
      'md:h-16',
      'bg-gray-100',
      'rounded-full',
      'flex',
      'items-center',
      'justify-center',
      'mb-4'
    )
  })

  it('When component renders, then header title has correct text styling', () => {
    // Arrange & Act
    render(<ResultadoConsulta />)
    
    // Assert
    const titleSpan = screen.getByTestId('card-title').querySelector('span')
    expect(titleSpan).toHaveClass('text-[#112331]', 'text-lg', 'md:text-xl')
  })

  it('When component renders, then header subheader has correct text styling', () => {
    // Arrange & Act
    render(<ResultadoConsulta />)
    
    // Assert
    const subheaderSpan = screen.getByTestId('card-subheader').querySelector('span')
    expect(subheaderSpan).toHaveClass('text-[#112331]', 'text-sm', 'md:text-base')
  })

  it('When component renders, then all required elements are present', () => {
    // Arrange & Act
    render(<ResultadoConsulta />)
    
    // Assert
    expect(screen.getByTestId('card')).toBeInTheDocument()
    expect(screen.getByTestId('card-header')).toBeInTheDocument()
    expect(screen.getByTestId('card-content')).toBeInTheDocument()
    expect(screen.getByTestId('search-icon')).toBeInTheDocument()
    expect(screen.getByText('Nenhuma consulta realizada')).toBeInTheDocument()
    expect(screen.getByText(/Preencha o formulário ao lado/)).toBeInTheDocument()
  })
})