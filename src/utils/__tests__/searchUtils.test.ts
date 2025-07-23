import { describe, it, expect, vi } from 'vitest'
import { normalizeSearchText, searchAllServices, searchCategories, highlightSearchText } from '@/utils/searchUtils'
import { serviceCategories } from '@/data/dashboard'

// Mock dos dados
vi.mock('@/data/dashboard', () => {
  const mockServiceCategories = [
    { id: 'bancario', title: 'SERVIÇOS BANCÁRIOS', subtitle: 'Relatórios de crédito', icon: 'icon', path: '/path', serviceCount: 2 },
    { id: 'veicular', title: 'CONSULTAS VEICULARES', subtitle: 'ATPV, histórico', icon: 'icon', path: '/path', serviceCount: 2 }
  ]

  const mockDashboardCardsByCategory = {
    bancario: [
      { id: 'rating', title: 'RATING BANCÁRIO', subtitle: 'Relatório de crédito', icon: 'icon', path: '/path', category: 'bancario' },
      { id: 'relatorio', title: 'RELATÓRIO TOP', subtitle: 'Análise', icon: 'icon', path: '/path', category: 'bancario' }
    ],
    veicular: [
      { id: 'atpv', title: 'ATPV ONLINE', subtitle: 'Consulta veicular', icon: 'icon', path: '/path', category: 'veicular' },
      { id: 'completa', title: 'VEICULAR COMPLETA', subtitle: 'Histórico', icon: 'icon', path: '/path', category: 'veicular' }
    ]
  }

  return {
    serviceCategories: mockServiceCategories,
    dashboardCardsByCategory: mockDashboardCardsByCategory,
    dashboardCards: mockServiceCategories
  }
})

describe('SearchUtils', () => {
  describe('normalizeSearchText', () => {
    it('When text needs normalization, then returns normalized text', () => {
      // Arrange & Act & Assert
      expect(normalizeSearchText('Créditó é àção')).toBe('credito e acao')
      expect(normalizeSearchText('RATING BANCÁRIO')).toBe('rating bancario')
      expect(normalizeSearchText('  ATPV ONLINE  ')).toBe('atpv online')
    })
  })

  describe('searchAllServices', () => {
    it('When query is empty, then returns empty array', () => {
      // Arrange, Act & Assert
      expect(searchAllServices('')).toEqual([])
    })

    it('When query matches service data, then returns matching services', () => {
      // Arrange & Act & Assert
      // Match by title
      const titleResults = searchAllServices('rating')
      expect(titleResults).toHaveLength(1)
      expect(titleResults[0].id).toBe('rating')

      // Match by subtitle
      const subtitleResults = searchAllServices('histórico')
      expect(subtitleResults).toHaveLength(1)
      expect(subtitleResults[0].id).toBe('completa')

      // Match by category
      const categoryResults = searchAllServices('bancario')
      expect(categoryResults).toHaveLength(2)
      expect(categoryResults[0].category).toBe('bancario')
      expect(categoryResults[1].category).toBe('bancario')

      // No matches
      expect(searchAllServices('inexistente')).toEqual([])
    })
  })

  describe('searchCategories', () => {
    it('When searching categories, then returns appropriate results', () => {
      // Arrange & Act & Assert
      // Empty query returns all
      expect(searchCategories(serviceCategories, '')).toEqual(serviceCategories)
      
      // Match by title
      const titleResults = searchCategories(serviceCategories, 'veicular')
      expect(titleResults).toHaveLength(1)
      expect(titleResults[0].id).toBe('veicular')
      
      // Match by subtitle
      const subtitleResults = searchCategories(serviceCategories, 'crédito')
      expect(subtitleResults).toHaveLength(1)
      expect(subtitleResults[0].id).toBe('bancario')
      
      // No matches
      expect(searchCategories(serviceCategories, 'inexistente')).toEqual([])
    })
  })

  describe('highlightSearchText', () => {
    it('When highlighting text, then returns appropriate result', () => {
      // Arrange & Act & Assert
      // Empty query returns original text
      expect(highlightSearchText('RATING BANCÁRIO', '')).toBe('RATING BANCÁRIO')
      
      // Matching query returns original text
      expect(highlightSearchText('RATING BANCÁRIO', 'rating')).toBe('RATING BANCÁRIO')
      
      // Non-matching query returns original text
      expect(highlightSearchText('RATING BANCÁRIO', 'inexistente')).toBe('RATING BANCÁRIO')
    })
  })
})