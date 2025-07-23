'use client'
import React from 'react'
import { Fade } from '@mui/material'
import Button from '@/components/atoms/Button/Button'

export interface EmptyStateProps {
  icon: string
  title?: string
  message: string
  actionLabel?: string
  onAction?: () => void
  actionIcon?: string
  className?: string
  showAnimation?: boolean
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  message,
  actionLabel,
  onAction,
  actionIcon,
  className = '',
  showAnimation = true
}) => {
  const content = (
    <div className={`text-center py-12 ${className}`}>
      {/* Ícone */}
      <div className="mb-4">
        <span className="material-icons text-6xl text-gray-300">
          {icon}
        </span>
      </div>

      {/* Título (opcional) */}
      {title && (
        <h3 className="text-lg font-medium text-gray-700 mb-2">
          {title}
        </h3>
      )}

      {/* Mensagem */}
      <p className="text-gray-500 mb-6 max-w-md mx-auto">
        {message}
      </p>

      {/* Ação (opcional) */}
      {actionLabel && onAction && (
        <Button
          variant="secondary"
          size="small"
          onClick={onAction}
          startIcon={actionIcon && (
            <span className="material-icons text-[18px]">
              {actionIcon}
            </span>
          )}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  )

  if (!showAnimation) {
    return content
  }

  return (
    <Fade in={true} timeout={500}>
      {content}
    </Fade>
  )
}

export default EmptyState