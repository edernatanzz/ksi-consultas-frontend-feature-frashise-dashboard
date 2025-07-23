import { DashboardCard, ServiceCategory, dashboardCardsByCategory } from '@/data/dashboard'

export const normalizeSearchText = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
}

export const searchAllServices = (query: string): DashboardCard[] => {
  if (!query.trim()) return []

  const normalizedQuery = normalizeSearchText(query)
  const allServices: DashboardCard[] = []

  Object.values(dashboardCardsByCategory).forEach(categoryServices => {
    allServices.push(...categoryServices)
  })

  return allServices.filter(service => {
    const titleMatch = normalizeSearchText(service.title).includes(normalizedQuery)
    const subtitleMatch = normalizeSearchText(service.subtitle).includes(normalizedQuery)
    const categoryMatch = service.category && normalizeSearchText(service.category).includes(normalizedQuery)
    
    return titleMatch || subtitleMatch || categoryMatch
  })
}

export const searchCategories = (categories: ServiceCategory[], query: string): ServiceCategory[] => {
  if (!query.trim()) return categories

  const normalizedQuery = normalizeSearchText(query)

  return categories.filter(category => {
    const titleMatch = normalizeSearchText(category.title).includes(normalizedQuery)
    const subtitleMatch = normalizeSearchText(category.subtitle).includes(normalizedQuery)
    
    return titleMatch || subtitleMatch
  })
}

export const highlightSearchText = (text: string, query: string): string => {
  if (!query.trim()) return text
  
  const normalizedQuery = normalizeSearchText(query)
  const normalizedText = normalizeSearchText(text)
  
  if (normalizedText.includes(normalizedQuery)) {
    return text
  }
  
  return text
}