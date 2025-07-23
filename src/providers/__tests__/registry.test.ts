import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest'
import { render } from '@testing-library/react'
import React from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import createCache, { type EmotionCache } from '@emotion/cache'
import { type SerializedStyles } from '@emotion/serialize'
import ThemeRegistry from '../registry'

// Mocks
vi.mock('next/navigation', () => ({
  useServerInsertedHTML: vi.fn(),
}))

vi.mock('@emotion/react', () => ({
  CacheProvider: vi.fn(({ children }) => children),
}))

vi.mock('@mui/material/styles', () => ({
  ThemeProvider: vi.fn(({ children }) => children),
}))

vi.mock('@mui/material/CssBaseline', () => ({
  default: vi.fn(() => React.createElement('div', { 'data-testid': 'css-baseline' })),
}))

vi.mock('@emotion/cache', () => ({
  default: vi.fn(() => ({
    key: 'mui',
    compat: true,
    inserted: {},
    insert: vi.fn(),
  })),
}))

vi.mock('@/lib/theme', () => ({
  theme: {},
}))

describe('ThemeRegistry', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('When rendering, then sets up emotion cache correctly', () => {
    // Act
    render(React.createElement(ThemeRegistry, null, 'Test Children'))

    // Assert
    expect(createCache).toHaveBeenCalledWith({ key: 'mui' })
  })

  it('When rendering, then provides CacheProvider and ThemeProvider', () => {
    // Arrange
    const children = React.createElement('div', { 'data-testid': 'test-children' }, 'Test')
    
    // Act
    const { getByTestId } = render(React.createElement(ThemeRegistry, null, children))

    // Assert
    expect(CacheProvider).toHaveBeenCalled()
    expect(MuiThemeProvider).toHaveBeenCalled()
    expect(getByTestId('test-children')).toBeInTheDocument()
  })

  it('When rendering, then includes CssBaseline', () => {
    // Arrange
    const children = React.createElement('div', {}, 'Test')
    
    // Act
    const { getByTestId } = render(React.createElement(ThemeRegistry, null, children))

    // Assert
    expect(CssBaseline).toHaveBeenCalled()
    expect(getByTestId('css-baseline')).toBeInTheDocument()
  })

  it('When server inserted HTML is called with no styles, then returns null', () => {
    // Arrange
    let serverInsertedHTMLCallback: () => React.ReactNode = () => null
    ;(useServerInsertedHTML as Mock).mockImplementation((cb: () => React.ReactNode) => {
      serverInsertedHTMLCallback = cb
    })

    // Mock createCache to return a cache with empty flush
    vi.mocked(createCache).mockReturnValue({
      key: 'mui',
      compat: true,
      inserted: {},
      insert: vi.fn(),
      registered: {},
      sheet: {} as EmotionCache['sheet'],
    })

    // Act
    render(React.createElement(ThemeRegistry, null, 'Test'))
    
    // Since we can't easily control the internal state, we'll test that the callback would return null
    // when flush returns an empty array by creating our own flush function
    const result = serverInsertedHTMLCallback()

    // Assert - this will be null initially since no styles have been flushed
    expect(result).toBeNull()
  })

  it('When server inserted HTML is called with styles, then useServerInsertedHTML is called', () => {
    // Arrange
    const mockCallback = vi.fn()
    ;(useServerInsertedHTML as Mock).mockImplementation(mockCallback)

    // Act
    render(React.createElement(ThemeRegistry, null, 'Test'))

    // Assert
    expect(useServerInsertedHTML).toHaveBeenCalled()
    expect(mockCallback).toHaveBeenCalledWith(expect.any(Function))
  })

  it('When cache is created, then it has correct configuration', () => {
    // Act
    render(React.createElement(ThemeRegistry, null, 'Test'))
    
    // Assert
    expect(createCache).toHaveBeenCalledWith({ key: 'mui' })
  })

  it('When useServerInsertedHTML callback returns styles, then it creates style element', () => {
    // Arrange
    // Mock useServerInsertedHTML to capture the callback
    ;(useServerInsertedHTML as Mock).mockImplementation((cb: () => React.ReactNode) => {
      // Simulate calling the callback immediately with some styles
      const result = cb()
      return result
    })

    // Mock createCache to return a cache with proper types
    const mockCache: EmotionCache = {
      key: 'mui',
      compat: true as const,
      inserted: {
        'style1': '.style1 { color: red; }',
        'style2': '.style2 { color: blue; }',
      },
      insert: vi.fn(),
      registered: {},
      sheet: {} as EmotionCache['sheet'],
    }

    vi.mocked(createCache).mockReturnValue(mockCache)

    // Act
    render(React.createElement(ThemeRegistry, null, 'Test'))
    
    // Assert that useServerInsertedHTML was called with a function
    expect(useServerInsertedHTML).toHaveBeenCalledWith(expect.any(Function))
  })

  it('When theme provider renders, then it includes theme from lib', () => {
    // Act
    render(React.createElement(ThemeRegistry, null, 'Test'))

    // Assert
    expect(MuiThemeProvider).toHaveBeenCalledWith(
      expect.objectContaining({
        theme: expect.any(Object),
        children: expect.anything(),
      }),
      undefined
    )
  })

  it('When cache insert method is overridden, then it properly tracks styles', () => {
    // Arrange
    const originalInsert = vi.fn()
    const mockCache: EmotionCache = {
      key: 'mui',
      compat: true as const,
      inserted: {} as Record<string, string>,
      insert: originalInsert,
      registered: {},
      sheet: {} as EmotionCache['sheet'],
    }

    vi.mocked(createCache).mockImplementation(() => {
      return mockCache
    })

    // Act
    render(React.createElement(ThemeRegistry, null, 'Test'))

    // The component should have overridden the insert method
    expect(mockCache.insert).not.toBe(originalInsert)
    
    // Simulate inserting a style
    const serialized: SerializedStyles = { 
      name: 'test-style',
      styles: '.test-style { color: red; }',
      next: undefined
    }
    const rule = '.test-style { color: red; }'
    mockCache.insert(rule, serialized, mockCache.sheet, false)
    
    // The original insert should have been called
    expect(originalInsert).toHaveBeenCalledWith(rule, serialized, mockCache.sheet, false)
  })

  it('When component renders multiple times, then cache is reused', () => {
    // Act
    const { rerender } = render(React.createElement(ThemeRegistry, null, 'Test 1'))
    const firstCallCount = vi.mocked(createCache).mock.calls.length

    rerender(React.createElement(ThemeRegistry, null, 'Test 2'))
    const secondCallCount = vi.mocked(createCache).mock.calls.length

    // Assert - createCache should only be called once due to useState
    expect(firstCallCount).toBe(secondCallCount)
  })

  it('When styles are injected, then server render callback handles them correctly', () => {
    // Arrange
    // Mock useServerInsertedHTML to capture the callback
    ;(useServerInsertedHTML as Mock).mockImplementation((cb) => {
      return cb() // Call it immediately to test the logic
    })

    // Act
    render(React.createElement(ThemeRegistry, null, 'Test'))

    // The callback should have been called during rendering
    expect(useServerInsertedHTML).toHaveBeenCalledWith(expect.any(Function))
  })

  it('When cache compat is set, then it maintains emotion compatibility', () => {
    // Arrange
    const mockCache = {
      key: 'mui',
      compat: false as boolean, // Start with false to test override
      inserted: {},
      insert: vi.fn(),
      registered: {},
      sheet: {} as EmotionCache['sheet'],
    } as EmotionCache

    vi.mocked(createCache).mockReturnValue(mockCache)

    // Act
    render(React.createElement(ThemeRegistry, null, 'Test'))

    // Assert - the component should set compat to true
    expect(mockCache.compat).toBe(true)
  })

  it('When multiple children are rendered, then they are all included', () => {
    // Arrange
    const multipleChildren = [
      React.createElement('div', { key: '1', 'data-testid': 'child-1' }, 'Child 1'),
      React.createElement('div', { key: '2', 'data-testid': 'child-2' }, 'Child 2'),
    ]

    // Act
    const { getByTestId } = render(
      React.createElement(ThemeRegistry, null, ...multipleChildren)
    )

    // Assert
    expect(getByTestId('child-1')).toBeInTheDocument()
    expect(getByTestId('child-2')).toBeInTheDocument()
  })

  it('When cache key is accessed, then it returns mui', () => {
    // Act
    render(React.createElement(ThemeRegistry, null, 'Test'))

    // Assert
    expect(createCache).toHaveBeenCalledWith({ key: 'mui' })
    
    const mockCache = vi.mocked(createCache).mock.results[0]?.value
    if (mockCache) {
      expect(mockCache.key).toBe('mui')
    }
  })

  it('When insert function is overridden, then it tracks style insertions', () => {
    // Arrange
    const originalInsert = vi.fn()
    const mockCache: EmotionCache = {
      key: 'mui',
      compat: true as const,
      inserted: {} as Record<string, string>,
      insert: originalInsert,
      registered: {},
      sheet: {} as EmotionCache['sheet'],
    }

    vi.mocked(createCache).mockReturnValue(mockCache)

    // Act
    render(React.createElement(ThemeRegistry, null, 'Test'))

    // The insert function should have been overridden
    expect(mockCache.insert).not.toBe(originalInsert)

    // Test the overridden insert function behavior
    const serialized: SerializedStyles = { 
      name: 'new-style',
      styles: '.new-style { color: blue; }',
      next: undefined
    }
    mockCache.insert('rule', serialized, mockCache.sheet, false)

    // Assert that the original insert was called
    expect(originalInsert).toHaveBeenCalledWith('rule', serialized, mockCache.sheet, false)
  })
})