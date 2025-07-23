import React from 'react';
import { LucideIcon } from 'lucide-react';

type ProfileType = 'admin' | 'financial' | 'support' | 'developers' | 'marketing' | 'custom';
type StatusType = 'active' | 'inactive' | 'blocked' | 'pending';

interface BadgeProps {
  variant: 'profile' | 'status';
  type: ProfileType | StatusType;
  icon?: LucideIcon;
  className?: string;
  children?: React.ReactNode;
}

interface BadgeConfig {
  name: string;
  color: string;
  icon?: string;
}

const profileConfig: Record<ProfileType, BadgeConfig> = {
  admin: { name: 'Administrador', color: 'bg-primary-500 text-white' },
  financial: { name: 'Financeiro', color: 'bg-secondary-800 text-white' },
  support: { name: 'Suporte', color: 'bg-green-500 text-white' },
  developers: { name: 'Desenvolvedores', color: 'bg-purple-500 text-white' },
  marketing: { name: 'Marketing', color: 'bg-orange-500 text-white' },
  custom: { name: 'Customizado', color: 'bg-gray-500 text-white' }
};

const statusConfig: Record<StatusType, BadgeConfig> = {
  active: { name: 'Ativo', color: 'bg-green-100 text-green-800', icon: '●' },
  inactive: { name: 'Inativo', color: 'bg-gray-100 text-gray-800', icon: '⏸' },
  blocked: { name: 'Bloqueado', color: 'bg-red-100 text-red-800', icon: '⚠' },
  pending: { name: 'Pendente', color: 'bg-yellow-100 text-yellow-800', icon: '🕐' }
};

const Badge: React.FC<BadgeProps> = ({ variant, type, icon: Icon, className = '', children }) => {
  const config = variant === 'profile' ? profileConfig[type as ProfileType] : statusConfig[type as StatusType];
  
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color} ${className}`}>
      {Icon && <Icon className="mr-1" size={12} />}
      {config.icon && <span className="mr-1">{config.icon}</span>}
      {children || config.name}
    </span>
  );
};

export default Badge;
