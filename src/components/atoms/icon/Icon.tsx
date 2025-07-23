'use client'

import React from 'react'
import { twMerge } from 'tailwind-merge'

export interface IconProps {
  name: string
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export const Icon: React.FC<IconProps> = ({
  name,
  className,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'text-[18px]',
    md: 'text-[24px]',
    lg: 'text-[32px]',
    xl: 'text-[40px]',
  }
  
  return (
    <span className={twMerge(
      'material-icons',
      sizeClasses[size],
      className
    )}>
      {name}
    </span>
  )
}

export default Icon