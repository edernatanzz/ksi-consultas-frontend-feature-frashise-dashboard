'use client'
import React from 'react'
import DashboardCard from '@/components/molecules/DashboardCard/DashboardCard'
import { dashboardCardsByCategory, serviceCategories } from '@/data/dashboard'
import { filterServicesByPermissions } from '@/utils/dashBoardPermissions'
import { useAuth } from '@/contexts/AuthContext'
import Button from '@/components/atoms/Button/Button'
import Breadcrumb from '@/components/molecules/Breadcrumb/Breadcrumb'

interface CategoryDashboardProps {
  categoryId: string
}

export const CategoryDashboard: React.FC<CategoryDashboardProps> = ({ categoryId }) => {
  const { user } = useAuth()
  const currentCategory = serviceCategories.find(cat => cat.id === categoryId)
  const allCategoryServices = dashboardCardsByCategory[categoryId as keyof typeof dashboardCardsByCategory] || []
  
  // Filtrar serviços com base nas permissões do usuário
  const categoryServices = filterServicesByPermissions(allCategoryServices, user?.permissions || [], user?.role)

  if (!currentCategory) {
    return (
      <div className="p-8 bg-ksiBeige min-h-screen">
        <div className="max-w-7xl mx-auto">
          <p className="text-red-500">Categoria não encontrada</p>
        </div>
      </div>
    )
  }

  const breadcrumbItems = [
    { label: 'Painel', path: '/' },
    { label: currentCategory.title }
  ]

  return (
    <div data-testid="category-dashboard-container" className="p-8 bg-ksiBeige min-h-screen">
      <div className="max-w-7xl mx-auto">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-medium text-black">
              {currentCategory.title}
            </h1>
            <p className="text-gray-600 mt-1">
              {currentCategory.subtitle} • {categoryServices.length} serviços disponíveis
            </p>
          </div>
          
          <div data-testid="buttons-container" className="flex space-x-3">
            <Button
              variant="secondary"
              size="small"
              startIcon={<span className="material-icons text-[20px]">search</span>}
            >
              Buscar Serviço
            </Button>
            <Button
              variant="primary"
              size="small"
            >
              Ver Histórico
            </Button>
          </div>
        </div>

        <div 
          data-testid="services-grid" 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {categoryServices.map((service) => (
            <DashboardCard key={service.id} card={service} />
          ))}
        </div>

        {categoryServices.length === 0 && (
          <div className="text-center py-12">
            <span className="material-icons text-6xl text-gray-300 mb-4">
              folder_open
            </span>
            <p className="text-gray-500">Nenhum serviço encontrado nesta categoria</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CategoryDashboard