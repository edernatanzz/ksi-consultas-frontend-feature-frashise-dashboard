import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchBar from '../Searchbar'

describe('SearchBar Component', () => {
  describe('Basic Rendering', () => {
    it('When SearchBar is rendered with basic props, then should display search input with search icon', () => {
      // Arrange
      const props = {
        value: '',
        onChange: vi.fn(),
        onClear: vi.fn()
      }
      
      // Act
      render(<SearchBar {...props} />)
      
      // Assert
      expect(screen.getByRole('textbox')).toBeInTheDocument()
      expect(screen.getByText('search')).toBeInTheDocument()
    })

    it('When SearchBar is rendered with placeholder, then should display placeholder text', () => {
      // Arrange
      const props = {
        value: '',
        onChange: vi.fn(),
        onClear: vi.fn(),
        placeholder: 'Search for products...'
      }
      
      // Act
      render(<SearchBar {...props} />)
      
      // Assert
      expect(screen.getByPlaceholderText('Search for products...')).toBeInTheDocument()
    })

    it('When SearchBar is rendered without placeholder, then should have empty placeholder', () => {
      // Arrange
      const props = {
        value: '',
        onChange: vi.fn(),
        onClear: vi.fn()
      }
      
      // Act
      render(<SearchBar {...props} />)
      const input = screen.getByRole('textbox')
      
      // Assert
      expect(input).toHaveAttribute('placeholder', '')
    })

    it('When SearchBar is rendered with custom className, then should apply custom classes', () => {
      // Arrange
      const props = {
        value: '',
        onChange: vi.fn(),
        onClear: vi.fn(),
        className: 'custom-search-bar'
      }
      
      // Act
      const { container } = render(<SearchBar {...props} />)
      
      // Assert
      expect(container.firstChild).toHaveClass('custom-search-bar')
    })
  })

  describe('Search Icon', () => {
    it('When SearchBar is rendered, then should display search icon with correct styling', () => {
      // Arrange
      const props = {
        value: '',
        onChange: vi.fn(),
        onClear: vi.fn()
      }
      
      // Act
      render(<SearchBar {...props} />)
      const searchIcon = screen.getByText('search')
      
      // Assert
      expect(searchIcon).toHaveClass('material-icons', 'text-gray-400', 'text-[20px]')
    })

    it('When SearchBar is rendered, then search icon should not be clickable', () => {
      // Arrange
      const props = {
        value: '',
        onChange: vi.fn(),
        onClear: vi.fn()
      }
      
      // Act
      render(<SearchBar {...props} />)
      const searchIcon = screen.getByText('search')
      
      // Assert
      expect(searchIcon.closest('.pointer-events-none')).toBeInTheDocument()
    })
  })

  describe('Input Value and Changes', () => {
    it('When SearchBar is rendered with initial value, then should display the value', () => {
      // Arrange
      const props = {
        value: 'initial search',
        onChange: vi.fn(),
        onClear: vi.fn()
      }
      
      // Act
      render(<SearchBar {...props} />)
      
      // Assert
      expect(screen.getByDisplayValue('initial search')).toBeInTheDocument()
    })

    it('When user types in SearchBar, then should call onChange', async () => {
      // Arrange
      const user = userEvent.setup()
      const mockOnChange = vi.fn()
      const props = {
        value: '',
        onChange: mockOnChange,
        onClear: vi.fn()
      }
      
      // Act
      render(<SearchBar {...props} />)
      const input = screen.getByRole('textbox')
      await user.type(input, 'a')
      
      // Assert
      expect(mockOnChange).toHaveBeenCalledWith('a')
    })

    it('When SearchBar value changes via props, then should update displayed value', () => {
      // Arrange
      const { rerender } = render(
        <SearchBar value="" onChange={vi.fn()} onClear={vi.fn()} />
      )
      
      // Act
      rerender(
        <SearchBar value="updated" onChange={vi.fn()} onClear={vi.fn()} />
      )
      
      // Assert
      expect(screen.getByDisplayValue('updated')).toBeInTheDocument()
    })
  })

  describe('Clear Button', () => {
    it('When SearchBar has no value, then should not display clear button', () => {
      // Arrange
      const props = {
        value: '',
        onChange: vi.fn(),
        onClear: vi.fn()
      }
      
      // Act
      render(<SearchBar {...props} />)
      
      // Assert
      expect(screen.queryByText('close')).not.toBeInTheDocument()
    })

    it('When SearchBar has value, then should display clear button', () => {
      // Arrange
      const props = {
        value: 'search term',
        onChange: vi.fn(),
        onClear: vi.fn()
      }
      
      // Act
      render(<SearchBar {...props} />)
      
      // Assert
      expect(screen.getByText('close')).toBeInTheDocument()
    })

    it('When clear button is clicked, then should call onClear handler', async () => {
      // Arrange
      const user = userEvent.setup()
      const mockOnClear = vi.fn()
      const props = {
        value: 'search term',
        onChange: vi.fn(),
        onClear: mockOnClear
      }
      
      // Act
      render(<SearchBar {...props} />)
      const clearButton = screen.getByRole('button')
      await user.click(clearButton)
      
      // Assert
      expect(mockOnClear).toHaveBeenCalledTimes(1)
    })

    it('When clear button is hovered, then should show hover styling', () => {
      // Arrange
      const props = {
        value: 'search term',
        onChange: vi.fn(),
        onClear: vi.fn()
      }
      
      // Act
      render(<SearchBar {...props} />)
      const clearButton = screen.getByRole('button')
      
      // Assert
      expect(clearButton).toHaveClass('hover:text-gray-600', 'transition-colors')
    })
  })

  describe('Input Styling and Focus', () => {
    it('When SearchBar input is rendered, then should have correct base styling', () => {
      // Arrange
      const props = {
        value: '',
        onChange: vi.fn(),
        onClear: vi.fn()
      }
      
      // Act
      render(<SearchBar {...props} />)
      const input = screen.getByRole('textbox')
      
      // Assert
      expect(input).toHaveClass(
        'w-full',
        'pl-10',
        'pr-10',
        'py-3',
        'text-sm',
        'bg-white',
        'border',
        'border-gray-300',
        'rounded-lg'
      )
    })

    it('When SearchBar input receives focus, then should have focus styling classes', () => {
      // Arrange
      const props = {
        value: '',
        onChange: vi.fn(),
        onClear: vi.fn()
      }
      
      // Act
      render(<SearchBar {...props} />)
      const input = screen.getByRole('textbox')
      
      // Assert
      expect(input).toHaveClass(
        'focus:ring-2',
        'focus:ring-red-500',
        'focus:border-red-500'
      )
    })
  })

  describe('Event Handling', () => {
    it('When SearchBar receives input events, then should handle them correctly', async () => {
      // Arrange
      const user = userEvent.setup()
      const mockOnChange = vi.fn()
      const props = {
        value: '',
        onChange: mockOnChange,
        onClear: vi.fn()
      }
      
      // Act
      render(<SearchBar {...props} />)
      const input = screen.getByRole('textbox')
      await user.type(input, 'x')
      
      // Assert
      expect(mockOnChange).toHaveBeenCalledWith('x')
    })

    it('When SearchBar loses focus, then input should handle blur correctly', async () => {
      // Arrange
      const user = userEvent.setup()
      const props = {
        value: 'test',
        onChange: vi.fn(),
        onClear: vi.fn()
      }
      
      // Act
      render(<SearchBar {...props} />)
      const input = screen.getByRole('textbox')
      await user.click(input)
      await user.tab()
      
      // Assert
      expect(input).not.toHaveFocus()
    })
  })

  describe('Accessibility', () => {
    it('When SearchBar is rendered, then should have proper accessibility attributes', () => {
      // Arrange
      const props = {
        value: '',
        onChange: vi.fn(),
        onClear: vi.fn(),
        placeholder: 'Search products'
      }
      
      // Act
      render(<SearchBar {...props} />)
      const input = screen.getByRole('textbox')
      
      // Assert
      expect(input).toHaveAttribute('type', 'text')
      expect(input).toHaveAccessibleName('')
    })

    it('When clear button is present, then should have proper button role', () => {
      // Arrange
      const props = {
        value: 'search term',
        onChange: vi.fn(),
        onClear: vi.fn()
      }
      
      // Act
      render(<SearchBar {...props} />)
      const clearButton = screen.getByRole('button')
      
      // Assert
      expect(clearButton).toHaveAttribute('type', 'button')
    })
  })
})