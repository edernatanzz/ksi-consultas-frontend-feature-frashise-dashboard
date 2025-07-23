'use client'
import React from 'react'
import Link from 'next/link'
import { DashboardCard as DashboardCardType } from '@/data/dashboard'

interface DashboardCardProps {
  card: DashboardCardType
  onClick?: () => void
}

export const DashboardCard: React.FC<DashboardCardProps> = ({ card, onClick }) => {
  if (onClick) {
    return (
      <div 
        data-testid="dashboard-card"
        className="bg-gray-100 rounded-xl shadow-sm h-full transition-all hover:shadow-md border border-gray-300 cursor-pointer"
        onClick={onClick}
      >
        <div className="p-5 h-full">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <span className="material-icons text-[32px] text-primary-500">
                {card.icon}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="font-display font-medium text-base mb-1 text-secondary-800">
                {card.title}
              </h3>
              <p className="text-sm text-gray-500">
                {card.subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div 
      data-testid="dashboard-card"
      className="bg-gray-100 rounded-xl shadow-sm h-full transition-all hover:shadow-md border border-gray-300"
    >
      <Link
        href={card.path}
        className="block p-5 h-full no-underline"
      >
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <span className="material-icons text-[32px] text-primary-500">
              {card.icon}
            </span>
          </div>
          <div className="flex-1">
            <h3 className="font-display font-medium text-base mb-1 text-secondary-800">
              {card.title}
            </h3>
            <p className="text-sm text-gray-500">
              {card.subtitle}
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default DashboardCard