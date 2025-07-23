import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SearchSection } from '../SeachSection'

describe('SearchSection Component', () => {
  describe('Basic Rendering', () => {
    it('When SearchSection is rendered, then should display search bar', () => {
      // Arrange
      const props = {
        searchQuery: '',
        onSearchChange: vi.fn(),
        onSearchClear: vi.fn()
      }
      
      // Act
      render(<SearchSection {...props} />)
      
      // Assert
      expect(screen.getByPlaceholderText('Buscar serviços')).toBeInTheDocument()
    })

    it('When SearchSection has search query, then should display the query in search bar', () => {
      // Arrange
      const props = {
        searchQuery: 'test query',
        onSearchChange: vi.fn(),
        onSearchClear: vi.fn()
      }
      
      // Act
      render(<SearchSection {...props} />)
      
      // Assert
      expect(screen.getByDisplayValue('test query')).toBeInTheDocument()
    })
  })

  describe('Search Results', () => {
    it('When search is active with results, then should display result count', () => {
      // Arrange
      const props = {
        searchQuery: 'test',
        onSearchChange: vi.fn(),
        onSearchClear: vi.fn(),
        resultCount: 5,
        isSearchActive: true
      }
      
      // Act
      render(<SearchSection {...props} />)
      
      // Assert
      expect(screen.getByText('5 resultados encontrados')).toBeInTheDocument()
      expect(screen.getByText('para "test"')).toBeInTheDocument()
    })

    it('When search is active with single result, then should display singular form', () => {
      // Arrange
      const props = {
        searchQuery: 'single',
        onSearchChange: vi.fn(),
        onSearchClear: vi.fn(),
        resultCount: 1,
        isSearchActive: true
      }
      
      // Act
      render(<SearchSection {...props} />)
      
      // Assert
      expect(screen.getByText('1 resultado encontrado')).toBeInTheDocument()
    })

    it('When search is active with no results, then should display zero results', () => {
      // Arrange
      const props = {
        searchQuery: 'nothing',
        onSearchChange: vi.fn(),
        onSearchClear: vi.fn(),
        resultCount: 0,
        isSearchActive: true
      }
      
      // Act
      render(<SearchSection {...props} />)
      
      // Assert
      expect(screen.getByText('0 resultados encontrados')).toBeInTheDocument()
    })

    it('When search is not active, then should not display result count', () => {
      // Arrange
      const props = {
        searchQuery: 'test',
        onSearchChange: vi.fn(),
        onSearchClear: vi.fn(),
        resultCount: 5,
        isSearchActive: false
      }
      
      // Act
      render(<SearchSection {...props} />)
      
      // Assert
      expect(screen.queryByText('5 resultados encontrados')).not.toBeInTheDocument()
    })
  })

  describe('Search Events', () => {
    it('When user types in search bar, then should call onSearchChange', async () => {
      // Arrange
      const user = userEvent.setup()
      const mockOnSearchChange = vi.fn()
      const props = {
        searchQuery: '',
        onSearchChange: mockOnSearchChange,
        onSearchClear: vi.fn()
      }
      
      // Act
      render(<SearchSection {...props} />)
      const searchInput = screen.getByPlaceholderText('Buscar serviços')
      await user.type(searchInput, 'a')
      
      // Assert
      expect(mockOnSearchChange).toHaveBeenCalledWith('a')
    })

    it('When user clears search, then should call onSearchClear', async () => {
      // Arrange
      const user = userEvent.setup()
      const mockOnSearchClear = vi.fn()
      const props = {
        searchQuery: 'test',
        onSearchChange: vi.fn(),
        onSearchClear: mockOnSearchClear
      }
      
      // Act
      render(<SearchSection {...props} />)
      const clearButton = screen.getByRole('button')
      await user.click(clearButton)
      
      // Assert
      expect(mockOnSearchClear).toHaveBeenCalled()
    })
  })
})