import '@testing-library/jest-dom'
import { vi } from 'vitest'
import React from 'react'

// Mock para CSS Modules (retorna as classes como strings)
vi.mock('*.module.scss', () => ({
  default: new Proxy({}, {
    get: (target, prop) => {
      // Retorna o nome da classe como string para os testes
      return typeof prop === 'string' ? prop : undefined
    }
  })
}))

// Mock para arquivos CSS normais
vi.mock('*.scss', () => ({}))
vi.mock('*.css', () => ({}))

// Mock do Material-UI se necessário
vi.mock('@mui/material/CircularProgress', () => ({
  CircularProgress: vi.fn(({ children, ...props }) =>
    React.createElement('div', { 'data-testid': 'circular-progress', ...props }, children)
  )
}))

// Mock do Next.js router
vi.mock('next/router', () => ({
  useRouter: vi.fn(() => ({
    route: '/',
    pathname: '/',
    query: {},
    asPath: '/',
    push: vi.fn(),
    pop: vi.fn(),
    reload: vi.fn(),
    back: vi.fn(),
    prefetch: vi.fn(),
    beforePopState: vi.fn(),
    events: {
      on: vi.fn(),
      off: vi.fn(),
      emit: vi.fn(),
    },
  })),
}))

// Mock do Next.js navigation
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  })),
  usePathname: vi.fn(() => '/'),
  useSearchParams: vi.fn(() => new URLSearchParams()),
}))

global.fetch = vi.fn()

afterEach(() => {
  vi.clearAllMocks()
})