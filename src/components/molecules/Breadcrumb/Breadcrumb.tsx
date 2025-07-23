'use client'
import React from 'react'
import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  path?: string
  onClick?: () => void
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="mb-6" aria-label="Breadcrumb">
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <span className="material-icons text-[16px] text-gray-400">
                chevron_right
              </span>
            )}
            {(item.path || item.onClick) && index < items.length - 1 ? (
              item.path ? (
                <Link 
                  href={item.path}
                  className="hover:text-primary-500 transition-colors cursor-pointer"
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  onClick={item.onClick}
                  className="hover:text-primary-500 transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              )
            ) : (
              <span className={index === items.length - 1 ? 'text-secondary-800 font-medium' : ''}>
                {item.label}
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </nav>
  )
}

export default Breadcrumb