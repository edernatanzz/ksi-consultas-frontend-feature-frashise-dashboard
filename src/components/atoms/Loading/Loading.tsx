'use client';

import React from 'react';
import { CircularProgress } from '@mui/material';

export interface LoadingProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
  fullScreen?: boolean;
  className?: string;
  color?: 'primary' | 'secondary' | 'inherit';
}

export const Loading: React.FC<LoadingProps> = ({
  size = 'medium',
  message = 'Carregando...',
  fullScreen = false,
  className = '',
  color = 'primary'
}) => {
  const sizeMap = {
    small: 24,
    medium: 32,
    large: 48
  };

  const getColor = () => {
    if (color === 'primary') return '#e02725'; 
    if (color === 'secondary') return '#64748b';
    return 'inherit';
  };

  const containerClasses = fullScreen 
    ? `min-h-screen bg-gray-50 flex items-center justify-center ${className}`
    : `flex items-center justify-center p-4 ${className}`;

  return (
    <div className={containerClasses}>
      <div className="text-center">
        <CircularProgress
          size={sizeMap[size]}
          className="mx-auto"
          sx={{ 
            color: getColor()
          }}
        />
        {message && (
          <p className="mt-4 text-slate-600 text-sm md:text-base">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Loading;
