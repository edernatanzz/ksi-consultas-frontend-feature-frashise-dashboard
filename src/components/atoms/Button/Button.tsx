'use client'
import React, { forwardRef } from 'react'
import { CircularProgress } from '@mui/material'
import styles from './Button.module.scss'
import { LucideIcon } from 'lucide-react'

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'outline' | 'ghost' | 'icon'
export type ButtonSize = 'small' | 'medium' | 'large' | 'extra-large'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  fullWidth?: boolean
  iconOnly?: boolean
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  children?: React.ReactNode
  icon?: LucideIcon
  iconPosition?: 'left' | 'right'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = 'primary',
    size = 'medium',
    loading = false,
    fullWidth = false,
    iconOnly = false,
    startIcon,
    endIcon,
    children,
    className = '',
    disabled,
    icon: Icon,
    iconPosition = 'left',
    ...props
  }, ref) => {
    const buttonClasses = [
      styles['ksi-button'],
      styles[`ksi-button--${variant}`],
      styles[`ksi-button--${size}`],
      fullWidth ? styles['ksi-button--full-width'] : '',
      iconOnly ? styles['ksi-button--icon-only'] : '',
      loading ? styles['ksi-button--loading'] : '',
      className
    ].filter(Boolean).join(' ')

    const isDisabled = disabled || loading

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={isDisabled}
        {...props}
      >
        {loading && (
          <CircularProgress
            size={size === 'small' ? 14 : size === 'large' ? 18 : 16}
            className={styles['ksi-button__spinner']}
            sx={{ color: 'inherit' }}
          />
        )}
        {!loading && Icon && iconPosition === 'left' && (
          <Icon size={size === 'small' ? 16 : size === 'large' ? 20 : 18} />
        )}
        {!loading && startIcon && (
          <span className={styles['ksi-button__start-icon']}>
            {startIcon}
          </span>
        )}
        {!iconOnly && children && (
          <span className={styles['ksi-button__text']}>
            {loading ? 'Carregando...' : children}
          </span>
        )}
        {!loading && endIcon && (
          <span className={styles['ksi-button__end-icon']}>
            {endIcon}
          </span>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button