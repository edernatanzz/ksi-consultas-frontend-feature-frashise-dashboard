import { describe, it, expect, beforeEach, afterEach, afterAll, vi, type MockedFunction } from 'vitest'
import { renderHook, cleanup } from '@testing-library/react'
import { useBreakpoint } from '../useBreakpoint'

// Mock do módulo de breakpoints
vi.mock('@/shared/styles/breakpoints', () => ({
  breakpoints: {
    tablet: 768,
    laptop: 1024,
    desktop: 1280,
    monitor: 1600,
  },
}))

// Breakpoints para usar nos testes
const mockBreakpoints = {
  tablet: 768,
  laptop: 1024,
  desktop: 1280,
  monitor: 1600,
}

describe('useBreakpoint', () => {
  const originalWindow = global.window

  // Mock mais completo do window object
  const createMockWindow = (innerWidth: number = 1024) => ({
    innerWidth,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
    // Propriedades necessárias para React DOM
    document: {
      createElement: vi.fn(),
      createElementNS: vi.fn(),
      createDocumentFragment: vi.fn(),
    },
    navigator: {
      userAgent: 'test',
    },
    location: {
      href: 'http://localhost:3000',
    },
    history: {
      pushState: vi.fn(),
      replaceState: vi.fn(),
    },
    // Event necessário para React DOM
    event: undefined,
    Event: class MockEvent {
      constructor(public type: string) {}
    },
    // Outras propriedades que o React DOM pode precisar
    performance: {
      now: vi.fn(() => Date.now()),
    },
    requestAnimationFrame: vi.fn((cb) => setTimeout(cb, 16)),
    cancelAnimationFrame: vi.fn(),
  })

  let mockWindow: ReturnType<typeof createMockWindow>

  beforeEach(() => {
    mockWindow = createMockWindow()
    
    // Mock window object
    Object.defineProperty(global, 'window', {
      value: mockWindow,
      writable: true,
      configurable: true,
    })
    
    // Reset mocks
    vi.clearAllMocks()
  })

  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  afterAll(() => {
    // Restore original window
    if (originalWindow) {
      Object.defineProperty(global, 'window', {
        value: originalWindow,
        writable: true,
        configurable: true,
      })
    }
  })

  it('should return "mobile" when window width is 0 (SSR scenario)', () => {
    // Arrange - Simular cenário SSR com width 0
    mockWindow.innerWidth = 0

    // Act
    const { result } = renderHook(() => useBreakpoint())

    // Assert
    expect(result.current).toBe('mobile')
  })

  it('should return "mobile" for widths less than tablet breakpoint', () => {
    // Arrange
    mockWindow.innerWidth = mockBreakpoints.tablet - 1

    // Act
    const { result } = renderHook(() => useBreakpoint())

    // Assert
    expect(result.current).toBe('mobile')
  })

  it('should return "tablet" for widths between tablet and laptop breakpoints', () => {
    // Arrange
    mockWindow.innerWidth = mockBreakpoints.tablet + 1

    // Act
    const { result } = renderHook(() => useBreakpoint())

    // Assert
    expect(result.current).toBe('tablet')
  })

  it('should return "laptop" for widths between laptop and desktop breakpoints', () => {
    // Arrange
    mockWindow.innerWidth = mockBreakpoints.laptop + 1

    // Act
    const { result } = renderHook(() => useBreakpoint())

    // Assert
    expect(result.current).toBe('laptop')
  })

  it('should return "desktop" for widths between desktop and monitor breakpoints', () => {
    // Arrange
    mockWindow.innerWidth = mockBreakpoints.desktop + 1

    // Act
    const { result } = renderHook(() => useBreakpoint())

    // Assert
    expect(result.current).toBe('desktop')
  })

  it('should return "monitor" for widths greater than monitor breakpoint', () => {
    // Arrange
    mockWindow.innerWidth = mockBreakpoints.monitor + 1

    // Act
    const { result } = renderHook(() => useBreakpoint())

    // Assert
    expect(result.current).toBe('monitor')
  })

  it('should update breakpoint when window resizes', async () => {
    // Arrange
    mockWindow.innerWidth = mockBreakpoints.tablet - 1 // mobile
    const { result, rerender } = renderHook(() => useBreakpoint())
    
    // Verificar estado inicial
    expect(result.current).toBe('mobile')

    // Act - Simulate resize
    mockWindow.innerWidth = mockBreakpoints.laptop + 1
    
    // Simular o handler de resize sendo chamado
    const addEventListenerMock = mockWindow.addEventListener as MockedFunction<typeof mockWindow.addEventListener>
    const addEventListenerCalls = addEventListenerMock.mock.calls
    const resizeHandler = addEventListenerCalls.find(
      (call) => call[0] === 'resize'
    )?.[1] as EventListener
    
    if (resizeHandler) {
      resizeHandler(new Event('resize'))
      rerender()
    }

    // Assert
    expect(result.current).toBe('laptop')
  })

  it('should remove event listener when component unmounts', () => {
    // Arrange
    const { unmount } = renderHook(() => useBreakpoint())

    // Verificar se addEventListener foi chamado
    expect(mockWindow.addEventListener).toHaveBeenCalledWith('resize', expect.any(Function))
    
    const addEventListenerMock = mockWindow.addEventListener as MockedFunction<typeof mockWindow.addEventListener>
    const addEventListenerCalls = addEventListenerMock.mock.calls
    const resizeHandler = addEventListenerCalls.find(
      (call) => call[0] === 'resize'
    )?.[1] as EventListener

    // Act
    unmount()

    // Assert
    expect(mockWindow.removeEventListener).toHaveBeenCalledWith('resize', resizeHandler)
  })
})