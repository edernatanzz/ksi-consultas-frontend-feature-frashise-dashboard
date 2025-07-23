'use client'
import React, { useState, useMemo } from 'react'
import DashboardCard from '@/components/molecules/DashboardCard/DashboardCard'
import Navigation from '@/components/atoms/Navigation/Navigation'
import { serviceCategories, dashboardCardsByCategory, DashboardCard as DashboardCardType } from '@/data/dashboard'
import Button from '@/components/atoms/Button/Button'
import { Fade } from '@mui/material'

import EmptyState from '@/components/atoms/EmptyStates/EmptyState'
import { searchAllServices } from '@/utils/searchUtils'
import SearchSection from '@/components/molecules/SearchSection/SeachSection'
import { 
  canAccessCategory,
  filterCategoriesByPermissions,
  filterServicesByPermissions,
  getRequiredPermissionsForAction} from '@/utils/dashBoardPermissions'
import { useAuth } from '@/contexts/AuthContext'
import { RouteGuard, PermissionGuard } from '@/components/template/RouteGuard/RouteGuard'
import { Permission } from '@/types/auth'

export const Dashboard: React.FC = () => {
  const [currentCategory, setCurrentCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const { user } = useAuth();

  const handleCategoryClick = (categoryId: string) => {
    if(canAccessCategory(categoryId, user?.permissions || [], user?.role)) {
      setCurrentCategory(categoryId)
      setSearchQuery('')}
  }

  const handleBackToMain = () => {
    setCurrentCategory(null)
    setSearchQuery('')
  }

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    if (value.trim() && currentCategory) {
      setCurrentCategory(null)
    }
  }

  const handleSearchClear = () => {
    setSearchQuery('')
  }

  const getNavigationItems = () => {
    if (!currentCategory) {
      return [{ label: `Bem-vindo(a), ${user?.name}`, isActive: true }]
    }
    
    const category = serviceCategories.find(cat => cat.id === currentCategory)
    return [
      { label: 'Painel', onClick: handleBackToMain },
      { label: category?.title || '', isActive: true }
    ]
  }

  const { currentData, isMainView, isSearchMode } = useMemo(() => {
    const isSearching = searchQuery.trim().length > 0
    const isMainViewCalc = currentCategory === null
    
    let data: DashboardCardType[] = []
    
    if (isSearching && currentCategory === null) {
      const allResults = searchAllServices(searchQuery)
      const filteredResults = filterServicesByPermissions(allResults, user?.permissions || [], user?.role)
      data = filteredResults.map(service => ({
        id: service.id,
        title: service.title as string,
        subtitle: service.subtitle as string,
        icon: service.icon as string,
        path: service.path as string,
        category: service.category
      }))
    } else if (isSearching && currentCategory) {
      const categoryServices = dashboardCardsByCategory[currentCategory as keyof typeof dashboardCardsByCategory] || []
      const filteredServices = filterServicesByPermissions(categoryServices, user?.permissions || [], user?.role)
      data = filteredServices.filter(service => {
        const titleMatch = service.title.toLowerCase().includes(searchQuery.toLowerCase())
        const subtitleMatch = service.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
        return titleMatch || subtitleMatch
      })
    } else if (currentCategory) {
      const categoryServices = dashboardCardsByCategory[currentCategory as keyof typeof dashboardCardsByCategory] || []
      data = filterServicesByPermissions(categoryServices, user?.permissions || [], user?.role)
    } else {
      const categories = filterCategoriesByPermissions(serviceCategories, user?.permissions || [], user?.role)
      data = categories.map(category => ({
        id: category.id,
        title: category.title,
        subtitle: category.subtitle,
        icon: category.icon,
        path: category.path,
        category: category.id
      }))
    }

    return {
      currentData: data,
      isMainView: isMainViewCalc,
      isSearchMode: isSearching
    }
  }, [searchQuery, currentCategory, user?.permissions, user?.role])

  const getPageTitle = () => {
    if (isMainView) {
      return 'PAINEL DE CONTROLE'
    }
    const category = serviceCategories.find(cat => cat.id === currentCategory)
    return category?.title || 'CATEGORIA'
  }

  const getPageSubtitle = () => {
    if (isMainView) {
      return null
    }
    const category = serviceCategories.find(cat => cat.id === currentCategory)
    return `${category?.subtitle || ''} • ${currentData.length} serviços disponíveis`
  }

  const getEmptyStateMessage = () => {
    if (isSearchMode) {
      return {
        icon: 'search_off',
        message: `Nenhum resultado encontrado para "${searchQuery}"`
      }
    }
    return {
      icon: 'folder_open',
      message: 'Nenhum item encontrado'
    }
  }

  return (
    <RouteGuard requiredPermissions={[Permission.READ_DASHBOARD]}>
    <div data-testid="dashboard-container" className="p-4 sm:p-8 bg-ksiBeige min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        <SearchSection
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onSearchClear={handleSearchClear}
          resultCount={isSearchMode && isMainView ? currentData.length : undefined}
          isSearchActive={isSearchMode && isMainView}
        />

        <Navigation items={getNavigationItems()} />
        
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 sm:mb-8 gap-4 lg:gap-0">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl font-medium text-black break-words">
              {getPageTitle()}
            </h1>
            {getPageSubtitle() && (
              <p className="text-gray-600 mt-1 text-sm break-words">
                {getPageSubtitle()}
              </p>
            )}
          </div>
          
          <div data-testid="buttons-container" className="flex flex-col sm:flex-row gap-2 sm:gap-3 lg:flex-shrink-0">
            {!isMainView && (
              
              <Button
                variant="secondary"
                size="small"
                startIcon={<span className="material-icons text-[20px]">arrow_back</span>}
                onClick={handleBackToMain}
                className="w-full sm:w-auto"
              >
                Voltar
              </Button>
            )}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <PermissionGuard
              requiredPermissions={getRequiredPermissionsForAction('new_consultation')}
              mode="any"
            >
              <Button
                variant="secondary"
                size="small"
                startIcon={<span className="material-icons text-[20px]">add_circle</span>}
                className="w-full sm:w-auto"
              >
                Nova Consulta
              </Button>
              <Button
                variant="primary"
                size="small"
                className="w-full sm:w-auto"
              >
                Ver Histórico
              </Button>
              </PermissionGuard>
            </div>
          </div>
        </div>

        {/* resultado */}
        <Fade in={true} timeout={300}>
          <div
            data-testid="dashboard-grid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {currentData.map((card) => (
              <DashboardCard
                key={card.id}
                card={card}
                onClick={isMainView && !isSearchMode ? () => handleCategoryClick(card.id) : undefined}
              />
            ))}
          </div>
        </Fade>

        {currentData.length === 0 && (
          <EmptyState
            icon={getEmptyStateMessage().icon}
            message={getEmptyStateMessage().message}
            actionLabel={isSearchMode ? "Limpar busca" : undefined}
            actionIcon={isSearchMode ? "refresh" : undefined}
            onAction={isSearchMode ? handleSearchClear : undefined}
            showAnimation={true}
          />
        )}
      </div>
    </div>
    </RouteGuard>
  )
}

export default Dashboard