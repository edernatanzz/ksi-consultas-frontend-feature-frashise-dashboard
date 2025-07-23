'use client'
import SearchBar from '@/components/atoms/SearchBar/Searchbar'
import React from 'react'


export interface SearchSectionProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  onSearchClear: () => void
  resultCount?: number
  isSearchActive?: boolean
}

export const SearchSection: React.FC<SearchSectionProps> = ({
  searchQuery,
  onSearchChange,
  onSearchClear,
  resultCount,
  isSearchActive = false
}) => {
  return (
    <div className="w-full mb-6">
      {/* Barra de Busca */}
      <div className="mb-4">
        <SearchBar
          value={searchQuery}
          onChange={onSearchChange}
          onClear={onSearchClear}
          placeholder="Buscar serviços"
        />
      </div>

      {/* Resultados da Busca */}
      {isSearchActive && (
        <div className="transition-all duration-200">
          {resultCount !== undefined && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="material-icons text-[18px] text-red-600">
                search
              </span>
              <span>
                {resultCount} resultado{resultCount !== 1 ? 's' : ''} encontrado{resultCount !== 1 ? 's' : ''} 
                {searchQuery && (
                  <span className="font-medium text-gray-800">
                    {' '}para &quot;{searchQuery}&quot;
                  </span>
                )}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchSection