'use client'
import React from 'react'

export interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onClear: () => void
  placeholder?: string
  className?: string
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onClear,
  placeholder = '',
  className = ''
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }

  return (
    <div className={`relative w-full ${className}`}>
      {/* Ícone de busca */}
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span className="material-icons text-gray-400 text-[20px]">
          search
        </span>
      </div>

      {/* Input */}
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="
          w-full pl-10 pr-10 py-3
          text-sm text-gray-900
          bg-white border border-gray-300
          rounded-lg
          focus:ring-2 focus:ring-red-500 focus:border-red-500
          placeholder-gray-400
          transition-all duration-200
        "
      />

      {/* limpar */}
      {value && (
        <button
          type="button"
          onClick={onClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
        >
          <span className="material-icons text-[18px]">
            close
          </span>
        </button>
      )}
    </div>
  )
}

export default SearchBar