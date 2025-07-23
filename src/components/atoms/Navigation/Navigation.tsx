'use client'

import React from 'react'

interface NavigationItem {
  label: string
  onClick?: () => void
  isActive?: boolean
  icon?: string
}

interface NavigationProps {
  items: NavigationItem[]
}

export const Navigation: React.FC<NavigationProps> = ({ items }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center space-x-2">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <span className="material-icons text-[16px] text-gray-400 mx-1">
                chevron_right
              </span>
            )}
            {item.onClick && !item.isActive ? (
              <button
                onClick={item.onClick}
                className="flex items-center gap-1 text-black hover:text-gray-700 transition-colors font-medium border-none bg-transparent p-0 cursor-pointer"
              >
                {index === 0 && (
                  <span className="material-icons text-[16px] text-red-600">
                    home
                  </span>
                )}
                {item.icon && (
                  <span className="material-icons text-[16px] text-red-600">
                    {item.icon}
                  </span>
                )}
                {item.label}
              </button>
            ) : (
              <span className={`flex items-center gap-1 ${
                item.isActive
                  ? 'text-black font-medium'
                  : 'text-gray-500'
              }`}>
                {index === 0 && (
                  <span className="material-icons text-[16px] text-red-600">
                    home
                  </span>
                )}
                {item.icon && (
                  <span className="material-icons text-[16px] text-red-600">
                    {item.icon}
                  </span>
                )}
                {item.label}
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default Navigation